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
      handleResponseError("/");
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

  async getCurrentUser() {
    const res = await fetch("/api/users/me");
    const result = await res.json();
    console.log(result);
    return result;
  }
}
export default UserService;
