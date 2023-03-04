"use strict";

const apiKey = "e793ec6f362f4b9b9e37d211857dd7a1";
let articles;
let pageOption;
let totalPage;
if (getFromStorage("page_option") !== null) {
  pageOption = JSON.parse(getFromStorage("page_option"));
} else {
  pageOption = {
    pages: 5,
    option: "General",
  };
}
const newsData = new News("us", pageOption.option, pageOption.pages, 1);
callApi(newsData);

function callApi(newsData) {
  fetch(
    `https://newsapi.org/v2/top-headlines?country=${newsData.country}&category=${newsData.category}&pageSize=${newsData.pageSize}&page=${newsData.page}&apiKey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      totalPage = Math.round(data.totalResults / newsData.page) + 1;
      renderNews(data.articles);
      renderPaginationCC(newsData.page, totalPage);
    });
}

// ham hien thi danh sach news
function renderNews(data) {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    newsContainer.innerHTML += `<div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            src="${data[i].urlToImage === null ? "" : data[i].urlToImage}"
            class="card-img"
            alt="MIT researchers uncover ‘unpatchable’ flaw in Apple M1 chips - TechCrunch"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              ${data[i].title}
            </h5>
            <p class="card-text">${data[i].description}
            </p>
            <a
              href=${data[i].url}
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
  newsData.page = pageNumber;
  callApi(newsData);
}
function preBtn(pageNumber) {
  newsData.page = pageNumber - 1;
  callApi(newsData);
}
function nextBtn(pageNumber) {
  newsData.page = pageNumber + 1;
  callApi(newsData);
}

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
