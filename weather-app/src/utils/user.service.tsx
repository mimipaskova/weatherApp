import handleResponseError from "./handleError";

class UserService {
  constructor() {}
  async getUsers() {
    const res = await fetch(`/api/users`);
    try {
      const result = await res.json();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      handleResponseError("/users");
    }
  }

  async removeUser(user: any) {
    const res = await fetch("/api/users/delete/" + user.googleId, {
      method: "DELETE"
    });
    return res.json();
  }

  async isAdmin() {
    const res = await fetch("/api/users/isAdmin");
    const result = await res.json();
    console.log(result);
    return result.isAdmin;
  }
}
export default UserService;
