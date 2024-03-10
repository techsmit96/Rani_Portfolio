const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");


exports.addSkill = async (req, res) => {
  try {
    const { title, skill, image } = req.body;

    const user = await User.findById(req.user._id);

    // Check if the title already exists in user's skills
    const existingTitle = user.skills.find((skill) => skill.title === title);

    if (existingTitle) {
      // If title exists, add the skill to that title
      existingTitle.skills.push({
        name: skill,
        image: image,
      });
    } else {
      // If title doesn't exist, create a new title and add the skill
      user.skills.push({
        title: title, // You can replace this with the desired title
        skills: [
          {
            name: skill,
            image: image,
          },
        ],
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Skills",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.editSkill = async (req, res) => {
  try {
    const { skill, image, id } = req.body;
    await User.updateOne(
      {
        "skills.skills._id": id,
      },
      {
        $set: {
          "skills.$.skills.$[elem]": { name: skill, image },
        },
      },
      {
        arrayFilters: [{ "elem._id": id }],
      }
    );
    res.status(200).json({
      success: true,
      message: "Skill Updated",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getSkillList = async (req, res) => {
  // const limit = parseInt(req.query.limit) || 10;
  // const offset = parseInt(req.query.offset) || 0;
  try {
    // Mongoose query to fetch total count
    const totalSkillsCount = await User.aggregate([
      { $unwind: "$skills" },
      { $unwind: "$skills.skills" },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);

    const total = totalSkillsCount.length > 0 ? totalSkillsCount[0].count : 0;

    const skills = await User.find().select("skills");

    const flattenedSkillsList = skills.reduce((accumulator, user) => {
      const userSkills = user.skills.map((skillCategory) => {
        return skillCategory.skills.map((skill) => {
          return {
            title: skillCategory.title,
            name: skill.name,
            image: skill.image,
            id: skill._id,
          };
        });
      });

      return accumulator.concat(...userSkills);
    }, []);

    // Apply offset and limit to the flattened array
    // const paginatedSkillsList = flattenedSkillsList.slice(
    //   offset,
    //   offset + limit
    // );

    res.status(200).json({
      status: "success",
      code: 200,
      data: flattenedSkillsList,
      // pagination: {
      //   limit,
      //   offset,
      //   total, // You may need to fetch the total count from the database
      // },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    const skills = await User.find().select("skills");
    const skillCategories = skills.flatMap((item) =>
      item.skills.map((skill) => ({
        value: skill.title,
        label: skill.title,
      }))
    );
    res.status(200).json({
      status: "success",
      code: 200,
      data: skillCategories,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.getSkill = async (req, res) => {
  try {
    const { id } = req.params;

    let user;
    let userdata = await User.findOne(
      {
        "skills.skills._id": id,
      },
      {
        "skills.$": 1,
      }
    );
    if (userdata && userdata.skills.length > 0) {
      const skill = userdata.skills[0];
      if (skill.skills && skill.skills.length > 0) {
        let data = skill.skills.find((user) => user._id == id);
        user = {
          title: skill.title,
          skills: data,
        };
      } else {
        console.log("data not found.");
      }
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    // Find the title containing the skill with the specified id
    const skillTitle = user.skills.find((item) =>
      item.skills.some((skill) => skill._id == id)
    );

    if (skillTitle) {
      // Filter out the skill with the specified id from the title
      skillTitle.skills = skillTitle.skills.filter((skill) => skill._id != id);

      // Save the changes
      await user.save();

      res.status(200).json({
        status: "success",
        code: 200,
        message: "Deleted from Skills",
      });
    } else {
      // Handle the case where the skill with the specified id was not found
      res.status(404).json({
        status: "fail",
        message: "Skill not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
