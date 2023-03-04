"use strict";

const welcomeMessage = document.getElementById("welcome-message");
const loginModal = document.getElementById("login-modal");
const logoutBtn = document.getElementById("btn-logout");
const userArr = JSON.parse(getFromStorage("currentUser"));
const currentUser = JSON.parse(getFromStorage("current_user"));

function currentUserExisted() {
  if (currentUser) {
    loginModal.classList.add("hide");
    welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
  }
}
currentUserExisted();
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("current_user");
  loginModal.classList.remove("hide");
  welcomeMessage.textContent = "";
  window.location.href = "./pages/login.html";
});
