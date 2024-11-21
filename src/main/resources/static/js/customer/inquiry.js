document.addEventListener("DOMContentLoaded", () => {
  const inquiryTableBody = document.getElementById("inquiryTableBody");
  const emptyMessage = document.getElementById("emptyMessage");
  const searchButton = document.getElementById("searchButton");
  const inquiryButton = document.getElementById("inquiryButton");
  const tabs = document.querySelectorAll(".inquiry-tabs .tab");
  const queryName = document.querySelector(".queryName");
  let currentStatus = "all"; // 현재 선택된 상태
  let currentStartDate = ""; // 조회 시작일
  let currentEndDate = ""; // 조회 종료일



  // 문의 내역 렌더링 함수
  function renderInquiries(data) {

    inquiryTableBody.innerHTML = ""; // 기존 데이터 초기화

    if (data.length === 0) {
      emptyMessage.style.display = "block";
      emptyMessage.textContent = "해당 조건에 조회된 문의 내역이 없습니다.";
    } else {
      emptyMessage.style.display = "none";

      data.forEach((inquiry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${inquiry.queryNo}</td>
          <td><a href="/customer/inquiry/${inquiry.queryNo}">${inquiry.title}</a></td>
          <td>${inquiry.writeDate}</td>
          <td>${getInquiryStatus(inquiry.status)}</td>
        `;
        inquiryTableBody.appendChild(row);
      });
      // 페이지네이션 렌더링
      renderPagination(pagination);
    }
  }

  // 페이지네이션 렌더링 함수
  function renderPagination(pagination) {
    const pageNoList = document.querySelector(".pagination");
    paginationContainer.innerHTML = "";

    // 페이지 이동 버튼이 클릭 되었을 때
    pageNoList.forEach((page) => {

      const pageLink = document.createElement("a");
      pageLink.textContent = page.number;
      if (page.isCurrent) {
        pageLink.classList.add("current");
      }
      //pageLink.href = "#";
      pageLink.addEventListener("click", () => {
        fetchInquiries(currentStatus, currentStartDate, currentEndDate, page.number);
      });
      paginationContainer.appendChild(pageLink);
    });
  }

  // 조회 기간 드롭다운 변경 이벤트

  // 페이지 이동 버튼 클릭 되었을 때
  item.addEventListener("click", e => {
    e.preventDefault();


    // 만약 클릭된 a 태그에 "current" 클래스가 있을 경우
    // == 현재 페이지 숫자를 클릭한 경우
    if (item.classList.contains("current")) {
      return;
    }
    // const -> let으로 변경
    let pathname = location.pathname; // 현재 게시판 조회 요청 주소


    // 클릭된 버튼이 <<, <, >, >> 인 경우
    // console.log(item.innerText);
    switch (item.innerText) {
      case '<<': // 1페이지로 이동
        pathname += "?cp=1";
        break;
      case '<': // 이전 페이지
        pathname += "?cp=" + pagination.prevPage;
        break;
      case '>': // 다음 페이지
        pathname += "?cp=" + pagination.nextPage;
        break;
      case '>>':
        pathname += "?cp=" + pagination.maxPage;
        break;

      default:  // 클릭한 숫자 페이지로 이동
        pathname += "?cp=" + item.innerText;
    }

    const params = new URLSearchParams(location.search);

    const key = document.querySelector("#sort-dropdown").value;
    const query = document.querySelector(".tab").value;


    if (key != null) { // 검색인 경우

      pathname += `?cp=${cp}&status=${status}&startDate=${startDate}&endDate=${endDate}`;

    }
    // 페이지 이동
    location.href = pathname;
  });
});
// 탭 클릭 이벤트
window.filterTab = function (status) {
  currentStatus = status;

  // 탭 활성화 처리
  tabs.forEach((tab) => tab.classList.remove("active"));
  const activeTab = document.querySelector(`.tab[onclick="filterTab('${status}')"]`);
  if (activeTab) activeTab.classList.add("active");

  // 데이터 요청
  fetchInquiries(currentStatus, currentStartDate, currentEndDate);
};
// 조회 버튼 클릭 이벤트
if (searchButton) {
  searchButton.addEventListener("click", () => {
    console.log("조회 버튼 클릭");
    currentStartDate = document.getElementById("startDate").value;
    currentEndDate = document.getElementById("endDate").value;

    console.log(`조회 기간: ${currentStartDate} ~ ${currentEndDate}`);
    fetchInquiries(currentStatus, currentStartDate, currentEndDate);
  });
} else {
  console.error("검색 버튼을 찾을 수 없습니다.");
}

// 1:1 문의 버튼 클릭 이벤트
if (inquiryButton) {
  inquiryButton.addEventListener("click", () => {
    console.log("1:1문의버튼 클릭!");
    location.href = "/customer/query";
  });
} else {
  console.error("1:1 문의 버튼을 찾을 수 없습니다.");
}

// 초기 로드: 전체 상태로 데이터 조회
const defaultStartDate = new Date();
const defaultEndDate = new Date();
defaultStartDate.setMonth(defaultEndDate.getMonth() - 1); // 기본 조회: 1개월 전
document.getElementById("startDate").value = defaultStartDate.toISOString().split("T")[0];
document.getElementById("endDate").value = defaultEndDate.toISOString().split("T")[0];

currentStartDate = defaultStartDate.toISOString().split("T")[0];
currentEndDate = defaultEndDate.toISOString().split("T")[0];



const queryNames = document.querySelectorAll(".queryName");
if (queryNames) {
  queryNames.forEach((queryName) => {
    queryName.addEventListener("click", () => {
      const queryNo = queryName.dataset.queryNo;
      if (queryNo) {
        location.href = `/customer/inquiryDetail/${queryNo}`;
      } else {
        console.log("queryNo 값이 없습니다");
      }
    });
  });
} else {
  console.error("queryName 요소를 찾을 수 없습니다.");
};
const queryBtn = document.querySelector("#queryBtn");
const title = document.querySelector("#title");
const content = document.querySelector("#content");
queryBtn.addEventListener("click", () => {
  if (title.value == "") {
    alert("제목을 입력해주세요");
  }

  if (content.value == "") {
    alert("내용을 작성해 주세요.");
  }


  location.href = "/customer/query";

});
