const simpleStore = {
  bearerToken: "",
  updateToken: function (token) {
    this.bearerToken = token;
  },
  getToken: function () {
    return this.bearerToken;
  },
};

module.exports = simpleStore;
