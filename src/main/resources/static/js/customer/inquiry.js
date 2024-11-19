document.addEventListener('DOMContentLoaded', () => {
  const inquiryTableBody = document.getElementById('inquiryTableBody');
  const emptyMessage = document.getElementById('emptyMessage');
  const paginationArea = document.getElementById('paginationArea');
  const inquiriesPerPage = 10;
  let currentPage = 1;
  let inquiries = [];
  const searchButton = document.querySelector("#searchButton");

  // 조회 기간 선택 이벤트 리스너
  document.getElementById('durationSelect').addEventListener('change', function () {
    const duration = parseInt(this.value);
    const endDate = new Date(); // 현재 날짜 기준
    const startDate = new Date();

    // 기간을 현재 날짜 기준으로 설정
    startDate.setMonth(endDate.getMonth() - duration);

    // input date 형식으로 맞춰서 값 변경
    document.getElementById('startDate').value = startDate.toISOString().split('T')[0];
    document.getElementById('endDate').value = endDate.toISOString().split('T')[0];
  });

  // 검색 버튼 클릭 이벤트 리스너
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      fetchInquiries();
    });
  }

  // 서버에서 문의 내역을 가져오는 함수
function fetchInquiries() {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  // 서버에 데이터를 요청하는 fetch 호출
  fetch(`/api/customer/inquiry?startDate=${startDate}&endDate=${endDate}`)
  .then(response => response.json())
  .then(data => {
      console.log(data); // 데이터 확인

      // 데이터의 queryList가 존재하는지, 배열인지 확인
      if (!data.queryList) {
          console.error("queryList 데이터가 존재하지 않습니다. 빈 배열로 설정합니다.");
          inquiries = [];  // 빈 배열 할당
      } else if (!Array.isArray(data.queryList)) {
          console.error("queryList 데이터가 배열 형태가 아닙니다.");
          inquiries = [];  // 안전하게 빈 배열로 초기화
      } else {
          // 정상적인 배열일 때만 데이터를 할당
          inquiries = data.queryList;
      }

      // 문의 내역 렌더링 및 페이지네이션 갱신
      renderInquiries(inquiries);
      renderPagination(inquiries.length);
  })
  .catch(error => {
      console.error('문의 내역을 가져오는 중 오류 발생:', error);
      inquiries = [];  // 오류 발생 시에도 빈 배열로 설정하여 이후 함수에서 오류 방지
      renderInquiries(inquiries);
      renderPagination(0);
  });
}


  // 문의 내역을 테이블에 렌더링하는 함수
  function renderInquiries(data) {
    inquiryTableBody.innerHTML = '';
    const startIndex = (currentPage - 1) * inquiriesPerPage;
    const endIndex = Math.min(startIndex + inquiriesPerPage, data.length);
    const currentInquiries = data.slice(startIndex, endIndex);

    if (currentInquiries.length === 0) {
      emptyMessage.style.display = 'block';
    } else {
      emptyMessage.style.display = 'none';
      currentInquiries.forEach((inquiry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${startIndex + index + 1}</td>
          <td><a href="/customer/inquiry/${inquiry.queryNo}">${inquiry.queryTitle}</a></td>
          <td>${inquiry.queryWriteDate}</td>
          <td>${getInquiryStatus(inquiry.status)}</td>
        `;
        inquiryTableBody.appendChild(row);
      });
    }
  }

  // 문의 상태를 읽기 쉬운 문자열로 반환하는 함수
  function getInquiryStatus(status) {
    switch (status) {
      case 'RECEIVED':
        return '접수 완료';
      case 'ADMIN_CHECK':
        return '관리자 확인';
      case 'COMPLETED':
        return '답변 완료';
      default:
        return '알 수 없음';
    }
  }

  // 페이지네이션 링크를 렌더링하는 함수
  function renderPagination(totalItems) {
    paginationArea.innerHTML = '';
    const totalPages = Math.ceil(totalItems / inquiriesPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement('a');
      pageLink.textContent = i;
      pageLink.href = '#';
      pageLink.dataset.page = i;

      if (i === currentPage) {
        pageLink.classList.add('active');
      }

      pageLink.addEventListener('click', (event) => {
        event.preventDefault();
        currentPage = i;

        // 모든 페이지 링크에서 'active' 제거 후 현재 페이지에만 추가
        document.querySelectorAll('.pagination a').forEach(link => link.classList.remove('active'));
        pageLink.classList.add('active');

        renderInquiries(inquiries);
      });

      paginationArea.appendChild(pageLink);
    }
  }

  // 탭별로 필터링하는 함수
  window.filterTab = function (tab) {
    currentPage = 1;

    if (tab === 'all') {
      renderInquiries(inquiries); // 전체 데이터를 그대로 렌더링
      renderPagination(inquiries.length);
    } else {
      const status = tab === 'received' ? 'RECEIVED' : (tab === 'admin-check' ? 'ADMIN_CHECK' : 'COMPLETED');

      if (Array.isArray(inquiries)) {
        // 필터링된 데이터를 별도의 변수로 유지합니다.
        const filteredInquiries = inquiries.filter(inquiry => inquiry.status === status);
        renderInquiries(filteredInquiries);
        renderPagination(filteredInquiries.length);
      } else {
        console.error('inquiries가 배열이 아닙니다.');
      }
    }
  };

  // 초기 데이터 가져오기
  fetchInquiries();
});
