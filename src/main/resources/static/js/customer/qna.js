document.addEventListener("DOMContentLoaded", function () {
  // 서버로부터 FAQ 데이터를 불러오는 함수
  fetch('/customer/qna') // 이 URL은 FAQ 데이터를 가져오는 API 엔드포인트를 의미합니다.
      .then(response => response.json())
      .then(data => displayFAQ(data))
      .catch(error => console.error('FAQ 데이터 불러오기 중 오류', error));
});

function displayFAQ(faqList) {
  const faqContainer = document.getElementById('faqList');

  faqList.forEach(faq => {
      // FAQ 항목 생성
      const faqItem = document.createElement('div');
      faqItem.classList.add('faq-item');

      // 제목 생성
      const faqTitle = document.createElement('div');
      faqTitle.classList.add('faq-title');
      faqTitle.textContent = faq.title;

      // 답변 표시 버튼
      const faqContent = document.createElement('div');
      faqContent.classList.add('faq-content');
      faqContent.textContent = faq.content;

      // 클릭 이벤트 - 질문을 클릭하면 답변을 토글
      faqTitle.addEventListener('click', () => {
          faqContent.style.display = faqContent.style.display === 'none' ? 'block' : 'none';
      });

      // 요소 조합 후 추가
      faqItem.appendChild(faqTitle);
      faqItem.appendChild(faqContent);
      faqContainer.appendChild(faqItem);
  });
}

// faq.js

function toggleAnswer(answerId) {
  const answerElement = document.getElementById(answerId);
  if (answerElement.style.display === "none" || answerElement.style.display === "") {
      answerElement.style.display = "block"; // 답변을 표시
  } else {
      answerElement.style.display = "none"; // 답변을 숨김
  }
}
