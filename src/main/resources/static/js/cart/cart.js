document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.getElementById('scroll-container');
  let isDragging = false;
  let startX;
  let scrollLeft;

  // 마우스 드래그 방지
  scrollContainer.addEventListener('dragstart', (e) => e.preventDefault());

  // 마우스를 누를 때
  scrollContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    scrollContainer.style.cursor = 'grabbing';
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
  });

  // 마우스를 움직일 때
  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 1.5; // 드래그 속도
    scrollContainer.scrollLeft = scrollLeft - walk;
  });

  // 드래그를 멈출 때
  scrollContainer.addEventListener('mouseup', () => {
    isDragging = false;
    scrollContainer.style.cursor = 'grab';
    handleSnapBack(); // 튕기기 효과 호출
  });

  // 영역을 벗어날 때
  scrollContainer.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      scrollContainer.style.cursor = 'grab';
      handleSnapBack(); // 튕기기 효과 호출
    }
  });

  // 튕기기 효과
  function handleSnapBack() {
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    if (scrollContainer.scrollLeft < 0) {
      scrollContainer.style.transition = 'transform 0.3s ease-in-out';
      scrollContainer.style.transform = `translateX(${Math.abs(scrollContainer.scrollLeft)}px)`;
      setTimeout(() => {
        scrollContainer.style.transition = '';
        scrollContainer.style.transform = '';
        scrollContainer.scrollLeft = 0;
      }, 300);
    } else if (scrollContainer.scrollLeft > maxScroll) {
      const overshoot = scrollContainer.scrollLeft - maxScroll;
      scrollContainer.style.transition = 'transform 0.3s ease-in-out';
      scrollContainer.style.transform = `translateX(-${overshoot}px)`;
      setTimeout(() => {
        scrollContainer.style.transition = '';
        scrollContainer.style.transform = '';
        scrollContainer.scrollLeft = maxScroll;
      }, 300);
    }
  }

  console.log('스크립트 로드 완료');
});

