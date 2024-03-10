const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.addProject = async (req, res) => {
  try {
    const {
      title,
      date,
      description,
      image,
      tags,
      category,
      github,
      video_url,
      webapp,
      member,
      is_active,
    } = req.body;

    const user = await User.findById(req.user._id);

    const nextProjectId = user.projects.length + 1;

    // const myCloud = await cloudinary.v2.uploader.upload(image, {
    //   folder: "portfolio",
    // });
    user.projects.unshift({
      id: nextProjectId,
      title,
      date,
      description,
      image,
      tags,
      category,
      github,
      webapp,
      video_url,
      member,
      is_active,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Projects",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.editProject = async (req, res) => {
  try {
    const {
      id,
      title,
      date,
      description,
      image,
      tags,
      category,
      github,
      video_url,
      webapp,
      member,
      is_active,
    } = req.body;

    const user = await User.updateOne(
      {
        "projects._id": id,
      },
      {
        $set: {
          "projects.$[elem]": {
            title,
            date,
            description,
            image,
            tags,
            category,
            github,
            video_url,
            webapp,
            member,
            is_active,
          },
        },
      },
      {
        arrayFilters: [{ "elem._id": id }],
      }
    );

    res.status(200).json({
      success: true,
      message: "Projects updated.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.editProjectStatus = async (req, res) => {
  try {
    const { id, is_active } = req.body;

    await User.updateOne(
      {
        "projects._id": id,
      },
      {
        $set: {
          "projects.$[elem].is_active": is_active,
        },
      },
      {
        arrayFilters: [{ "elem._id": id }],
      }
    );

    res.status(200).json({
      success: true,
      message: "Projects status updated.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getProjectList = async (req, res) => {
  try {
    const project = await User.findOne().select("projects");

    res.status(200).json({
      status: "success",
      code: 200,
      data: project.projects,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getProject = async (req, res) => {
  try {
    const { id } = req.params;

    let userdata = await User.findOne(
      {
        "projects._id": id,
      },
      {
        "projects.$": 1,
      }
    );

    res.status(200).json({
      status: "success",
      code: 200,
      data: userdata.projects[0],
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const project = user.projects.find((item) => item._id == id);

    // await cloudinary.v2.uploader.destroy(project.image.public_id);

    user.projects = user.projects.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from Projects",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
