const EventEmitter = require("events");
const { form, user, user_role, role } = require("../models");
const { sendMail } = require("./mail.controllers");
const { FORM_ENUMS } = require("../constants/form-enums");
const { ROLE_ENUMS } = require("../constants/role-enums");

const emailEvent = new EventEmitter();

const createNewForm = async (req, res) => {
  const { user_id, form_type, status, hr_review } = req.body;

  try {
    // Get creator user id
    const creator = req.user.id;
    // Get user id
    const userId = await user.findOne({
      where: { id: user_id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });
    // Check if invalid user id
    if (!userId.id) {
      return res.status(404).json({ message: "Invalid User Id" });
    }

    // Check form type
    if (
      form_type !== FORM_ENUMS.FORM_TYPE.YEARLY_FORM &&
      form_type !== FORM_ENUMS.FORM_TYPE.WORKING_FORM
    ) {
      return res.status(404).json({ message: "Invalid form type" });
    }

    // Check status
    if (
      status !== FORM_ENUMS.STATUS.SUBMITTED &&
      status !== FORM_ENUMS.STATUS.PENDING_APPROVAL &&
      status !== FORM_ENUMS.STATUS.APPROVAL
    ) {
      return res.status(404).json({ message: "Invalid form status" });
    }

    // Get all forms of specific user
    const userForms = await user.findAll({
      where: { id: user_id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: {
        model: form,
        attributes: {
          exclude: [
            "createBy",
            "updateBy",
            "createdAt",
            "updatedAt",
            "isDeleted",
          ],
        },
      },
    });

    let temp = false;

    // Check if user has closed form, then can create a new form
    for (let uf in userForms) {
      if (userForms[uf].forms.length === 0) {
        console.log(userForms[uf].forms.length);
        temp = true;
        continue;
      }

      if (userForms[uf].forms.length > 0) {
        // console.log(userForms[uf].forms.length);

        userForms[uf].forms.forEach(function (checkStatus) {
          if (checkStatus.status.includes(FORM_ENUMS.STATUS.CLOSED)) {
            return (temp = true);
          }
        });
      }
    }

    if (temp) {
      // Create new form
      const newForm = await form.create({
        user_id,
        form_type,
        status,
        hr_review,
        createBy: creator,
        updateBy: creator,
      });

      if (form_type === FORM_ENUMS.FORM_TYPE.YEARLY_FORM) {
        // Content of email
        const subject = "[Announcement] - Yearly Review Form";
        const text = `Hello ${userId.lastname} ${userId.firstname} - A new yearly review form is created for you`;
        // Initialize an event
        emailEvent.on("addNewForm", async () => {
          await sendMail(userId.email, subject, text);
        });
      } else if (form_type === FORM_ENUMS.FORM_TYPE.WORKING_FORM) {
        const subject = "[Announcement] - Working Form";
        const text = `Hello ${userId.lastname} ${userId.firstname} - A new working form is created`;
        // Initialize a event
        emailEvent.on("addNewForm", async () => {
          await sendMail(userId.email, subject, text);
        });
      }

      // Emit mail event
      emailEvent.emit("addNewForm");

      return res
        .status(200)
        .json({ message: "Create New Form Successfully", newForm });
    } else {
      return res.status(404).json({ message: "You have form is not closed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Create New Form Failed" });
  }
};

const getAllForm = async (req, res) => {
  const { page, size } = req.query;

  const pageSize = parseInt(size);
  const currentPage = parseInt(page);

  try {
    const allForm = await form.findAll({
      where: { isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: {
        model: user,
        attributes: {
          exclude: [
            "email",
            "phone",
            "identification_card",
            "social_insurance",
            "address",
            "avatar",
            "createdAt",
            "updatedAt",
          ],
        },
      },
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    });

    // Count number of forms
    const count = allForm.length;

    return res.status(200).json({ count, allForm });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Form Not Found" });
  }
};

const getFormById = async (req, res) => {
  const { id } = req.params;

  try {
    // Get user id from token
    const userId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: userId, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
      include: { model: role },
    });

    // Get form by id
    const formId = await form.findOne({
      where: { id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    if (!formId) {
      // Check if invalid form id
      return res.status(404).json({ message: "Invalid Form Id" });
    }

    for (let checkAdmin in checkRole) {
      // Check if hr or admin or manager and owner of the form then can get form detail
      if (
        checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN ||
        formId.user_id === userId ||
        formId.manager === userId ||
        formId.createBy === userId
      ) {
        return res.status(200).json({ message: "Form Found", formId });
      } else {
        return res
          .status(404)
          .json({ message: "You have no access to read this form detail" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Form Not Found" });
  }
};

const updateForm = async (req, res) => {
  const { id } = req.params;
  const { manager, status, personal_review, task, archivement } = req.body;

  try {
    // Get user id from token
    const userId = req.user.id;

    // Get manager id
    const managerId = await user.findOne({ where: { id: userId } });

    // Check if form belongs to user
    const formUserId = await form.findAll({
      where: { id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    // Check if form does not exist
    if (!formUserId.user_id) {
      return res.status(404).json({ message: "Form does not exist" });
    }

    // Check if user owns form then can update form
    if (formUserId.user_id !== userId) {
      return res.status(404).json({
        message: "You are not own this form. You can not update this form",
      });
    }

    // Check if form is closed. User can not update
    if (formUserId.status === FORM_ENUMS.STATUS.CLOSED) {
      return res
        .status(404)
        .json({ message: "Form is closed. You can not update" });
    }

    if (managerId.parent !== manager) {
      return res.status(404).json({ message: "Wrong Manager ID" });
    }

    // Update form
    const updatedForm = await form.update(
      {
        manager,
        status,
        personal_review,
        task,
        archivement,
        updateBy: userId,
      },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "Update Form Successfully", updatedForm });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Update Form Failed" });
  }
};

const approveForm = async (req, res) => {
  const { id } = req.params;
  const { manager_review, status } = req.body;

  try {
    // Get user id from token
    const userId = req.user.id;

    // Get manager Id of form
    const formId = await form.findAll({
      where: { id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    // Check if form does not exist
    if (!formId.user_id) {
      return res.status(404).json({ message: "Form does not exist" });
    }

    // Check if user is manager of the form then can approve form
    if (formId.manager !== userId) {
      return res.status(404).json({
        message: "You are not own this form. You can not approve this form",
      });
    }

    // Check if form is pending approve or closed then can not approve form
    if (
      formId.status !== FORM_ENUMS.STATUS.PENDING_APPROVAL ||
      formId.status == FORM_ENUMS.STATUS.CLOSED
    ) {
      return res.status(404).json({
        message:
          "Form is not pending approve or closed. You can not approve this form",
      });
    }

    // If form is in pending approve status and not closed then can approve form
    const approvedForm = await form.update(
      { manager_review, status, updateBy: userId },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "Approved Form Successfully", approvedForm });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Approve Form Failed" });
  }
};

const closeForm = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Get hr id from token
    const hrId = req.user.id;

    // Find hr id of form
    const userIdForm = await form.findAll({
      where: { id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    // Check if form does not exist
    if (!userIdForm.user_id) {
      return res.status(404).json({ message: "Form does not exist" });
    }

    // Get user id owns form
    const userId = await user.findOne({ where: { id: userIdForm.user_id } });

    // Check if hr owns form then can close form
    if (hrId !== userIdForm.createBy) {
      return res
        .status(404)
        .json({ message: "You are not owner of this form" });
    }

    // Check if form status is closed then can not close form
    if (userIdForm.status === FORM_ENUMS.STATUS.CLOSED) {
      return res
        .status(404)
        .json({ message: "Form is closed, You can not close the form" });
    }

    // Check if form status is not in approved status then can not close form
    if (userIdForm.status !== FORM_ENUMS.STATUS.APPROVED) {
      return res.status(404).json({
        message: "Form is not approved, You can not close the form",
      });
    }

    // If form is in approved status and not closed then can close form
    const formClosed = await form.update(
      {
        status,
        updateBy: hrId,
      },
      { where: { id } }
    );

    // Send form status notification  of from to users
    if (userIdForm.form_type === FORM_ENUMS.FORM_TYPE.YEARLY_FORM) {
      // Content of email
      const subject = "[Announcement] - Update Yearly Review Form Status";
      const text = `Hello ${userId.lastname} ${userId.firstname} -Your yearly review form is closed`;

      // Initialize an event
      emailEvent.on("addNewForm", async () => {
        await sendMail(userId.email, subject, text);
      });
    } else if (userIdForm.form_type === FORM_ENUMS.FORM_TYPE.WORKING_FORM) {
      const subject = "[Announcement] - Update Working Form Status";
      const text = `Hello ${userId.lastname} ${userId.firstname} - Your working form is closed`;

      // Initialize a event
      emailEvent.on("addNewForm", async () => {
        await sendMail(userId.email, subject, text);
      });
    }

    // Emit mail event
    emailEvent.emit("addNewForm");

    return res
      .status(200)
      .json({ message: "Close Form Successfully", formClosed });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Close Form Failed" });
  }
};

const deleteForm = async (req, res) => {
  const { id } = req.params;

  try {
    // Get user id from token
    const userId = req.user.id;
    // Get form id
    const formId = await form.findOne({
      where: { id, isDeleted: FORM_ENUMS.IS_DELETE.NOT_DELETED },
    });

    // CHeck if invalid form id
    if (!formId) {
      return res
        .status(404)
        .json({ message: "Invalid Form Id or Form does not exist" });
    }

    // Check if hr or admin owns form then can delete form
    if (formId.createBy === userId) {
      // Delete form
      await formId.update(
        {
          isDeleted: FORM_ENUMS.IS_DELETE.DELETED,
        },
        { where: { id } }
      );

      return res
        .status(200)
        .json({ message: "Delete Form Successfully", formId });
    } else {
      return res
        .status(404)
        .json({ message: "You have no access to delete this form" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Delete Form Failed" });
  }
};

module.exports = {
  createNewForm,
  getAllForm,
  updateForm,
  approveForm,
  getFormById,
  closeForm,
  deleteForm,
};
