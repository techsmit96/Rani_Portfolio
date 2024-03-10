const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.addEducation = async (req, res) => {
  try {
    const { img, school, date, grade, desc, degree, doc } = req.body;

    const user = await User.findById(req.user._id);

    const nextId = user.education.length + 1;

    // const myCloud = await cloudinary.v2.uploader.upload(image, {
    //   folder: "portfolio",
    // });
    user.education.unshift({
      id: nextId,
      img,
      school,
      date,
      grade,
      desc,
      degree,
      doc,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Education",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.editEducation = async (req, res) => {
  try {
    const { id, img, school, date, grade, desc, degree, doc } = req.body;

    await User.updateOne(
      {
        "education._id": id,
      },
      {
        $set: {
          "education.$[elem]": { img, school, date, grade, desc, degree, doc },
        },
      },
      {
        arrayFilters: [{ "elem._id": id }],
      }
    );

    res.status(200).json({
      success: true,
      message: "Education updated.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getEducationList = async (req, res) => {
  try {
    const data = await User.findOne().select("education");

    res.status(200).json({
      status: "success",
      code: 200,
      data: data.education,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getEducation = async (req, res) => {
  try {
    const { id } = req.params;

    let userdata = await User.findOne(
      {
        "education._id": id,
      },
      {
        "education.$": 1,
      }
    );

    res.status(200).json({
      status: "success",
      code: 200,
      data: userdata.education[0],
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const education = user.education.find((item) => item._id == id);

    // await cloudinary.v2.uploader.destroy(project.image.public_id);

    user.education = user.education.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from Education",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
