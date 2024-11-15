document.addEventListener('DOMContentLoaded', () => {
  const quantityInputs = document.querySelectorAll('.quantity-input');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const totalPriceElement = document.getElementById('totalPrice');
  const totalCountElement = document.getElementById('totalCount');
  const orderButton = document.getElementById('orderButton');

  // 총 가격 및 총 상품 수 계산
  function calculateTotals() {
    let totalPrice = 0;
    let totalCount = 0;

    document.querySelectorAll('.cartTable tbody tr').forEach((row) => {
      const checkbox = row.querySelector('input[type="checkbox"]');
      const price = parseInt(row.querySelector('td:nth-child(4)').innerText.replace(/[^\d]/g, ''), 10) || 0; // 숫자만 추출
      const quantity = parseInt(row.querySelector('.quantity-input').value, 10) || 0;

      if (checkbox.checked) {
        totalPrice += price * quantity;
        totalCount += quantity;
      }
    });

    // 총 상품 가격 및 주문 수량 업데이트
    totalPriceElement.innerText = `${totalPrice.toLocaleString()} 원`;
    totalCountElement.innerText = `${totalCount} 개`;
  }

  // 수량 변경 및 체크박스 상태 변경 시 계산
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', calculateTotals);
  });

  quantityInputs.forEach((input) => {
    input.addEventListener('input', calculateTotals);
  });

  calculateTotals(); // 초기 계산

  // 삭제 버튼 기능
  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const bookNo = button.getAttribute('data-id');

      try {
        const response = await fetch(`/cart/delete/${bookNo}`, { method: 'DELETE' });
        if (response.ok) {
          button.closest('tr').remove();
          calculateTotals();
        } else {
          alert('삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    });
  });

  // 선택한 상품 주문 버튼 클릭 시
  orderButton.addEventListener('click', () => {
    const selectedItems = [];

    document.querySelectorAll('.cartTable tbody tr').forEach((row) => {
      const checkbox = row.querySelector('input[type="checkbox"]');
      const bookNo = row.querySelector('.delete-btn').getAttribute('data-id');
      const quantity = parseInt(row.querySelector('.quantity-input').value, 10);

      if (checkbox.checked && bookNo && quantity > 0) {
        selectedItems.push({ bookNo, quantity });
      }
    });

    if (selectedItems.length === 0) {
      alert('주문할 상품을 선택하세요.');
      return;
    }

    // 서버로 선택된 데이터 전송
    fetch('/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedItems),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = '/order';
        } else {
          alert('주문에 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('주문 중 오류 발생:', error);
        alert('주문 처리 중 문제가 발생했습니다.');
      });
  });

  // 추천 도서 슬라이더 관련 코드
  const scrollContainer = document.getElementById('scroll-container');
  const scrollBar = document.querySelector('.scroll-bar');
  const sliderIndicator = document.querySelector('.slider-indicator');
  let isBouncing = false;

  // 스크롤 바 업데이트 함수
  function updateScrollBar() {
    const maxScrollDistance = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const currentScroll = scrollContainer.scrollLeft;
    const maxScrollBarPosition = sliderIndicator.offsetWidth - scrollBar.offsetWidth;

    if (maxScrollDistance <= 0) {
      scrollBar.style.transform = `translateX(0)`;
      return;
    }

    const scrollRatio = currentScroll / maxScrollDistance;
    const scrollBarPosition = scrollRatio * maxScrollBarPosition;

    scrollBar.style.transform = `translateX(${scrollBarPosition}px)`;
  }

  // 튕김 효과
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

  scrollContainer.addEventListener('scroll', updateScrollBar);

  updateScrollBar(); // 초기화
});
