/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    this.classList.toggle('active');
  });
});

// 모두 열고 닫기 버튼
document.getElementById("openBtn").addEventListener("click", () => {
  document.getElementById("openBtn").style.display = "none";
  document.getElementById("closeBtn").style.display = "inline-block";
  document.querySelectorAll(".menu").forEach(menu => {
    menu.classList.add("active");
  });
});

document.getElementById("closeBtn").addEventListener("click", () => {
  document.getElementById("openBtn").style.display = "inline-block";
  document.getElementById("closeBtn").style.display = "none";
  document.querySelectorAll(".menu").forEach(menu => {
    menu.classList.remove("active");
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const btnContainer = document.querySelector('.btn-container'); // 버튼 컨테이너 선택
  const footer = document.querySelector('footer'); // 푸터 요소 선택
  const scrollOffset = 10; // 위치 변경할 스크롤 값

  function updateBtnContainerPosition() {
    const footerOffsetTop = footer.getBoundingClientRect().top + window.scrollY; // 푸터의 절대 위치
    const containerHeight = btnContainer.offsetHeight;
    const maxTop = footerOffsetTop - containerHeight; // 푸터에 닿기 전의 위치

    if (window.scrollY > scrollOffset) {
      // 스크롤이 200px 넘었을 때
      if (window.scrollY + 800 >= maxTop) {
        // 푸터에 닿기 전에 멈추게 설정
        btnContainer.style.position = 'absolute';
        btnContainer.style.top = `${maxTop}px`; // 푸터 바로 위로 이동
        btnContainer.style.right = '41%';
      } else {
        // 기본 고정 상태
        btnContainer.style.position = 'fixed';
        btnContainer.style.top = '800px';
        btnContainer.style.right = '41%';
      }
    } else {
      // 스크롤이 200px 이하일 때 기본 위치로 되돌리기
      btnContainer.style.position = 'fixed';
      btnContainer.style.right = '290px';
      btnContainer.style.top = '220px';
    }
  }

  window.addEventListener('scroll', updateBtnContainerPosition);
});





document.addEventListener('DOMContentLoaded', function() {
  const stickyCards = document.querySelectorAll('.sticky-card'); // 모든 .sticky-card 요소 선택
  const offset = 400; // 원하는 고정 위치
  const footer = document.querySelector('footer'); // 푸터 요소 선택

  function updateStickyCardPositions() {
    stickyCards.forEach(card => {
      const footerOffsetTop = footer.getBoundingClientRect().top + window.scrollY; // 푸터의 절대 위치
      const cardHeight = card.offsetHeight;

      if (window.scrollY > offset) {
        const maxAllowedHeight = footerOffsetTop - window.scrollY - 55; // 푸터와 겹치기 전 가능한 최대 높이 계산

        if (maxAllowedHeight < cardHeight) {
          // 푸터에 닿기 전에 카드의 높이를 조정
          card.style.height = `${maxAllowedHeight}px`;
        } else {
          // 기본 고정 상태
          setSticky(card);
        }
      } else {
        resetPosition(card);
      }
    });
  }

  function resetPosition(card) {
    card.style.position = 'static';
    card.style.width = ''; // 원래 넓이로 되돌리기
    card.style.height = ''; // 원래 높이로 되돌리기
  }

  function setSticky(card) {
    card.style.position = 'fixed';
    card.style.top = '1px';
    card.style.width = `${card.parentElement.offsetWidth * 0.6}px`; // 부모 요소 넓이의 45%로 설정
    card.style.height = `${card.parentElement.offsetWidth}px`; // 부모 요소의 넓이에 비례한 유동적인 높이 설정
  }

  window.addEventListener('scroll', updateStickyCardPositions);
});

document.addEventListener('DOMContentLoaded', function () {
  const categoryButtons = document.querySelectorAll('.category-container .preference');
  const preferenceButtons = document.querySelectorAll('.preference-container .preference');
  const categoryBadgeContainer = document.querySelector('.category-container .card-body');
  const preferenceBadgeContainer = document.querySelector('.preference-container .card-body');
  const categoryText = document.querySelector('.category-container .card-text');
  const preferenceText = document.querySelector('.preference-container .card-text');

  // 카테고리 추가 함수
  function toggleBadge(button, containerSelector, textElement) {
    const badgeContainer = document.querySelector(containerSelector);
    const badgeText = button.textContent.trim();

    // 배지가 이미 있는지 체크
    const existingBadge = [...badgeContainer.querySelectorAll('.badge span:first-child')]
      .find(span => span.textContent === badgeText);

    if (existingBadge) {
      // 배지가 이미 있다면 제거
      existingBadge.closest('.badge').remove();
      button.classList.remove('btn-primary'); // 'btn-primary' 클래스 제거
      button.classList.add('btn-light'); // 'btn-light' 클래스 추가
      button.classList.remove('selected'); // 체크 아이콘 클래스 제거
    } else {
      // 배지가 없다면 추가
      const badge = document.createElement('span');
      badge.className = 'badge text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill';
      badge.innerHTML = `
        <span style="font-size: 20px;">${badgeText}</span>
        <span class="vr mx-2"></span>
        <svg class="bi ms-1" width="14" height="14"><use xlink:href="#x-circle-fill" /></svg>
      `;

      // 배지를 컨테이너에 추가
      badgeContainer.appendChild(badge);
      button.classList.remove('btn-light'); // 'btn-light' 클래스 제거
      button.classList.add('btn-primary'); // 'btn-primary' 클래스 추가
      button.classList.add('selected'); // 체크 아이콘 클래스 추가
    }

    // 배지가 있는지 확인 후 설명 텍스트 숨기기
    updateTextVisibility(badgeContainer, textElement);
  }

  // 배지의 상태에 따라 설명 텍스트의 가시성을 업데이트하는 함수
  function updateTextVisibility(badgeContainer, textElement) {
    if (badgeContainer.querySelectorAll('.badge').length > 0) {
      textElement.style.display = 'none'; // 배지가 하나라도 있으면 설명 숨기기
    } else {
      textElement.style.display = ''; // 배지가 없으면 설명 다시 보이기
    }
  }

  // 각 버튼에 클릭 이벤트 추가
  categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
      toggleBadge(button, '.category-container .card-body', categoryText);
    });
  });

  preferenceButtons.forEach(button => {
    button.addEventListener('click', function () {
      toggleBadge(button, '.preference-container .card-body', preferenceText);
    });
  });

  // 초기 설명 텍스트 가시성 설정
  updateTextVisibility(categoryBadgeContainer, categoryText);
  updateTextVisibility(preferenceBadgeContainer, preferenceText);
});

