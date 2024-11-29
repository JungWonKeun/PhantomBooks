document.addEventListener("DOMContentLoaded", () => {
  
  // DOM 요소 초기화
  const inquiryTableBody = document.getElementById("inquiryTableBody");
  const emptyMessage = document.getElementById("emptyMessage");
  const searchButton = document.getElementById("searchButton");
  const inquiryButton = document.getElementById("inquiryButton");
  const tabs = document.querySelectorAll(".inquiry-tabs .tab");
  const term = document.getElementById("sort-dropdown");
  let status = "-1"; // 초기 상태
  let startDate = "";
  let endDate = "";

  // 기본 조회 기간 설정
  const selectStartDate = document.getElementById('startDate');
  const selectEndDate = document.getElementById('endDate');
  const sortDropdown = document.getElementById('sort-dropdown');

  // endDate 기본값 오늘
  selectEndDate.value = new Date().toISOString().split('T')[0];

  // startDate 기본값 오늘 - 선택한 기간
  selectStartDate.value = new Date(new Date().setDate(new Date().getDate() - sortDropdown.value)).toISOString().split('T')[0];

  const defaultStartDate = new Date();
  const defaultEndDate = new Date();
  defaultStartDate.setDate(defaultEndDate.getDate() - 7); // 7일 전
  startDate = defaultStartDate.toISOString().split("T")[0];
  endDate = defaultEndDate.toISOString().split("T")[0];
  document.getElementById("startDate").value = startDate;
  document.getElementById("endDate").value = endDate;


  // 선택한 기간 변경 시 이벤트 처리
  sortDropdown.addEventListener('change', () => {

    let time = 0;
    if (sortDropdown.value == '7') {
      time = new Date().setDate(new Date().getDate() - 7);
    } else {
      time = new Date(new Date().setMonth(new Date().getMonth() - Number(sortDropdown.value)));
    }
    selectStartDate.value = new Date(time).toISOString().split('T')[0];

  });

  // 문의 유형 선택 시 이벤트 처리
  const inquiryProjectDropdown = document.getElementById("inquiryProject-dropdown");
  inquiryProjectDropdown.addEventListener("change", () => {
    const project = inquiryProjectDropdown.value;
    console.log(`선택된 유형: ${project}`);

    // 서버로 데이터 요청 (fetchInquiries 함수 호출)
    fetchInquiries(status, startDate, endDate, 1, project);
  });

  // 데이터 요청 함수
  function fetchInquiries(status, startDate, endDate, cp, project) {
    if (!status || !startDate || !endDate) {
      console.error("Invalid parameters for fetchInquiries:", { status, startDate, endDate, project });
      alert("올바른 조회 조건을 설정해주세요.");
      return;
    }

    if(project === undefined) project = document.querySelector("#inquiryProject-dropdown").value;
    const apiUrl = `/customer/inquiry/queryList?status=${status}&startDate=${startDate}&endDate=${endDate}&cp=${cp}&project=${project}`;
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
        if (!data.queryList || !data.pagination) {
          throw new Error("Unexpected response structure");
        }
        renderInquiries(data.queryList);
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
          <td>${inquiry.querySubject}</td>
          <td><a href="/customer/inquiryDetail/${inquiry.queryNo}" style="text-decoration: none;
  color: #333;">${inquiry.queryTitle}</a></td>
          <td>${inquiry.queryWriteDate}</td>
          <td>${getInquiryStatus(inquiry.status)}</td>
        `;
        if (inquiry.querySubject == 2) {
          row.querySelector("td:nth-child(2)").textContent = "주문관련";
      } else if (inquiry.querySubject == 3) {
          row.querySelector("td:nth-child(2)").textContent = "배송관련";
      } else if (inquiry.querySubject == 4) {
          row.querySelector("td:nth-child(2)").textContent = "취소/환불";
      } else if (inquiry.querySubject == 5) {
          row.querySelector("td:nth-child(2)").textContent = "기타";
      } else if (inquiry.querySubject == 1) {
          row.querySelector("td:nth-child(2)").textContent = "전체";
      };
        inquiryTableBody.appendChild(row);
      });
    }
  }

  function getInquiryStatus(status) {
    switch (status) {
      case 0:
        return "접수완료";
      case 1:
        return "관리자 확인";
      case 2:
        return "답변완료";
      default:
        return "접수완료";
    }
  }


  // 탭 클릭 이벤트
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      status = tab.dataset.status;
      console.log(tab);
      console.log(status);
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      fetchInquiries(status, startDate, endDate, 1);
    });
  });


  // 페이지네이션 클릭 이벤트

  function createPageNo(txt, cp) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = txt;
    a.href = "#";
    a.dataset.cp = cp;
    li.appendChild(a);
    return li;
  }

  /**
   * 페이지네이션 생성 함수
   * @param {} pagination 
   */
  function renderPagination(pagination) {

    const { startPage, endPage, prevPage, nextPage, maxPage, currentPage, project } = pagination;

    const ul = document.querySelector(".pagination");
    if (!ul) {
      console.error("Pagination element (.pagination) not found");
      return;  // ul 요소가 없으면 함수 종료
    }
    ul.innerHTML = "";

    const firstLi = createPageNo("<<", 1);
    ul.appendChild(firstLi);

    const prevLi = createPageNo("<", prevPage);
    ul.appendChild(prevLi);


    for (let i = startPage; i <= endPage; i++) {
      const li = createPageNo(i, i);
      if (i == currentPage) {
        li.querySelector("a").classList.add("current");
      }
      ul.appendChild(li);
    }

    const nextLi = createPageNo(">", nextPage);
    ul.appendChild(nextLi);

    const maxLi = createPageNo(">>", maxPage);
    ul.appendChild(maxLi);

    // 페이지네이션 버튼 클릭 이벤트 추가
    pageNoAddClickEventHandler();
  }


  /**
   * 페이지네이션 버튼 클릭 시 동작 지정 함수
   */
  function pageNoAddClickEventHandler() {
    const pageNoList = document.querySelectorAll(".pagination a");

    pageNoList?.forEach(a => {
      const cp = a.dataset.cp;

      a.addEventListener("click", (e) => {
        e.preventDefault();
        const term = document.getElementById("sort-dropdown").value;
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;

        fetchInquiries(status, startDate, endDate, cp);
      });

    });

  }


  /**
   * 조회버튼 클릭 시
   */
  searchButton.addEventListener("click", () => {
    const term = document.getElementById("sort-dropdown").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    fetchInquiries(status, startDate, endDate, 1);
  });



  // 1:1 문의 버튼 클릭 이벤트
  inquiryButton.addEventListener("click", () => {
    location.href = "/customer/query";
  });

  // 초기 데이터 로드
  fetchInquiries(status, startDate, endDate, 1);
  pageNoAddClickEventHandler();
});