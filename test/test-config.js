const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

chai.use(chaiHttp);
const expect = chai.expect;

describe("User", () => {
  it("Register", async () => {
    const userData = {
      username: "testuser4",
      email: "testuser@gmail.com",
      password: "Rajih123@",
    };
    const response = await chai
      .request(app)
      .post("/user")
      .send(userData)
      .set("Content-Type", "application/json");
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("message", "Success Register");
  });

  it("Register Invalid Email", async () => {
    const userData = {
      username: "testuser2999999",
      email: "testuser",
      password: "Rajih123@",
    };
    const response = await chai
      .request(app)
      .post("/user")
      .send(userData)
      .set("Content-Type", "application/json");
    expect(response).to.have.status(400);
    expect(response.body).to.have.property("message", "invalid email");
  });

  it("Login", async () => {
    const userData = {
      username: "testuser1",
      password: "Rajih123@",
    };
    const response = await chai
      .request(app)
      .post("/login")
      .send(userData)
      .set("Content-Type", "application/json");
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("data");
  });

  it("Login User Not Found", async () => {
    const userData = {
      username: "testuser11",
      password: "Rajih123@",
    };
    const response = await chai
      .request(app)
      .post("/login")
      .send(userData)
      .set("Content-Type", "application/json");
    expect(response).to.have.status(404);
    expect(response.body).to.have.property(
      "message",
      `user with ${userData.username} name not found`
    );
  });

  it("Delete", async () => {
    const queryParameter = "testuser2";
    const response = await chai
      .request(app)
      .delete(`/user?username=${queryParameter}`)
      .set("Content-Type", "application/json");
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("message", "Success Delete User");
  });

  it("Delete Invalid User", async () => {
    const queryParameter = "testuser9999";
    const response = await chai
      .request(app)
      .delete(`/user?username=${queryParameter}`)
      .set("Content-Type", "application/json");
    expect(response).to.have.status(404);
    expect(response.body).to.have.property(
      "message",
      `User name ${queryParameter} Not Found`
    );
  });
});

describe("Profile", () => {
  it("Edit Profile", async () => {
    const userData = {
      bio: "asdasd",
    };
    const params = "testuser1";
    const response = await chai
      .request(app)
      .put(`/profile/${params}`)
      .send(userData)
      .set("Content-Type", "application/json");
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("message", "Success Update Profile");
  });

  it("Edit Profile Invalid User", async () => {
    const userData = {
      bio: "asdasd",
    };
    const params = "testuser59999999";
    const response = await chai
      .request(app)
      .put(`/profile/${params}`)
      .send(userData)
      .set("Content-Type", "application/json");
    expect(response).to.have.status(404);
    expect(response.body).to.have.property(
      "message",
      `User ${params} Not Found`
    );
  });

  it("Get Profile", async () => {
    const query = "testuser1";
    const response = await chai
      .request(app)
      .get(`/profile?username=${query}`)
      .set("Content-Type", "application/json");
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("data");
  });

  it("Get Profile Invalid User", async () => {
    const query = "testuser1999999999999";
    const response = await chai
      .request(app)
      .get(`/profile?username=${query}`)
      .set("Content-Type", "application/json");
    expect(response).to.have.status(404);
    expect(response.body).to.have.property(
      "message",
      `User ${query} Not Found`
    );
  });
});
