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
    const userId = await user.findOne({ where: { id: user_id } });
    // Check if invalid user id
    if (!userId) {
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
      const text = `A new yearly review form is created`;
      // Initialize an event
      emailEvent.on("addNewForm", async () => {
        await sendMail(userId.email, subject, text);
      });
    } else if (form_type === FORM_ENUMS.FORM_TYPE.WORKING_FORM) {
      const subject = "[Announcement] - Working Form";
      const text = `A new working form is created`;
      // Initialize a event
      emailEvent.on("addNewForm", async () => {
        await sendMail(userId.email, subject, text);
      });
    }

    // Emit mail event
    emailEvent.emit("addNewForm");

    return res
      .status(200)
      .json({ message: "Create New Fomr Successfully", newForm });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Create New Form Failed" });
  }
};

const getAllForm = async (req, res) => {
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
    });

    return res.status(200).json(allForm);
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
      where: { user_id: userId },
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
      // Check if hr or admin then can delete form
      if (
        checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN ||
        formId.user_id === userId ||
        formId.manager === userId
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

    // Check if form belongs to user
    const formUserId = await form.findOne({
      where: { id },
    });

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
    return res.status(204).json({ message: "Update Form Failed" });
  }
};

const approveForm = async (req, res) => {
  const { id } = req.params;
  const { manager_review, status } = req.body;

  try {
    // Get user id from token
    const userId = req.user.id;

    // Get manager Id of form
    const formId = await form.findOne({ where: { id } });

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
    const checkHrId = await form.findOne({
      where: { id },
    });

    // Check if hr owns form then can close form
    if (hrId !== checkHrId.createBy) {
      return res
        .status(404)
        .json({ message: "You are not owner of this form" });
    }

    // Check if form status is closed then can not close form
    if (checkHrId.status === FORM_ENUMS.STATUS.CLOSED) {
      return res
        .status(404)
        .json({ message: "Form is closed, You can not close the form" });
    }

    // Check if form status is not in approved status then can not close form
    if (checkHrId.status !== FORM_ENUMS.STATUS.APPROVED) {
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
    // Get form id
    const formId = await form.findOne({ where: { id } });

    // CHeck if invalid form id
    if (!formId) {
      return res.status(404).json({ message: "Invalid Form Id" });
    }

    // Get user id form token
    const userId = req.user.id;

    // Get role name
    const checkRole = await user_role.findAll({
      where: { user_id: userId },
      include: { model: role },
    });

    for (let checkAdmin in checkRole) {
      // Check if hr or admin then can delete form
      if (
        checkRole[checkAdmin].role.role_name === ROLE_ENUMS.ROLE.ADMIN ||
        formId.createBy === userId
      ) {
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
