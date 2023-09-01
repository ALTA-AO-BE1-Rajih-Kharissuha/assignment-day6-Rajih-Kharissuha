const { User, Profile, Sequelize } = require("../models");

const update = async (req, res) => {
  const { bio } = req.body;
  const { id } = req.user;
  try {
    const findProfile = await Profile.findOne({
      where: {
        userId: id,
      },
    });
    await Profile.update(
      { bio: bio || findProfile.bio },
      {
        where: {
          userId: id,
        },
      }
    );
    return res
      .status(200)
      .json({ status: 200, message: "Success Update Profile" });
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  const { username } = req.query;
  try {
    const find = await User.findOne({
      include: {
        model: Profile,
        as: "profile",
        attributes: ["bio"],
      },
      where: {
        username: username,
      },
      attributes: ["username", "email"],
    });
    if (!find) {
      return res
        .status(404)
        .json({ status: 404, message: `User ${username} Not Found` });
    } else {
      res.status(200).json({ status: 200, data: find });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { update, getProfile };
