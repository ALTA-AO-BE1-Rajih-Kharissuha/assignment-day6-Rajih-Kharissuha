const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { registerValidation } = require("./middleware/user");
const { register, login, deletes } = require("./controller/user");
const { validationUpdate } = require("./middleware/profile");
const { update, getProfile } = require("./controller/profile");
// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Sequelize Express Project");
});

app.post("/user", registerValidation, register);
app.post("/login", login);
app.delete("/user", deletes);
app.put("/profile/:username", validationUpdate, update);
app.get("/profile", getProfile);
// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
