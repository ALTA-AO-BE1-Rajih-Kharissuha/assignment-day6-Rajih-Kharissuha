const { User, Profile, Sequelize } = require("../models");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const create = await User.create({
      username: username,
      email: email,
      password: password,
    });

    await Profile.create({
      bio: "",
      userId: create.id,
    });

    return res.status(200).json({ status: 200, message: "Success Register" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const find = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ username: username }, { email: username }],
        password: password,
      },
      attributes: ["username", "email"],
    });
    if (!find) {
      return res.status(404).json({
        status: 404,
        message: `user with ${username} name not found`,
      });
    }
    return res.status(200).json({ status: 200, data: find });
  } catch (error) {
    console.log(error);
  }
};

const deletes = async (req, res) => {
  const { username } = req.query;
  try {
    const find = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!find) {
      return res
        .status(404)
        .json({ status: 404, message: `User name ${username} Not Found` });
    } else {
      await User.destroy({
        where: {
          username: username,
        },
      });
      return res
        .status(200)
        .json({ status: 200, message: `Success Delete User` });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { register, login, deletes };
