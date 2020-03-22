import React from "react";
import _ from "lodash";
import UserService from "../../utils/user.service";

type MyState = {
  error: { message: string } | null;
  isLogged: boolean;
  users: Array<any>;
};

export default class UsersList extends React.Component<{}, MyState> {
  userService: UserService;

  constructor(props: any) {
    super(props);
    this.userService = new UserService();
    this.state = {
      error: null,
      isLogged: false,
      users: []
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  async getUsers() {
    const res = this.userService.getUsers();

    try {
      const users = await res;
      this.setState({ users: users });
    } catch (error) {
      console.log(error);
    }
  }

  async removeUser(user: any) {
    const isDeleted = await this.userService.removeUser(user);
    this.getUsers();
  }

  render() {
    let { error, users } = this.state;
    return (
      <div>
        {users.map(user => (
          <div key={user._id}>
            Name: {user.name}, Role: {user.role}
            <button
              onClick={() => {
                this.removeUser(user);
              }}
            >
              Remove user
            </button>
          </div>
        ))}
      </div>
    );
  }
}
