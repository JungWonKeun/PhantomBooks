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

    // 헤더 생성
    const faqHeader = document.createElement('div');
    faqHeader.classList.add('faq-header');

    // 제목 생성
    const faqTitle = document.createElement('h3');
    faqTitle.classList.add('faq-title');
    faqTitle.textContent = faq.title;

    // 화살표 생성
    const arrowIcon = document.createElement('i');
    arrowIcon.classList.add('faq-arrow', 'fas', 'fa-chevron-down');

    // 헤더 조합
    faqHeader.appendChild(faqTitle);
    faqHeader.appendChild(arrowIcon);

    // 답변 생성
    const faqContent = document.createElement('div');
    faqContent.classList.add('faq-content');
    faqContent.textContent = faq.content;

    // 클릭 이벤트 - 질문을 클릭하면 답변과 화살표를 토글
    faqHeader.addEventListener('click', () => {
      if (faqContent.style.display === 'none' || faqContent.style.display === '') {
        faqContent.style.display = 'block';
        arrowIcon.classList.remove('fa-chevron-down');
        arrowIcon.classList.add('fa-chevron-up');
      } else {
        faqContent.style.display = 'none';
        arrowIcon.classList.remove('fa-chevron-up');
        arrowIcon.classList.add('fa-chevron-down');
      }
    });

    // 요소 조합 후 추가
    faqItem.appendChild(faqHeader);
    faqItem.appendChild(faqContent);
    faqContainer.appendChild(faqItem);
  });
}



// faq.js
function toggleAnswer(answerId, itemId) {
  const answerElement = document.getElementById(answerId);
  const itemElement = document.getElementById(itemId);

  if (answerElement.style.display === "none" || answerElement.style.display === "") {
    answerElement.style.display = "block"; // 답변을 표시
    itemElement.classList.add("open"); // 화살표 방향을 위로 변경
  } else {
    answerElement.style.display = "none"; // 답변을 숨김
    itemElement.classList.remove("open");
  }
}
