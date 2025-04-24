const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const Feedback = require("../models/feedback");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

let token;
let testUserId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Create test user
  const user = new User({
    name: "Test User",
    email: "test@example.com",
    passwordHash: "hashedpassword"
  });
  await user.save();
  testUserId = user._id;

  // Generate test token
  token = jwt.sign({ id: testUserId, role: "client" }, process.env.JWT_SECRET);
});

afterAll(async () => {
  await Feedback.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("POST /api/feedback", () => {
  it("should submit feedback", async () => {
    const res = await request(app)
      .post("/api/feedback")
      .set("Authorization", `Bearer ${token}`)
      .send({
        text: "Test feedback",
        rating: 5
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.feedback.text).toBe("Test feedback");
    expect(res.body.feedback.rating).toBe(5);
  });
});
