document.addEventListener("DOMContentLoaded", function() {
  loadFAQ();
  loadNotices();
});

function loadFAQ() {
  fetch('/customer/faq')
      .then(response => response.json())
      .then(data => {
          const faqList = document.getElementById('faq-list');
          data.forEach(faq => {
              const listItem = document.createElement('li');
              listItem.textContent = `${faq.question} - ${faq.answer}`;
              faqList.appendChild(listItem);
          });
      })
      .catch(error => console.error('FAQ 로드 중 오류 발생:', error));
}

// FAQ 토글 함수
// FAQ 토글 함수
function toggleAnswer(answerId) {
    const answer = document.getElementById(answerId);
    if (answer) {
      answer.style.display = answer.style.display === 'none' || answer.style.display === '' ? 'block' : 'none';
    }
  }
  
  

function loadNotices() {
  fetch('/customer/notice')
      .then(response => response.json())
      .then(data => {
          const noticeList = document.getElementById('notice-list');
          data.forEach(notice => {
              const listItem = document.createElement('li');
              listItem.textContent = `${notice.title} - ${notice.content}`;
              noticeList.appendChild(listItem);
          });
      })
      .catch(error => console.error('공지사항 로드 중 오류 발생:', error));
}

// 탭 UI 제어
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tabContent');
  
    // 모든 탭과 콘텐츠 초기화
    tabs.forEach((tab) => tab.classList.remove('active'));
    contents.forEach((content) => content.classList.add('hidden'));
  
    // 선택된 탭 활성화
    document.querySelector(`#${tabId}`).classList.remove('hidden');
    document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
  }
  
  // FAQ 검색
  function searchFAQ() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const faqs = document.querySelectorAll('#faq-list li');
    let found = false;
  
    faqs.forEach((faq) => {
      if (faq.textContent.toLowerCase().includes(query)) {
        faq.style.display = 'block';
        found = true;
      } else {
        faq.style.display = 'none';
      }
    });
  
    document.getElementById('noResultMessage').classList.toggle('hidden', found);
  }
  
  // 1:1 문의 내역 로딩
  function loadInquiries() {
    document.getElementById('loadingMessage').classList.remove('hidden');
  
    setTimeout(() => {
      document.getElementById('loadingMessage').classList.add('hidden');
      const hasData = false;
      if (!hasData) {
        document.getElementById('noDataMessage').classList.remove('hidden');
      }
    }, 2000);
  }
  
  // 초기화
  document.addEventListener('DOMContentLoaded', () => {
    loadInquiries();
  });
  