const User = {
  userName: '',
  isLogin: false,
  login(user) {
    this.isLogin = user.isLogin;
    this.userName = user.userName;
    localStorage.setItem('user', JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem('user');
  }
};
export default User;
