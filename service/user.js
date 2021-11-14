class UserService {
  async createUser(username, password) {
    setTimeout(() => {
      console.log("用户注册成功：", username, password);
    }, 100);
  }
}

module.exports = new UserService();
