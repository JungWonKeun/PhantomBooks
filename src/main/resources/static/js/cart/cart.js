document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.getElementById('scroll-container');
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
    if (!isDragging) return; // 드래그 중이 아니면 중지
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1.5; // 속도 조정
    scrollContainer.scrollLeft = scrollLeft - walk;
  });

  // 드래그 종료
  scrollContainer.addEventListener('mouseup', () => {
    isDragging = false;
    scrollContainer.style.cursor = 'grab';
  });

  scrollContainer.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      scrollContainer.style.cursor = 'grab';
    }
  });
});
