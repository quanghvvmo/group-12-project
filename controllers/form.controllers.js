const EventEmitter = require("events");
const { form, user } = require("../models");
const { sendMail } = require("./mail.controllers");

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
    if (form_type === "0" || form_type === "1") {
      if (
        status === "submitted" ||
        status === "pending approve" ||
        status === "approved"
      ) {
        // Create new form
        const newForm = await form.create({
          user_id,
          form_type,
          status,
          hr_review,
          createBy: creator,
          updateBy: creator,
        });

        if (form_type === "0") {
          // Content of email
          const subject = "[Announcement] - Yearly Review Form";
          const text = `A new yearly review form is created`;
          // Initialize a event
          emailEvent.on("addNewForm", async () => {
            await sendMail(userId.email, subject, text);
          });
        } else if (form_type === "1") {
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
      } else {
        return res.status(404).json({ message: "Invalid status" });
      }
    } else {
      return res.status(404).json({ message: "Invalid form type" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Create New Form Failed" });
  }
};

const getAllForm = async (req, res) => {
  try {
    const allForm = await form.findAll({
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
    // Get form by id
    const formId = await form.findOne({ where: { id } });
    // Check if invalid form id
    if (!formId) {
      return res.status(404).json({ message: "Invalid Form Id" });
    }

    return res.status(200).json({ message: "Form Found", formId });
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
      where: { user_id: userId },
    });

    if (!formUserId) {
      return res
        .status(404)
        .json({ message: "You have no access to update this form" });
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

    // Check manager ID
    const managerId = await form.findOne({ where: { manager: userId } });

    if (!managerId) {
      return res.status(404).json({ message: "You can not approve this form" });
    } else {
      // Approve form
      const approvedForm = await form.update(
        { manager_review, status, updateBy: userId },
        { where: { id } }
      );

      return res
        .status(200)
        .json({ message: "Approved Form Successfully", approvedForm });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Approve Failed" });
  }
};

const deleteForm = async (req, res) => {
  const { id } = req.params;

  try {
    if (!formUserId) {
      return res
        .status(404)
        .json({ message: "You have no access to delete this form" });
    }

    // Get form id
    const formId = await form.findOne({ where: { id } });
    // CHeck if invalid form id
    if (!formId) {
      return res.status(404).json({ message: "Invalid Form Id" });
    }

    // Delete form
    await formId.destroy({ where: { id } });

    return res
      .status(200)
      .json({ message: "Delete Form Successfully", formId });
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
  deleteForm,
};
