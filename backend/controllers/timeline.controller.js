const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.addTimeline = async (req, res) => {
  try {
    const { title, description, year } = req.body;

    const user = await User.findById(req.user._id);

    user.timelines.unshift({
      title,
      description,
      year,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Timline.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.editTimeline = async (req, res) => {
  try {
    const { id, description, year } = req.body;

    const user = await User.updateOne(
      {
        "timelines._id": id,
      },
      {
        $set: {
          "timelines.$[elem]": { year, description },
        },
      },
      {
        arrayFilters: [{ "elem._id": id }],
      }
    );

    res.status(200).json({
      success: true,
      message: "Timline updated.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getTimelineList = async (req, res) => {
  try {
    const timeline = await User.findOne().select("timelines");

    res.status(200).json({
      status: "success",
      code: 200,
      data: timeline.timelines,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getTimeline = async (req, res) => {
  try {
    const { id } = req.params;

    let userdata = await User.findOne(
      {
        "timelines._id": id,
      },
      {
        "timelines.$": 1,
      }
    );

    res.status(200).json({
      status: "success",
      code: 200,
      data: userdata.timelines[0],
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.deleteTimeline = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    user.timelines = user.timelines.filter((item) => item._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from Timline.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
