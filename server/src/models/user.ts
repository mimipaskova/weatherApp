import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roles = {
  user: 5,
  admin: 10
};

const usersSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String
  }

  //   googleId: {
  //     type: String,
  //     required: true
  //   },
  //   name: String,
  //   role: {
  //     type: Number,
  //     default: roles.user
  //   }
});

const User = mongoose.model("user", usersSchema, "users");
export default User;
