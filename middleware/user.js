const { User, Profile, Sequelize } = require("../models");

const registerValidation = async (req, res, next) => {
  const { username, email, password } = req.body;
  const findUser = await User.findOne({
    where: {
      username: username,
    },
  });
  if (findUser) {
    return res.status(400).json({ status: 400, message: "username alredy" });
  }

  if (!username) {
    return res
      .status(400)
      .json({ status: 400, message: "username cannot be empty" });
  }

  const valEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!email) {
    return res
      .status(400)
      .json({ status: 400, message: "email cannot be empty" });
  } else if (!valEmail) {
    return res.status(400).json({ status: 400, message: "invalid email" });
  }

  const checkPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  if (!password) {
    return res.status(400).json({ message: "password harus di isi" });
  } else if (!checkPassword) {
    return res.status(400).json({
      message:
        "invalid password, The password consists of 1 uppercase letter, 1 number, 1 symbol, and length 8",
    });
  }
  next();
};
module.exports = { registerValidation };
