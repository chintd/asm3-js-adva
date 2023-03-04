"use strict";
const newsPerPage = document.getElementById("input-page-size");
const newsSelectOption = document.getElementById("input-category");
const submitBtn = document.getElementById("btn-submit");
let data;
// thêm sự kiên cho nút submit lấy dữ liệu nhập vào và lưu trong localstorage
submitBtn.addEventListener("click", function () {
  data = {
    pages: newsPerPage.value,
    option: newsSelectOption.value,
  };
  if (validateSettingInput(data)) {
    console.log(data);
    saveToStorage("page_option", JSON.stringify(data));
    clearInput();
    window.location.href = "../pages/news.html";
  }
});

// kiem tra du lieu nhap vao
function validateSettingInput(data) {
  if (data.pages == "") {
    alert("Fill in news per page ");
    return false;
  } else {
    return true;
  }
}
// reset lai in put
function clearInput() {
  newsPerPage.value = "";
  newsSelectOption.value = "General";
}
