document.addEventListener("DOMContentLoaded", function () {
  // 서버로부터 FAQ 데이터를 불러오는 함수
  fetchFAQs(1); // 초기 페이지 로드
});

function displayFAQ(faqList) {
  const faqContainer = document.getElementById('faqList');
  faqContainer.innerHTML = ''; // 기존 내용 초기화

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

function fetchFAQs(cp) {
  fetch(`/customer/qna/list?cp=${cp}`)
    .then(response => response.json())
    .then(data => {
      displayFAQ(data.faqList);
      renderPagination(data.pagination);
    })
    .catch(error => console.error('FAQ 데이터 불러오기 중 오류', error));
}

function createPageNo(txt, cp) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.textContent = txt;
  a.href = "#";
  a.dataset.cp = cp;
  li.appendChild(a);
  return li;
}

function renderPagination(pagination) {
  const { startPage, endPage, prevPage, nextPage, maxPage, currentPage } = pagination;

  const ul = document.querySelector(".pagination");
  if (!ul) return;
  ul.innerHTML = "";

  ul.appendChild(createPageNo("<<", 1));
  ul.appendChild(createPageNo("<", prevPage));

  for (let i = startPage; i <= endPage; i++) {
    const li = createPageNo(i, i);
    if (i == currentPage) {
      li.querySelector("a").classList.add("current");
    }
    ul.appendChild(li);
  }

  ul.appendChild(createPageNo(">", nextPage));
  ul.appendChild(createPageNo(">>", maxPage));

  pageNoAddClickEventHandler();
}

function pageNoAddClickEventHandler() {
  const pageNoList = document.querySelectorAll(".pagination a");

  pageNoList?.forEach(a => {
    const cp = a.dataset.cp;

    a.addEventListener("click", (e) => {
      e.preventDefault();
      fetchFAQs(cp);
    });
  });
}
