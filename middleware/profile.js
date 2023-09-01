const { User, Profile, Sequelize } = require("../models");

const validationUpdate = async (req, res, next) => {
  const { username } = req.params;

  const findUser = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!findUser) {
    return res
      .status(404)
      .json({ status: 404, message: `User ${username} Not Found` });
  }
  req.user = findUser;
  next();
};

module.exports = { validationUpdate };
