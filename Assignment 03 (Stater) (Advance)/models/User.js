"use strict";

class User {
  constructor(firstName, lastName, userName, passWord) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.passWord = passWord;
  }
  confirmPass(confirmPassWord) {
    return this.passWord == confirmPassWord;
  }
}

class News {
  constructor(country, category, pageSize, page) {
    this.country = country;
    this.category = category;
    this.pageSize = pageSize;
    this.page = page;
  }
}
