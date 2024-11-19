// 1:1 문의 목록 표시와 페이지네이션을 처리하는 JavaScript 코드

document.addEventListener('DOMContentLoaded', () => {
  const inquiryTableBody = document.getElementById('inquiryTableBody');
  const emptyMessage = document.getElementById('emptyMessage');
  const paginationArea = document.getElementById('paginationArea');
  const inquiriesPerPage = 10;
  let currentPage = 1;
  let inquiries = [];

  // 서버에서 문의 내역을 가져오는 함수
  function fetchInquiries() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    fetch(`/api/customer/inquiry-list?startDate=${startDate}&endDate=${endDate}`)
      .then(response => response.json())
      .then(data => {
        inquiries = data;
        renderInquiries();
        renderPagination();
      })
      .catch(error => console.error('문의 내역을 가져오는 중 오류 발생:', error));
  }

  // 문의 내역을 테이블에 렌더링하는 함수
  function renderInquiries() {
    inquiryTableBody.innerHTML = '';
    const startIndex = (currentPage - 1) * inquiriesPerPage;
    const endIndex = Math.min(startIndex + inquiriesPerPage, inquiries.length);
    const currentInquiries = inquiries.slice(startIndex, endIndex);

    if (currentInquiries.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        currentInquiries.forEach((inquiry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${startIndex + index + 1}</td>
                <td><a href="/customer/inquiry/${inquiry.id}">${inquiry.queryTitle}</a></td>
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
  function renderPagination() {
    paginationArea.innerHTML = '';
    const totalPages = Math.ceil(inquiries.length / inquiriesPerPage);

    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.classList.add('pagination-link');
        if (i === currentPage) {
          pageLink.classList.add('active');
        }
        pageLink.addEventListener('click', (event) => {
          event.preventDefault();
          currentPage = i;
          renderInquiries();
          renderPagination();
        });
        paginationArea.appendChild(pageLink);
      }
    }
  }

  // 탭별로 필터링하는 함수
  function filterTab(tab) {
    currentPage = 1;
    if (tab === 'all') {
      fetchInquiries();
    } else {
      const status = tab === 'received' ? 'RECEIVED' : tab === 'admin-check' ? 'ADMIN_CHECK' : 'COMPLETED';
      inquiries = inquiries.filter(inquiry => inquiry.status === status);
      renderInquiries();
      renderPagination();
    }
  }

  // 탭 클릭 이벤트 리스너
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (event) => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      event.target.classList.add('active');
      filterTab(event.target.getAttribute('onclick').split("'")[1]);
    });
  });

  // 검색 버튼 클릭 이벤트 리스너
  document.getElementById('searchButton').addEventListener('click', () => {
    // 날짜 범위나 다른 기준으로 문의 내역을 가져오는 로직 구현 가능
    fetchInquiries();
  });

  // 초기 데이터 가져오기
  fetchInquiries();
});
