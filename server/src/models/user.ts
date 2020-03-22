import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ROLES = {
  user: 5,
  admin: 10
};

const usersSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  role: {
    type: Number,
    default: ROLES.user
  }
});

export const User = mongoose.model("user", usersSchema, "users");
