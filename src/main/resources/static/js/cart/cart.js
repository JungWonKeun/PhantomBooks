document.addEventListener('DOMContentLoaded', () => {
  const quantityInputs = document.querySelectorAll('.quantity-input');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const totalPriceElement = document.getElementById('totalPrice');
  const totalPaymentElement = document.getElementById('totalPayment');
  const orderButton = document.getElementById('orderButton');
  const deleteButtons = document.querySelectorAll('.delete-btn');

  // 전체 선택 버튼
  const selectAllCheckbox = document.getElementById('selectAllCheckbox');
  const itemCheckboxes = document.querySelectorAll('.cartTable tbody input[type="checkbox"]');

  // "전체 선택" 체크박스 상태 변경 시
  selectAllCheckbox.addEventListener('change', () => {
    const isChecked = selectAllCheckbox.checked;
    itemCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
    calculateTotals();
  });

  // 개별 체크박스 상태 변경 시 "전체 선택" 체크박스 상태 업데이트
  itemCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const allChecked = Array.from(itemCheckboxes).every((cb) => cb.checked);
      selectAllCheckbox.checked = allChecked;
      calculateTotals();
    });
  });

  // 삭제 버튼 기능
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const confirmDelete = confirm('장바구니에서 삭제하시겠습니까?');
      if (!confirmDelete) return;

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
        alert('삭제 처리 중 문제가 발생했습니다.');
      }
    });
  });

  // 선택된 항목 전체 삭제 버튼
  const deleteAllButton = document.getElementById('deleteAllButton');
  deleteAllButton.addEventListener('click', async () => {
    const selectedItems = [];

    document.querySelectorAll('.cartTable tbody input[type="checkbox"]:checked').forEach((checkbox) => {
      const bookNo = checkbox.closest('tr').querySelector('.delete-btn').getAttribute('data-id');
      if (bookNo) {
        selectedItems.push(parseInt(bookNo, 10));
      }
    });

    if (selectedItems.length === 0) {
      alert('삭제할 항목을 선택하세요.');
      return;
    }

    const confirmDelete = confirm('선택된 항목을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const response = await fetch('/cart/deleteSelected', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedItems),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.deletedCount > 0) {
          alert(`${result.deletedCount}개의 항목이 삭제되었습니다.`);
          selectedItems.forEach((bookNo) => {
            const row = document.querySelector(`.cartTable tbody tr .delete-btn[data-id="${bookNo}"]`).closest('tr');
            if (row) row.remove();
          });
          calculateTotals();
        } else {
          alert('삭제된 항목이 없습니다.');
        }
      } else {
        const errorMsg = await response.text();
        console.error('서버 응답 오류:', errorMsg);
        alert(`삭제 요청 실패: ${errorMsg}`);
      }
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert('삭제 처리 중 문제가 발생했습니다.');
    }
  });

  // 총 가격 및 총 상품 수 계산
  function calculateTotals() {
    let totalPrice = 0;
    const deliveryFee = 3500;

    document.querySelectorAll('.cartTable tbody tr').forEach((row) => {
      const checkbox = row.querySelector('input[type="checkbox"]');
      const price = parseInt(row.querySelector('td:nth-child(4)').innerText.replace(/[^\d]/g, ''), 10) || 0;
      const quantity = parseInt(row.querySelector('.quantity-input').value, 10) || 0;

      if (checkbox.checked) {
        totalPrice += price * quantity;
      }
    });

    const totalPayment = totalPrice + (totalPrice > 0 ? deliveryFee : 0);
    totalPriceElement.innerText = `${totalPrice.toLocaleString()} 원`;
    totalPaymentElement.innerText = `${totalPayment.toLocaleString()} 원`;
  }

  // 수량 변경 및 체크박스 상태 변경 시 계산
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', calculateTotals);
  });

  quantityInputs.forEach((input) => {
    input.addEventListener('input', calculateTotals);
  });

  calculateTotals();

  // 가격에 ',' 표시
  document.querySelectorAll('.book-price').forEach((element) => {
    const price = parseInt(element.getAttribute('data-price'), 10);
    element.textContent = price.toLocaleString() + '원';
  });

  // 수량 조절 기능
  const quantityControls = document.querySelectorAll('.quantity-control');

  quantityControls.forEach(control => {
    const input = control.querySelector('.quantity-input');
    const increaseBtn = control.querySelector('.increase');
    const decreaseBtn = control.querySelector('.decrease');

    increaseBtn.addEventListener('click', () => {
      const currentValue = parseInt(input.value, 10) || 0;
      input.value = currentValue + 1;
      calculateTotals();
    });

    decreaseBtn.addEventListener('click', () => {
      const currentValue = parseInt(input.value, 10) || 1;
      if (currentValue > 1) {
        input.value = currentValue - 1;
        calculateTotals();
      }
    });
  });

  // 선택한 상품 주문 버튼 클릭 시
  orderButton.addEventListener('click', async () => {
    try {
      // 선택된 상품 확인
      const selectedItems = [];
      document.querySelectorAll('.cartTable tbody tr').forEach((row) => {
        const checkbox = row.querySelector('input[type="checkbox"]');
        if (!checkbox.checked) return;

        const bookNo = row.querySelector('.delete-btn').getAttribute('data-id');
        const bookCover = row.querySelector('td:nth-child(2) img').getAttribute('src');
        const bookTitle = row.querySelector('td:nth-child(3)').innerText;
        const quantity = parseInt(row.querySelector('.quantity-input').value, 10);
        const price = parseInt(row.querySelector('.book-price').getAttribute('data-price'), 10);

        if (bookNo && quantity > 0) {
          selectedItems.push({
            bookNo: parseInt(bookNo),
            bookTitle,
            bookCover,
            cartCount: quantity,
            bookPrice: price,
            totalPrice: price * quantity,
          });
        }
      });

      if (selectedItems.length === 0) {
        alert('주문할 상품을 선택하세요.');
        return;
      }

      // 서버로 데이터 전송
      const response = await fetch('/cart/selectOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(selectedItems),
        credentials: 'include'  // 쿠키 포함
      });

      // 응답 상태 확인
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`서버 오류: ${errorText}`);
      }

      // 응답 처리
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        if (result.success) {
          location.href = '/order';  // window.location.href 대신 location.href 사용
        } else {
          throw new Error(result.message || '주문 처리 실패');
        }
      } else {
        // JSON이 아닌 경우 직접 리다이렉트
        location.href = '/order';
      }

    } catch (error) {
      console.error('주문 처리 오류:', error);
      alert(`주문 처리 중 오류가 발생했습니다.\n${error.message}`);
    }
  });

  // 추천 도서 슬라이더 관련 코드
  const scrollContainer = document.getElementById('scroll-container');
  const scrollBar = document.querySelector('.scroll-bar');
  const sliderIndicator = document.querySelector('.slider-indicator');
  let isBouncing = false;

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

  updateScrollBar();
});
