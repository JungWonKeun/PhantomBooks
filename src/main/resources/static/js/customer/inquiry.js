document.addEventListener("DOMContentLoaded", () => {
  // DOM 요소 초기화
  const inquiryTableBody = document.getElementById("inquiryTableBody");
  const emptyMessage = document.getElementById("emptyMessage");
  const searchButton = document.getElementById("searchButton");
  const inquiryButton = document.getElementById("inquiryButton");
  const tabs = document.querySelectorAll(".inquiry-tabs");
  const paginationContainer = document.querySelector(".pagination");
  let status = "all"; // 초기 상태
  let startDate = ""; // 초기 시작일
  let endDate = ""; // 초기 종료일

  // 기본 조회 기간 설정
  const defaultStartDate = new Date();
  const defaultEndDate = new Date();
  defaultStartDate.setMonth(defaultEndDate.getMonth() - 1); // 1개월 전
  startDate = defaultStartDate.toISOString().split("T")[0];
  endDate = defaultEndDate.toISOString().split("T")[0];
  document.getElementById("startDate").value = startDate;
  document.getElementById("endDate").value = endDate;

  // 데이터 요청 함수
  function fetchInquiries(status, startDate , endDate, cp) {
    if (!status || !startDate || !endDate) {
      console.error("Invalid parameters for fetchInquiries:", { status, startDate, endDate });
      alert("올바른 조회 조건을 설정해주세요.");
      return;
    }

    const apiUrl = `/customer/inquiry/queryList?status=${status}&startDate=${startDate}&endDate=${endDate}&cp=${cp}`;
    console.log(`Fetching data from: ${apiUrl}`); // 요청 URL 확인

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // 응답 데이터 확인
        if (!data.inquiries || !data.pagination) {
          throw new Error("Unexpected response structure");
        }
        renderInquiries(data.inquiries);
        renderPagination(data.pagination);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
      });
  }

  // 문의 내역 렌더링 함수
  function renderInquiries(data) {
    inquiryTableBody.innerHTML = ""; // 기존 데이터 초기화

    if (data.length === 0) {
      emptyMessage.style.display = "block";
      emptyMessage.textContent = "해당 조건에 조회된 문의 내역이 없습니다.";
    } else {
      emptyMessage.style.display = "none";

      data.forEach((inquiry) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${inquiry.queryNo}</td>
          <td><a href="/customer/inquiryDetail/${inquiry.queryNo}">${inquiry.title}</a></td>
          <td>${inquiry.writeDate}</td>
          <td>${getInquiryStatus(inquiry.status)}</td>
        `;
        inquiryTableBody.appendChild(row);
      });
    }
  }

  // 페이지네이션 렌더링 함수
  function renderPagination(pagination) {
    paginationContainer.innerHTML = ""; // 기존 페이지네이션 초기화

    const createcpButton = (label, cp, isDisabled = false, isCurrent = false) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = label;
      if (isDisabled) {
        li.classList.add("disabled");
        return li;
      }
      if (isCurrent) {
        a.classList.add("current");
      }
      a.addEventListener("click", (e) => {
        e.preventDefault();
        if (!isCurrent) fetchInquiries(status, startDate, endDate, cp);
      });
      li.appendChild(a);
      return li;
    };

    // 첫 페이지 버튼
    paginationContainer.appendChild(createcpButton("<<", 1, pagination.currentcp === 1));

    // 이전 페이지 버튼
    paginationContainer.appendChild(createcpButton("<", pagination.prevcp, !pagination.hasPrevcp));

    // 페이지 번호 버튼
    for (let i = pagination.startcp; i <= pagination.endcp; i++) {
      paginationContainer.appendChild(createcpButton(i, i, false, i === pagination.currentcp));
    }

    // 다음 페이지 버튼
    paginationContainer.appendChild(createcpButton(">", pagination.nextcp, !pagination.hasNextcp));

    // 마지막 페이지 버튼
    paginationContainer.appendChild(createcpButton(">>", pagination.totalcps, pagination.currentcp === pagination.totalcps));
  }

  // 조회 버튼 클릭 이벤트
  searchButton.addEventListener("click", () => {
    startDate = document.getElementById("startDate").value;
    endDate = document.getElementById("endDate").value;

    if (!startDate || !endDate) {
      alert("조회 기간을 설정해주세요.");
      return;
    }

    fetchInquiries(status, startDate, endDate, 1);
  });

  // 탭 클릭 이벤트
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      status = tab.value;
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      fetchInquiries(status, startDate, endDate, 1);
    });
  });

  // 1:1 문의 버튼 클릭 이벤트
  inquiryButton.addEventListener("click", () => {
    location.href = "/customer/query";
  });

  // 초기 데이터 로드
  fetchInquiries(status, startDate, endDate, 1);
});
