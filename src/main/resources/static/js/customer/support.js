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
