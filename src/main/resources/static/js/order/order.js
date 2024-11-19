document.addEventListener('DOMContentLoaded', () => {
  
  // 주소 찾기, 삭제, 변경 버튼
  document.getElementById('addressFindBtn').addEventListener('click', findAddress);
  document.getElementById('addressChangeBtn').addEventListener('click', changeAddress);
  
  // 총 결제 금액 요소
  const totalPriceElement = document.getElementById('totalPriceElement');
  const bookPrices = document.querySelectorAll('.book-price'); 
  const deliveryFeeElement = document.querySelector('.delivery-fee');

  

  // 총 결제 금액에 ',' 추가
  if (totalPriceElement) {
    const totalPriceText = totalPriceElement.textContent.replace(/[^\d]/g, '');
    const formattedTotalPrice = parseInt(totalPriceText, 10).toLocaleString() + ' 원';
    totalPriceElement.textContent = formattedTotalPrice;
  }

  // 개별 책 가격에 ',' 추가
  bookPrices.forEach((element) => {
    const price = element.getAttribute('data-price'); 
    if (price && !isNaN(price)) {
      const formattedPrice = parseInt(price, 10).toLocaleString() + ' 원'; 
      element.textContent = formattedPrice;
    } else {
      console.error('Invalid price:', price); 
    }
  });

  // 배송비에 ',' 추가
  if (deliveryFeeElement) {
    const deliveryFeeText = deliveryFeeElement.textContent.replace(/[^\d]/g, '');
    const formattedDeliveryFee = parseInt(deliveryFeeText, 10).toLocaleString() + ' 원';
    deliveryFeeElement.textContent = formattedDeliveryFee;
    console.log('Delivery Fee (data-fee):', deliveryFeeElement.getAttribute('data-fee'));
  }



  // 주소 입력
  function openAddressPopup() {
    alert("주소 찾기 팝업이 열립니다.");
    // 실제 주소 찾기 팝업 기능을 추가하세요
  }
  
  /* 다음 주소 API로 주소 검색하기 */
  // 주소 찾기
function findAddress() {
  const zip = document.getElementById('zip');
  const mainAddress = document.getElementById('address');
  const detailAddress = document.getElementById('detailAddress');

  new daum.Postcode({
    oncomplete: function (data) {
      var addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
      zip.value = data.zonecode;
      mainAddress.value = addr;
      detailAddress.removeAttribute('readonly');
      detailAddress.focus();
      document.getElementById("addressFindBtn").style.display = 'none';
      document.getElementById("addressChangeBtn").style.display = 'block';
    }
  }).open();
}

// 주소 변경
function changeAddress() {
  clearInput('zip');
  clearInput('address');
  clearInput('detailAddress');
  const detailAddress = document.getElementById('detailAddress');
  detailAddress.setAttribute('readonly', 'readonly');
  document.getElementById("addressFindBtn").style.display = 'block';
  document.getElementById("addressChangeBtn").style.display = 'none';
}

// 입력 필드 초기화
function clearInput(inputId) {
  document.getElementById(inputId).value = '';
}

// 입력 필드 초기화
function clearInput(inputId) {
  document.getElementById(inputId).value = '';
}


  function changeAddress() {
    clearInput('zip');
    clearInput('address');
    clearInput('detailAddress');
    detailAddress.setAttribute('readonly', 'readonly');
    document.getElementById("addressFindBtn").style.display = 'block';
    document.getElementById("addressChangeBtn").style.display = 'none';
  }

  function clearInput(inputId) {
    document.getElementById(inputId).value = '';
  }
  

});
