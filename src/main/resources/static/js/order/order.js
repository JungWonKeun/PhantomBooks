document.addEventListener('DOMContentLoaded', () => {
  // 배송지 입력 
  const zipInput = document.getElementById('zip');
  const addressInput = document.getElementById('address');
  const detailAddressInput = document.getElementById('detailAddress');

  // 배송지 추가 버튼
  const addAddressBtn = document.getElementById('addAddressBtn');
  const additionalAddressesContainer = document.getElementById('additionalAddresses');

  // 결제 금액 관련 요소
  const totalPriceElement = document.getElementById('totalPriceElement');
  const bookPrices = document.querySelectorAll('.book-price');
  const deliveryFeeElement = document.querySelector('.delivery-fee');

  // 체크박스 하나만 선택
  const handleCheckboxToggle = (e) => {
    if (e.target.type === 'checkbox' && e.target.checked) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        if (checkbox !== e.target) {
          checkbox.checked = false;
        }
      });
    }
  };

  // 체크박스 초기화
  const initializeCheckboxes = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', handleCheckboxToggle);
    });
  };

  // 기본 배송지 가져오기
  fetch('/order/member/default-address')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
      } else {
        throw new Error('배송지 정보를 가져오는 데 실패했습니다.');
      }
    })
    .then((data) => {
      zipInput.value = data.zip || '';
      addressInput.value = data.address || '';
      detailAddressInput.value = data.detailAddress || '';
    })
    .catch((error) => console.error('기본 배송지가 없습니다.', error));

  // 배송지 추가 버튼 클릭 이벤트
  addAddressBtn.addEventListener('click', () => {
    const newAddressForm = createNewAddressForm();
    additionalAddressesContainer.appendChild(newAddressForm);

    // 새로 추가된 폼의 체크박스에 이벤트 등록
    const newCheckbox = newAddressForm.querySelector('input[type="checkbox"]');
    newCheckbox.addEventListener('change', handleCheckboxToggle);

    // 배송지 추가 버튼 비활성화
    addAddressBtn.disabled = true;
  });

  // 새로운 배송지 추가
  function createNewAddressForm() {
    const formElement = document.createElement('div'); 
    formElement.classList.add('additional-address-form', 'mt-4');

    formElement.innerHTML = `
      <div class="form-floating row g-3 mb-2 mt-2 position-relative">
        <input type="checkbox" class="defaultAddressCheck">
        <h4>추가 배송지</h4>
        <div class="col-auto d-flex align-items-center justify-content-center">
          <button type="button" class="btn btn-secondary findAddressBtn">주소 찾기</button>
        </div>
      </div>
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
        <!-- 확인 버튼 -->
       <button type="button" id="validateButton">입력 확인</button>
      </div>
    `;

    const findAddressBtn = formElement.querySelector('.findAddressBtn');
    const zipInput = formElement.querySelector('.zip-input');
    const addressInput = formElement.querySelector('.address-input');
    const detailAddressInput = formElement.querySelector('.detail-address-input');

    // 주소 찾기
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

  // 추가 배송지 주소 입력 확인 버튼
  document.getElementById('validateButton').addEventListener('click', function() {
    const userName = document.getElementById('userName').value.trim();
    const userTelNo = document.getElementById('userTelNo').value.trim();
    const userZip = document.getElementById('userZip').value.trim();
    const userAddress = document.getElementById('userAddress').value.trim();
    const userDetailAddress = document.getElementById('userDetailAddress').value.trim();





    // 필수 입력 확인
    if (!userName) {
        alert('수령인 이름을 입력해주세요.');
        return;
    }

    if (!userTelNo) {
        alert('전화번호를 입력해주세요.');
        return;
    }

    // 전화번호 형식 확인
    const telPattern = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
    if (!telPattern.test(userTelNo)) {
        alert('전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)');
        return;
    }

    if (!userZip || !userAddress || !userDetailAddress) {
        alert('추가 배송지 정보를 모두 입력해주세요.');
        return;
    }

    alert('모든 입력이 올바릅니다.');
});


  // 금액 표시 형식 변경
  if (totalPriceElement) {
    const totalPriceText = totalPriceElement.textContent.replace(/[^\d]/g, '');
    totalPriceElement.textContent = formatNumberWithComma(totalPriceText) + ' 원';
  }

  bookPrices.forEach((element) => {
    const price = element.getAttribute('data-price');
    if (price && !isNaN(price)) {
      element.textContent = formatNumberWithComma(price) + ' 원';
    } else {
      console.error('Invalid price:', price);
    }
  });

  if (deliveryFeeElement) {
    const deliveryFeeText = deliveryFeeElement.textContent.replace(/[^\d]/g, '');
    deliveryFeeElement.textContent = formatNumberWithComma(deliveryFeeText) + ' 원';
  }

  function formatNumberWithComma(number) {
    return parseInt(number, 10).toLocaleString();
  }

  initializeCheckboxes();



});


document.addEventListener("DOMContentLoaded", ()=> {
  
  document.getElementById('paymentButton').addEventListener('click', function() {
    const orderData = {
        // memberNo: document.getElementById('memberNo').value,
        // orderCount: parseInt(document.getElementById('orderCount').value, 10),
        totalPrice: parseInt(document.getElementById('totalPrice').innerText, 10),
        userZip: document.getElementById('userZip').value,
        userAddress: document.getElementById('userAddress').value,
        userDetailAddress: document.getElementById('userDetailAddress').value,
        userTelNo: document.getElementById('userTelNo').value,
        userName: document.getElementById('userName').value,
        orderNo : 10000
    };

    fetch('/order/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
    })
    .then(response => response.text())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
  });
})