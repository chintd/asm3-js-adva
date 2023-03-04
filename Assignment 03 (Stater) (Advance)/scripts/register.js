"use strict";
const firstName = document.getElementById("input-firstname");
const lastName = document.getElementById("input-lastname");
const userName = document.getElementById("input-username");
const passWord = document.getElementById("input-password");
const passWordConfirm = document.getElementById("input-password-confirm");
const submitBtn = document.getElementById("btn-submit");
const KEY = "USER_ARRAY";
let userArr = JSON.parse(getFromStorage(KEY)) || [];
// them su kien cho submitBtn

submitBtn.addEventListener("click", function () {
  let userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    passWord: passWord.value,
  };
  console.log(userData);
  let user = parseUser(userData);
  console.log(user);
  if (validate(user)) {
    userArr.push(user);
    saveToStorage(KEY, JSON.stringify(userArr));
    // clearInput();
    window.location.href = "../pages/login.html";
  } else {
    validate(user);
  }
});
// xoa input fill
function clearInput() {
  firstName.value = "";
  lastName.value = "";
  userName.value = "";
  passWord.value = "";
  passWordConfirm.value = "";
}
//CHUYEN Class Instance SANG JS OBJECT
function parseUser(userData) {
  let user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.passWord
  );

  return user;
}
//kiem tra username co ton tai chua
function checkUserName(name) {
  let user = userArr.filter((el) => {
    if (el.username == name) {
      return el;
    }
  });
  console.log(user);
  if (user.length > 0) {
    alert("user name existed");
    return false;
  } else {
    return true;
  }
}
// validate cac truong input
function validate(data) {
  console.log(data);
  if (data.firstname == "") {
    alert("fill in firstname!");
    return false;
  } else if (data.lastname == "") {
    alert("fill in lastname!");
    return false;
  } else if (data.username == "") {
    alert("fill in userName!");
    return false;
  } else if (data.passWord == "" || data.passWord.length < 8) {
    alert("fill in passWord! password must have atleast 8 number");
    return false;
  } else if (data.username == "") {
    alert("fill in userName!");
    return false;
  } else if (
    passWordConfirm.value.length < 8 ||
    passWordConfirm.value == "" ||
    !data.confirmPass(passWordConfirm.value)
  ) {
    alert("check your confirm password! password must have atleast 8 number");
    return false;
  } else {
    return true;
  }
}
