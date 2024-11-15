document.addEventListener('DOMContentLoaded', () => {

  /* 오늘의 추천 도서 */
  const books = document.querySelectorAll(".book");
  let currentIndex = 0;

  books[currentIndex].classList.add("active");

  function showNextBook() {
    books[currentIndex].classList.remove("active");

    currentIndex = (currentIndex + 1) % books.length;

    books[currentIndex].classList.add("active");
  }

  // 5초마다 호출
  setInterval(showNextBook, 5000);

  const scrollContainer = document.getElementById('scroll-container');
  const scrollBar = document.querySelector('.scroll-bar');
  const sliderIndicator = document.querySelector('.slider-indicator');
  let isBouncing = false; // 튕김 효과 상태 확인

  // 스크롤 바 업데이트 함수 (대체된 부분)
  function updateScrollBar() {
    const maxScrollDistance = scrollContainer.scrollWidth - scrollContainer.clientWidth; // 전체 스크롤 가능 거리
    const currentScroll = scrollContainer.scrollLeft; // 현재 스크롤 위치
    const maxScrollBarPosition = sliderIndicator.offsetWidth - scrollBar.offsetWidth; // 스크롤바가 이동 가능한 최대 거리

    if (maxScrollDistance <= 0) {
      scrollBar.style.transform = `translateX(0)`;
      return;
    }

    const scrollRatio = currentScroll / maxScrollDistance; // 스크롤 비율
    const scrollBarPosition = scrollRatio * maxScrollBarPosition; // 스크롤바 위치 계산

    scrollBar.style.transform = `translateX(${scrollBarPosition}px)`; // 스크롤바 이동
  }

  // 튕김 애니메이션 효과
  function bounce(direction) {
    if (isBouncing) return;
    isBouncing = true;

    const bounceDistance = 50;
    const bounceDuration = 300;

    scrollContainer.style.transition = `transform ${bounceDuration}ms ease-out`;
    scrollContainer.style.transform = `translateX(${direction === 'left' ? bounceDistance : -bounceDistance}px)`;

    setTimeout(() => {
      scrollContainer.style.transform = 'translateX(0)';
      scrollContainer.style.transition = '';
      isBouncing = false;
    }, bounceDuration);
  }

  // 드래그 동작
  let isDragging = false;
  let startX;
  let scrollLeft;

  scrollContainer.addEventListener("dragstart", (e) => {
    e.preventDefault(); // 기본 드래그 방지
  });

  scrollContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    scrollContainer.style.cursor = 'grabbing';
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1.5;

    if (scrollContainer.scrollLeft <= 0 && walk > 0) {
      bounce('left');
      return;
    } else if (
      scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth &&
      walk < 0
    ) {
      bounce('right');
      return;
    }

    scrollContainer.scrollLeft = scrollLeft - walk;
    updateScrollBar();
  });

  scrollContainer.addEventListener('mouseup', () => {
    isDragging = false;
    scrollContainer.style.cursor = 'grab';
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    scrollContainer.style.cursor = 'grab';
  });

  // 스크롤 이벤트로도 스크롤바 동기화
  scrollContainer.addEventListener('scroll', updateScrollBar);

  // 초기화
  updateScrollBar();
});
