const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../middlewares/sendMail");
const cloudinary = require("cloudinary");

const signToken = (user_id) => {
  return jwt.sign({ _id: user_id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // const token = jwt.sign({ _id: user._id }, );
    const token = await signToken(user._id);

    res.status(200).json({
      success: true,
      message: "Logged In Successfully",
      name: user.about.name,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-password -email");
    const activeProjects = user.projects.filter(
      (project) => project.is_active === 1
    );
    user.projects = activeProjects;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const userMessage = `Hey, I am ${name}. My email is ${email}. My message is ${message}.`;

    await sendMail(userMessage);

    return res.status(200).json({
      success: true,
      message: "Message Sent Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, password, skills, about } = req.body;

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    // if (skills) {
    //   if (skills.image1) {
    //     await cloudinary.v2.uploader.destroy(user.skills.image1.public_id);
    //     const myCloud = await cloudinary.v2.uploader.upload(skills.image1, {
    //       folder: "portfolio",
    //     });

    //     user.skills.image1 = {
    //       public_id: myCloud.public_id,
    //       url: myCloud.secure_url,
    //     };
    //   }

    //   if (skills.image2) {
    //     await cloudinary.v2.uploader.destroy(user.skills.image2.public_id);
    //     const myCloud = await cloudinary.v2.uploader.upload(skills.image2, {
    //       folder: "portfolio",
    //     });

    //     user.skills.image2 = {
    //       public_id: myCloud.public_id,
    //       url: myCloud.secure_url,
    //     };
    //   }

    //   if (skills.image3) {
    //     await cloudinary.v2.uploader.destroy(user.skills.image3.public_id);
    //     const myCloud = await cloudinary.v2.uploader.upload(skills.image3, {
    //       folder: "portfolio",
    //     });

    //     user.skills.image3 = {
    //       public_id: myCloud.public_id,
    //       url: myCloud.secure_url,
    //     };
    //   }

    //   if (skills.image4) {
    //     await cloudinary.v2.uploader.destroy(user.skills.image4.public_id);
    //     const myCloud = await cloudinary.v2.uploader.upload(skills.image4, {
    //       folder: "portfolio",
    //     });

    //     user.skills.image4 = {
    //       public_id: myCloud.public_id,
    //       url: myCloud.secure_url,
    //     };
    //   }

    //   if (skills.image5) {
    //     await cloudinary.v2.uploader.destroy(user.skills.image5.public_id);
    //     const myCloud = await cloudinary.v2.uploader.upload(skills.image5, {
    //       folder: "portfolio",
    //     });

    //     user.skills.image5 = {
    //       public_id: myCloud.public_id,
    //       url: myCloud.secure_url,
    //     };
    //   }

    //   if (skills.image6) {
    //     await cloudinary.v2.uploader.destroy(user.skills.image6.public_id);
    //     const myCloud = await cloudinary.v2.uploader.upload(skills.image6, {
    //       folder: "portfolio",
    //     });

    //     user.skills.image6 = {
    //       public_id: myCloud.public_id,
    //       url: myCloud.secure_url,
    //     };
    //   }
    // }

    if (about) {
      if (about.name) {
        user.about.name = about.name;
      }
      if (about.roles) {
        user.about.roles = about.roles;
      }
      if (about.title) {
        user.about.title = about.title;
      }
      if (about.subtitle) {
        user.about.subtitle = about.subtitle;
      }
      if (about.description) {
        user.about.description = about.description;
      }
      if (about.quote) {
        user.about.quote = about.quote;
      }
      if (about.experience_in_year) {
        user.about.experience_in_year = about.experience_in_year;
      }
      if (about.github) {
        user.about.github = about.github;
      }
      if (about.resume) {
        user.about.resume = about.resume;
      }
      if (about.linkedin) {
        user.about.linkedin = about.linkedin;
      }
      if (about.twitter) {
        user.about.twitter = about.twitter;
      }
      if (about.instagram) {
        user.about.instagram = about.instagram;
      }
      if (about.facebook) {
        user.about.facebook = about.facebook;
      }
      if (about.avatar) {
        user.about.avatar = about.avatar;
      }

      // if (about.avatar) {
      //   await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);

      //   const myCloud = await cloudinary.v2.uploader.upload(about.avatar, {
      //     folder: "portfolio",
      //   });

      //   user.about.avatar = {
      //     public_id: myCloud.public_id,
      //     url: myCloud.secure_url,
      //   };
      // }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//youtube
exports.addYoutube = async (req, res) => {
  try {
    const { url, title, image } = req.body;

    const user = await User.findById(req.user._id);

    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio",
    });
    user.youtube.unshift({
      url,
      title,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added To Youtube Videos",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteYoutube = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);

    const video = user.youtube.find((video) => video._id == id);

    // await cloudinary.v2.uploader.destroy(video.image.public_id);

    user.youtube = user.youtube.filter((video) => video._id != id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from Youtube",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//experience
