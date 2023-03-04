"use strict";

const userName = document.getElementById("input-username");
const passWord = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit");

const userArr = JSON.parse(getFromStorage("USER_ARRAY"));
let currentUser;
if (getFromStorage("current_user") !== null) {
  currentUser = JSON.parse(getFromStorage("current_user"));
} else {
  saveToStorage("current_user", "{}");
}
loginBtn.addEventListener("click", function () {
  const loginData = {
    username: userName.value,
    password: passWord.value,
  };
  if (validate(loginData)) {
    currentUser = findUser(loginData);
    if (currentUser != null) {
      saveToStorage("current_user", JSON.stringify(currentUser));
      window.location.href = "../index.html";
    }
  }
});
// kiem tra user ton tai

function validate(data) {
  if (data.username == "") {
    alert("fill in user name");
    return false;
  } else if (data.password == "") {
    alert("fill in password");
    return false;
  } else {
    return true;
  }
}

// tim thong tin user login trong userArr
function findUser(loginData) {
  let userFilter = userArr.filter((el) => {
    if (
      loginData.username == el.userName &&
      loginData.password == el.passWord
    ) {
      console.log(el);
      return el;
    }
  });
  if (userFilter.length > 0) {
    return userFilter[0];
  } else if (userFilter.length == 0) {
    alert("User not existed!");
  } else if (loginData.password != userFilter[0].passWord) {
    alert("Wrong pass word!");
  }
}
