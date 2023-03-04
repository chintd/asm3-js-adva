"use strict";
const searchInput = document.getElementById("input-query");
const submitBtn = document.getElementById("btn-submit");
const APIKey = "e793ec6f362f4b9b9e37d211857dd7a1";
let searchDataApi;
let totalPage;
let pageOptionLocal;
let data;
let page = 1;
fddd;
// kiểm tra dl đầu vào
function validateInput(data) {
  if (data.value == "") {
    alert("Fill in search !");
    return false;
  } else {
    return true;
  }
}

//Bắt sự kiện cho submitbtn và gọi api
submitBtn.addEventListener("click", function () {
  data = searchInput.value;
  if (validateInput(data)) {
    callApi(data);
  }
});

function callApi() {
  fetch(
    `https://newsapi.org/v2/everything?q=${data}&pageSize=5&page=${page}&apiKey=${APIKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      searchDataApi = data.articles;
      totalPage = Math.round(data.totalResults / 5) + 1;
      renderSearchNews(searchDataApi);
      renderPaginationCC(page, totalPage);
    });
}

//hàm render news sau khi gọi api
function renderSearchNews(searchData) {
  let container = document.getElementById("news-container");
  container.innerHTML = "";
  for (let i = 0; i < searchData.length; i++) {
    container.innerHTML += `<div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            src=${searchData[i].urlToImage}
            class="card-img"
            alt="MIT researchers uncover ‘unpatchable’ flaw in Apple M1 chips - TechCrunch"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              ${searchData[i].title}
            </h5>
            <p class="card-text">${searchData[i].description}
            </p>
            <a
              href=${searchData[i].url}
              class="btn btn-primary"
              >View</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>`;
  }
}

function changePage(pageNumber) {
  page = pageNumber;
  callApi();
}
function preBtn(pageNumber) {
  page = pageNumber - 1;
  callApi();
}
function nextBtn(pageNumber) {
  page = pageNumber + 1;
  callApi();
}

// hiển thi pagination nhận vào page hiện tại vả tổng page
function renderPaginationCC(currentPage, totalPage) {
  let ul = document.getElementById("pagination");
  // nếu mà currentPage = 1 thì disabled Nút previous
  let previousButton = `<li class="page-item">
  <button class="page-link ${
    currentPage == 1 ? "disabled-btn" : ""
  }" href="#" id="btn-prev" onclick="preBtn(${currentPage})"> Previous</button>
</li>`;

  // nếu mà currentPage = totalPage thì disabled Nút next
  let nextButton = `<li class="page-item">
  <button class="page-link ${
    currentPage == totalPage ? "disabled-btn" : ""
  }" id="btn-next" onclick="nextBtn(${currentPage})">Next </button>
</li>`;
  let beforeCurrentPage = ``;
  if (currentPage > 2) {
    // render dấu ... đằng trước
    beforeCurrentPage = `
  <li class="page-item" ${currentPage == 1 ? 'style="display: none""' : ""}>
    <button class="page-link" onclick="changePage(1)">1</button>
  </li>
  <li class="page-item">
    <button class="page-link disabled-btn">...</button>
  </li>`;
  }
  let afterCurrentPage = ``;
  if (currentPage < totalPage - 1) {
    // render dấu ... đầu sau
    afterCurrentPage = `<li class="page-item">
    <button class="page-link disabled-btn">...</button>
  </li>
  <li class="page-item" ${
    currentPage == totalPage ? 'style="display: none""' : ""
  }>
  <button class="page-link" onclick="changePage(${totalPage})">${totalPage}</button>
</li>`;
  }
  let currentPageHTML = `
<li class="page-item" ${currentPage - 1 > 0 ? "" : 'style="display: none"'}>
  <button class="page-link" onclick="changePage(${currentPage - 1})">${
    currentPage - 1
  }</button>
</li>
<li class="page-item">
  <button class="page-link disabled-btn">${currentPage}</button>
</li>
<li class="page-item" ${currentPage < totalPage ? "" : 'style="display: none"'}>
  <button class="page-link" onclick="changePage(${currentPage + 1})">${
    currentPage + 1
  }</button>
</li>`;

  let finalHTML =
    previousButton +
    beforeCurrentPage +
    currentPageHTML +
    afterCurrentPage +
    nextButton;

  ul.innerHTML = finalHTML;
}
