document.addEventListener('DOMContentLoaded', () => {

  // 배송지 관련 입력 필드
  const zipInput = document.getElementById('zip');
  const addressInput = document.getElementById('address');
  const detailAddressInput = document.getElementById('detailAddress');

  // 결제 금액 관련 요소
  const totalPriceElement = document.getElementById('totalPriceElement');
  const bookPrices = document.querySelectorAll('.book-price');
  const deliveryFeeElement = document.querySelector('.delivery-fee');

  
  // 총 결제 금액에 ',' 추가
  if (totalPriceElement) {
    const totalPriceText = totalPriceElement.textContent.replace(/[^\d]/g, '');
    totalPriceElement.textContent = formatNumberWithComma(totalPriceText) + ' 원';
  }
  
  // 개별 책 가격에 ',' 추가
  bookPrices.forEach(element => {
    const price = element.getAttribute('data-price');
    if (price && !isNaN(price)) {
      element.textContent = formatNumberWithComma(price) + ' 원';
    } else {
      console.error('Invalid price:', price);
    }
  });
  
  // 배송비에 ',' 추가
  if (deliveryFeeElement) {
    const deliveryFeeText = deliveryFeeElement.textContent.replace(/[^\d]/g, '');
    deliveryFeeElement.textContent = formatNumberWithComma(deliveryFeeText) + ' 원';
  }
  
  // 숫자에 ',' 추가하는 함수
  function formatNumberWithComma(number) {
    return parseInt(number, 10).toLocaleString();
  }
  
  // 기본 배송지 가져오기
  fetch('/order/member/default-address')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
      } else {
        throw new Error('배송지 정보를 가져오는 데 실패했습니다.');
      }
    })
    .then(data => {
      zipInput.value = data.zip || '';
      addressInput.value = data.address || '';
      detailAddressInput.value = data.detailAddress || '';
      toggleAddressButtons(data.zip && data.address && data.detailAddress);
    })
    .catch(error => console.error('Error fetching default address:', error));


  // 배송지 추가 버튼
  const addAddressBtn = document.getElementById('addAddressBtn');
  const additionalAddressesContainer = document.getElementById('additionalAddresses');

  // 배송지 추가 버튼 클릭 이벤트
  addAddressBtn.addEventListener('click', () => {
    const newAddressForm = createNewAddressForm();
    additionalAddressesContainer.appendChild(newAddressForm);
  });

  // 새로운 배송지 폼 생성 함수
  function createNewAddressForm() {
    const formElement = document.createElement('form');
    formElement.classList.add('mt-4', 'additional-address-form');

    formElement.innerHTML = `
      <div class="form-floating row g-3 mb-2 mt-2 position-relative">
        <input type="checkbox" id="defaultAddressCheck">
        <h4>기본 배송지</h4>
        <div class="col-auto d-flex align-items-center justify-content-center">
          <button type="button" class="btn btn-secondary findAddressBtn">주소 찾기</button>
        </div>
      </div>

      <!-- 우편번호, 주소, 상세 주소 입력 -->
      <div class="form-floating mb-2 mt-2 position-relative">
        <input type="text" class="form-control zip-input" placeholder="우편번호" readonly>
        <label>우편번호</label>
      </div>
      <div class="form-floating mb-2 mt-2 position-relative">
        <input type="text" class="form-control address-input" placeholder="주소" readonly>
        <label>주소</label>
      </div>
      <div class="form-floating mb-2 mt-2 position-relative">
        <input type="text" class="form-control detail-address-input" placeholder="상세 주소">
        <label>상세 주소</label>
      </div>
    `;

    // 폼 내부 요소 선택
    const findAddressBtn = formElement.querySelector('.findAddressBtn');
    const zipInput = formElement.querySelector('.zip-input');
    const addressInput = formElement.querySelector('.address-input');
    const detailAddressInput = formElement.querySelector('.detail-address-input');

    // "주소 찾기" 버튼 이벤트
    findAddressBtn.addEventListener('click', () => {
      new daum.Postcode({
        oncomplete: (data) => {
          zipInput.value = data.zonecode;
          addressInput.value = data.roadAddress || data.jibunAddress;
          detailAddressInput.focus();
        }
      }).open();
    });

    return formElement;
  }
});
