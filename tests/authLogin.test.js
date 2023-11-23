import mongoose from 'mongoose';
import request from "supertest";
import app from "../app.js";
import dotenv from "dotenv";

dotenv.config();

beforeEach(async () => {
  await mongoose.connect(process.env.DB_HOST);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/users/login", () => {
  it("should login a user", async () => {
    const res = await request(app).post("/api/users/login").send({
"password": "947463522",
"email": "a123kdd@gmail.com"
});
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toBe({
        "email": "a123kdd@gmail.com",
        "subscription": "starter"
    });
  });
});