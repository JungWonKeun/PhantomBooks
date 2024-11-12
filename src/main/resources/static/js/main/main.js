document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.getElementById('scroll-container');
  const scrollBar = document.querySelector('.scroll-bar');
  const sliderIndicator = document.querySelector('.slider-indicator');
  let isBouncing = false; // 튕김 효과 상태 확인

   // 스크롤 바 업데이트 함수
  function updateScrollBar() {
    const maxScrollDistance = scrollContainer.scrollWidth - scrollContainer.clientWidth; // 추천도서 전체 스크롤 거리
    const currentScroll = scrollContainer.scrollLeft; // 추천도서 현재 스크롤 위치
    const maxScrollBarPosition = sliderIndicator.offsetWidth - scrollBar.offsetWidth; // 스크롤바가 slider-indicator에서 이동할 수 있는 최대 거리

    if (maxScrollDistance <= 0) {
      // 스크롤할 필요가 없을 경우 스크롤바는 항상 처음 위치
      scrollBar.style.transform = `translateX(0)`;
      return;
    }

    // 추천도서 스크롤 비율을 스크롤바에 반영
    const scrollRatio = currentScroll / maxScrollDistance; // 0에서 1 사이의 비율
    const scrollBarPosition = scrollRatio * maxScrollBarPosition;

    // 스크롤바 이동
    scrollBar.style.transform = `translateX(${scrollBarPosition}px)`;
  }

  // 튕김 애니메이션 효과
  function bounce(direction) {
    if (isBouncing) return; // 이미 애니메이션 중이면 실행하지 않음
    isBouncing = true;

    const bounceDistance = 50; // 튕김 거리
    const bounceDuration = 300; // 애니메이션 지속 시간

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
    const walk = (x - startX) * 1.5; // 드래그 속도

    // 양쪽 끝에 도달했는지 확인
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
    updateScrollBar(); // 스크롤바도 동기화
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