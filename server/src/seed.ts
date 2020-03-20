import User from "./models/user";

var user = {
  username: "admin",
  password: "admin",
  email: "admin@gmail.com"

  //   role: "admin"
};

User.create(user, function(e: any) {
  if (e) {
    throw e;
  }
});
