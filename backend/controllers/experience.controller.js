const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.addExperience = async (req, res) => {
  try {
    const { img, role, company, date, desc, degree, skills, doc } = req.body;

    const user = await User.findById(req.user._id);

    const nextId = user.experience.length + 1;

    // const myCloud = await cloudinary.v2.uploader.upload(image, {
    //   folder: "portfolio",
    // });
    user.experience.unshift({
      id: nextId,
      img,
      role,
      company,
      date,
      desc,
      degree,
      skills,
      doc,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Experience",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}; 
exports.editExperience = async (req, res) => {
  try {
    const { id, img, role, company, date, desc, degree, skills, doc } =
      req.body;

    await User.updateOne(
      {
        "experience._id": id,
      },
      {
        $set: {
          "experience.$[elem]": {
            img,
            role,
            company,
            date,
            desc,
            degree,
            skills,
            doc,
          },
        },
      },
      {
        arrayFilters: [{ "elem._id": id }],
      }
    );

    res.status(200).json({
      success: true,
      message: "Experience updated.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getExperienceList = async (req, res) => {
  try {
    const data = await User.findOne().select("experience");

    res.status(200).json({
      status: "success",
      code: 200,
      data: data.experience,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getExperience = async (req, res) => {
  try {
    const { id } = req.params;

    let userdata = await User.findOne(
      {
        "experience._id": id,
      },
      {
        "experience.$": 1,
      }
    );

    res.status(200).json({
      status: "success",
      code: 200,
      data: userdata.experience[0],
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const experience = user.experience.find((item) => item._id == id);

    // await cloudinary.v2.uploader.destroy(project.image.public_id);

    user.experience = user.experience.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from Experience",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
