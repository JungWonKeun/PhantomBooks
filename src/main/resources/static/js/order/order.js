document.addEventListener('DOMContentLoaded', () => {
  const defaultAddressCheckbox = document.getElementById('defaultAddressCheck');
  const zipInput = document.getElementById('userZip');
  const addressInput = document.getElementById('userAddress');
  const detailAddressInput = document.getElementById('userDetailAddress');
  const userNameInput = document.getElementById('userName');
  const userTelNoInput = document.getElementById('userTelNo');

  const addAddressBtn = document.getElementById('addAddressBtn');
  const additionalAddressesContainer = document.getElementById('additionalAddresses');
  let selectedAddress = {
    zip: zipInput.value,
    address: addressInput.value,
    detailAddress: detailAddressInput.value,
  };

  // 기본 배송지 선택 시 추가 배송지 해제
  defaultAddressCheckbox.addEventListener('change', () => {
    if (defaultAddressCheckbox.checked) {
      const additionalCheckbox = document.querySelector('.additional-address-form .defaultAddressCheck');
      if (additionalCheckbox) additionalCheckbox.checked = false;

      selectedAddress = {
        zip: zipInput.value,
        address: addressInput.value,
        detailAddress: detailAddressInput.value,
      };
    }
  });

  // 배송지 추가 버튼 클릭
  addAddressBtn.addEventListener('click', () => {
    const existingAddress = document.querySelector('.additional-address-form');
    if (existingAddress) {
      alert('추가 배송지는 한 개만 생성할 수 있습니다.');
      return;
    }

    const newAddressForm = createNewAddressForm();
    additionalAddressesContainer.appendChild(newAddressForm);

    const newCheckbox = newAddressForm.querySelector('.defaultAddressCheck');
    const validateButton = newAddressForm.querySelector('.validateButton');
    const findAddressBtn = newAddressForm.querySelector('.findAddressBtn');

    newCheckbox.addEventListener('change', () => {
      if (newCheckbox.checked) {
        defaultAddressCheckbox.checked = false;
        const newZipInput = newAddressForm.querySelector('.zip-input').value;
        const newAddressInput = newAddressForm.querySelector('.address-input').value;
        const newDetailAddressInput = newAddressForm.querySelector('.detail-address-input').value;

        selectedAddress = {
          zip: newZipInput,
          address: newAddressInput,
          detailAddress: newDetailAddressInput,
        };
      }
    });

    // validateButton 클릭 이벤트
    validateButton.addEventListener('click', () => {
      const newZipInput = newAddressForm.querySelector('.zip-input');
      const newAddressInput = newAddressForm.querySelector('.address-input');
      const newDetailAddressInput = newAddressForm.querySelector('.detail-address-input');

      if (!newZipInput.value || !newAddressInput.value || !newDetailAddressInput.value) {
        alert('추가 배송지 정보를 모두 입력해주세요.');
        return;
      }

      console.log('추가된 배송지:', newZipInput.value, newAddressInput.value, newDetailAddressInput.value);

      alert('추가된 배송지가 기본 배송지로 선택되었습니다.');
      selectedAddress = {
        zip: newZipInput.value,
        address: newAddressInput.value,
        detailAddress: newDetailAddressInput.value,
      };

      defaultAddressCheckbox.checked = false;
      newCheckbox.checked = true;
    });


    findAddressBtn.addEventListener('click', () => {
      new daum.Postcode({
        oncomplete: (data) => {
          const newZipInput = newAddressForm.querySelector('.zip-input');
          const newAddressInput = newAddressForm.querySelector('.address-input');
          newZipInput.value = data.zonecode;
          newAddressInput.value = data.roadAddress || data.jibunAddress;
          newAddressForm.querySelector('.detail-address-input').focus();
        },
      }).open();
    });
  });

  // 새로운 배송지 폼 생성
  function createNewAddressForm() {
    const formElement = document.createElement('div');
    formElement.classList.add('additional-address-form', 'mt-4');

    formElement.innerHTML = `
      <div class="form-floating mb-2">
        <input type="checkbox" class="defaultAddressCheck">
        <h4>추가 배송지</h4>
      </div>
      <div class="form-floating mb-2">
        <input type="text" class="form-control zip-input" placeholder="우편번호" readonly>
        <label>우편번호</label>
      </div>
      <div class="form-floating mb-2">
        <input type="text" class="form-control address-input" placeholder="주소" readonly>
        <label>주소</label>
      </div>
      <div class="form-floating mb-2">
        <input type="text" class="form-control detail-address-input" placeholder="상세 주소">
        <label>상세 주소</label>
      </div>
      <button type="button" class="btn btn-secondary findAddressBtn">주소 검색</button>
      <button type="button" class="btn btn-success validateButton">입력 확인</button>
    `;

    return formElement;
  }

  document.getElementById('paymentButton').addEventListener('click', () => {
    if (!userNameInput.value || !userTelNoInput.value) {
      alert('수령인 이름과 전화번호를 입력해주세요.');
      return;
    }

    if (!selectedAddress.zip || !selectedAddress.address || !selectedAddress.detailAddress) {
      alert('배송지를 선택해주세요.');
      return;
    }

    
  });
});
