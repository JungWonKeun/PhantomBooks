document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.getElementById('scroll-container');
  const scrollBar = document.querySelector('.scroll-bar');
  const items = scrollContainer.querySelectorAll('.recommendation-item');
  const visibleItems = 5; // 한 화면에 보이는 추천 도서 개수
  const totalSlides = Math.ceil(items.length / visibleItems); // 전체 슬라이드 수

  let isDragging = false;
  let startX;
  let scrollLeft;

  // 드래그 시작
  scrollContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    scrollContainer.style.cursor = 'grabbing';
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });
  
  // 드래그 중
  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1.5; // 드래그 속도 조정
    scrollContainer.scrollLeft = scrollLeft - walk;
    updateScrollBar();
  });

  // 드래그 종료
  scrollContainer.addEventListener('mouseup', () => {
    isDragging = false;
    scrollContainer.style.cursor = 'grab';
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    scrollContainer.style.cursor = 'grab';
  });

  // 스크롤 이벤트
  scrollContainer.addEventListener('scroll', updateScrollBar);

  // 스크롤 바 업데이트 함수
  function updateScrollBar() {
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth; // 최대 스크롤 가능 거리
    const currentScroll = scrollContainer.scrollLeft; // 현재 스크롤 위치

    const barWidth = (scrollContainer.clientWidth / scrollContainer.scrollWidth) * 120; // 스크롤 바의 너비 비율
    const percentage = (currentScroll / maxScroll) * 90; // 현재 스크롤 위치 비율

    scrollBar.style.width = `${barWidth}%`; // 스크롤 바 너비 설정
    scrollBar.style.transform = `translateX(${percentage}%)`; // 스크롤 바 위치 설정
  }

  // 초기화
  updateScrollBar();
});
