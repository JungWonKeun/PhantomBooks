// 내 정보 페이지 오픈 및 닫기
document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");
  const menus = document.querySelectorAll('.menu');

  // 각 메뉴 클릭 시 active 상태 토글
  menus.forEach(menu => {
    menu.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  });

  // 모두 열기 버튼 클릭
  openBtn.addEventListener("click", () => {
    openBtn.style.display = "none";
    closeBtn.style.display = "inline-block";
    menus.forEach(menu => {
      menu.classList.add("active");
    });
  });

  // 모두 닫기 버튼 클릭
  closeBtn.addEventListener("click", () => {
    openBtn.style.display = "inline-block";
    closeBtn.style.display = "none";
    menus.forEach(menu => {
      menu.classList.remove("active");
    });
  });
});


const name = document.getElementById('name');
const telNo = document.getElementById('telNo');
const birthDate = document.getElementById('birthDate');


const changeinfoForm = document.querySelector("#changeinfoForm");


// 회원 정보 변경
changeinfoForm.addEventListener("submit", e => {
  if (confirm("회원 정보를 수정하시겠습니까?")) {
    // 서버에 폼을 제출
    changeinfoForm.submit();
  } else {
    // 폼 제출을 막기 위해 기본 동작 방지
    e.preventDefault();
    alert("회원 정보 수정을 취소하였습니다.");
  }
});



// 입력 필드 초기화 함수
// 특정 입력 필드의 내용을 초기화하는 함수
function clearInput(inputId) {
  document.getElementById(inputId).value = '';

}

/* 다음 주소 API로 주소 검색하기 */
function findAddress() {
  const zip = document.getElementById('zip');
  const mainAddress = document.getElementById('address');
  const detailAddress = document.getElementById('detailAddress');

  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ''; // 주소 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else { // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      zip.value = data.zonecode;
      mainAddress.value = addr;
      // 커서를 상세주소 필드로 이동한다.
      detailAddress.removeAttribute('readonly');
      detailAddress.focus();
      document.getElementById("addressFindBtn").style.display = 'none';
      document.getElementById("addressChangeBtn").style.display = 'block';
      toggleSubmitButton();
    }

  }).open();
}
function findAddAddress() {
  const addZip = document.getElementById('addZip');
  const addAddress = document.getElementById('addAddress');
  const addDetailAddress = document.getElementById('addDetailAddress');

  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ''; // 주소 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else { // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      addZip.value = data.zonecode;
      addAddress.value = addr;
      // 커서를 상세주소 필드로 이동한다.
      addDetailAddress.removeAttribute('readonly');
      addDetailAddress.focus();
      document.getElementById("addAddressFindBtn").style.display = 'none';
      document.getElementById("addAddressChangeBtn").style.display = 'block';
      toggleSubmitButton();
    }

  }).open();
}

function changeAddress() {
  clearInput('zip');
  clearInput('address');
  clearInput('detailAddress');
  detailAddress.setAttribute('readonly', 'readonly');
  document.getElementById("addressFindBtn").style.display = 'block';
  document.getElementById("addressChangeBtn").style.display = 'none';
  toggleSubmitButton()
}
function changeAddAddress() {
  clearInput('addZip');
  clearInput('addAddress');
  clearInput('addDetailAddress');
  addDetailAddress.setAttribute('readonly', 'readonly');
  document.getElementById("addAddressFindBtn").style.display = 'block';
  document.getElementById("addAddressChangeBtn").style.display = 'none';
  toggleSubmitButton();
}

function addAddressToDefault() {
  if (addZip.value === '') {
    alert("추가 배송지를 작성해주세요.");
    return;
  }
  if (confirm("추가 배송지를 기본 배송지로 변경하시겠습니까?")) {
    const temporaryZip = zip.value;
    const temporaryAddress = address.value;
    const temporaryDetailAddress = detailAddress.value;

    zip.value = addZip.value;
    address.value = addAddress.value;
    detailAddress.value = addDetailAddress.value;

    addZip.value = temporaryZip;
    addAddress.value = temporaryAddress;
    addDetailAddress.value = temporaryDetailAddress;
    toggleSubmitButton();
  };
}


// 유효성 검사 함수들


// 전화번호 유효성 검사 함수
// 전화번호가 11자리 숫자 형식인지와 인증 상태를 확인
function validatePhone(phone) {
  const formatValid = /^(010)\d{8}$/.test(phone); // 010 이후 8자리 숫자 형식
  return formatValid;
}

// 이름 유효성 검사 함수
// 이름이 한글 2자 이상인지 확인
function validateName(name) {
  const formatValid = /^[가-힣]{2,}$/.test(name); // 한글 2글자 이상만 허용
  return formatValid;
}

// 생일 유효성 검사 함수
// 생년월일이 공란이거나 8자리 숫자 형식이며, 올바른 날짜 형식인지 확인
function validateBirth(birth) {
  // 공란이거나 8자리 숫자 형식이며 처음 두 숫자가 19 또는 20,
  // 5,6번째 자리가 1~12, 7,8번째 자리가 1~31인 경우 통과
  const formatValid = birth === '' || /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/.test(birth);
  return formatValid;
}


// 핸드폰 인증 상태 변수
let isPhoneVerified = true;

(() => {
  'use strict';

  // 피드백 스타일 업데이트 함수
  // 유효성 검사 결과에 따라 해당 요소에 성공/실패 스타일을 적용하는 함수
  function updateFeedback(element, isValid) {
    if (element) {
      element.classList.toggle('text-success', isValid);
      element.classList.toggle('text-danger', !isValid);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // 전화번호 입력 필드, 전화번호 인증 버튼, 전화번호 변경 버튼
    const phoneInput = document.getElementById('telNo');
    const phoneCheckBtn = document.getElementById('phoneCheckBtn');
    const phoneChangeBtn = document.getElementById('phoneChangeBtn');

    // 전화번호 확인 입력 필드
    const phoneCheckInput = document.getElementById('floatingPhoneCheck');
    const phoneCertifiedBtn = document.getElementById('phoneCertifiedBtn');

    // 이름 입력 필드
    const nameInput = document.getElementById('name');

    // 생년월일 입력 필드
    const birthInput = document.getElementById('birthDate');

    const submitButton = document.querySelector('button[type="submit"]');

    submitButton.disabled = true;


    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        const isPhoneValid = validatePhone(phoneInput.value);
        updateFeedback(phoneInput.nextElementSibling, isPhoneValid);
        phoneInput.classList.toggle('is-valid', isPhoneValid);
        phoneInput.classList.toggle('is-invalid', !isPhoneValid);

        // 전화번호 확인이 성공한 경우 "전화번호 인증" 버튼 표시
        if (isPhoneValid && phoneCheckBtn) {
          phoneCheckBtn.style.display = 'inline-block';
        } else if (phoneCheckBtn) {
          phoneCheckBtn.style.display = 'none';
        }
      });
    }

    if (nameInput) {
      nameInput.addEventListener('input', () => {
        const isNameValid = validateName(nameInput.value);
        updateFeedback(nameInput.nextElementSibling, isNameValid);
        nameInput.classList.toggle('is-valid', isNameValid);
        nameInput.classList.toggle('is-invalid', !isNameValid);
      });
    }

    if (birthInput) {
      birthInput.addEventListener('input', () => {
        const isbirthValid = validateBirth(birthInput.value);
        updateFeedback(birthInput.nextElementSibling, isbirthValid);
        birthInput.classList.toggle('is-valid', isbirthValid);
        birthInput.classList.toggle('is-invalid', !isbirthValid);
      });
    }

    // 타이머 인터벌 변수 선언
    let timerInterval;

    // 타이머 시작 함수
    // duration: 타이머 시간(초)
    function startTimer(duration) {
      const timerDisplay = document.getElementById('timer');
      let timer = duration;

      // 이전 타이머가 있다면 제거
      if (timerInterval) {
        clearInterval(timerInterval);
      }

      // 1초마다 타이머 업데이트
      timerInterval = setInterval(function () {
        // 분과 초 계산
        const minutes = parseInt(timer / 60, 10);
        const seconds = parseInt(timer % 60, 10);

        // 시간 형식 포맷팅 (MM:SS)
        const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
        const displaySeconds = seconds < 10 ? "0" + seconds : seconds;

        // 타이머 표시
        timerDisplay.textContent = displayMinutes + ":" + displaySeconds;

        // 타이머 종료 조건
        if (--timer < 0) {
          clearInterval(timerInterval);
          timerDisplay.textContent = "시간 만료";
          // 시간 만료 시 처리
          alert("인증 시간이 만료되었습니다. 다시 시도해주세요.");
          document.getElementById('verificationSection').style.display = 'none';
          phoneInput.value = '';
          phoneInput.focus();
        }
      }, 1000);
    }

    // 전화번호 인증 코드 요청 함수
    // 사용자가 입력한 전화번호로 인증 코드를 요청하고, 인증 섹션을 보여줌
    if (phoneCheckBtn) {
      phoneCheckBtn.addEventListener('click', () => {

        // 전화번호 입력값 가져오기
        if (!phoneInput) return;
        const telNo = phoneInput.value;

        // 서버에 전화번호 인증 요청 보내기
        fetch('/member/temporaryVerification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // 요청 헤더 설정
          },
          body: new URLSearchParams({ 'telNo': telNo }) // 요청 본문에 전화번호 추가
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') { // 인증 코드 요청 성공시
              alert(`인증 코드가 전송되었습니다: ${data.verificationCode}`); // 성공 메시지와 인증 코드 출력
              // 3분(180초) 타이머 시작
              startTimer(179);
              
              if (phoneCheckBtn) phoneCheckBtn.style.display = 'none';
              document.getElementById('verificationSection').style.display = 'flex'; // 인증번호 입력 섹션을 화면에 표시
              if (phoneCheckInput) phoneCheckInput.value = data.verificationCode;
              if (phoneCheckInput) phoneCheckInput.focus();
            } else {
              alert(data.message || '인증번호 발송에 실패했습니다.');
            }
          })
          .catch(error => {
            if (timerInterval) clearInterval(timerInterval);
            console.error('Error:', error);
            alert('인증번호 발송 중 오류가 발생했습니다.');
          });
      });
    }

    // 인증 코드 확인 함수
    // 사용자가 입력한 인증 코드를 서버에 확인 요청하고, 인증 상태를 업데이트
    if (phoneCertifiedBtn) {
      phoneCertifiedBtn.addEventListener('click', () => {
        if (!phoneInput || !phoneCheckInput) return;
        const telNo = phoneInput.value;
        const verificationCode = phoneCheckInput.value;

        // 서버에 인증 코드 확인 요청 보내기
        fetch('/member/verifyCode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // 요청 헤더 설정
          },
          body: new URLSearchParams({ 'telNo': telNo, 'code': verificationCode }) // 요청 본문에 전화번호와 인증번호 추가
        })
          .then(response => {
            if (response.ok) {
              return response.text();
            } else {
              alert("전화번호나 인증번호가 일치하지 않습니다.");
            }
            throw new Error("인증 코드 확인 실패");
          }
          ) // 서버의 응답을 텍스트 형태로 처리
          .then(data => {
            if (confirm("인증이 성공했습니다. 해당 번호로 변경하시겠습니까?")) {
              // 타이머 중지
              if (timerInterval) {
                clearInterval(timerInterval);
                document.getElementById('timer').textContent = '인증완료';
              }

              phoneInput.setAttribute('readonly', 'readonly'); // 전화번호 입력 필드 비활성화
              if (phoneClearBtn) phoneClearBtn.style.display = 'none';
              document.getElementById('verificationSection').style.display = 'none'; // 인증번호 입력 섹션 숨기기
              if (phoneCheckBtn) phoneCheckBtn.style.display = 'none';
              isPhoneVerified = true; // 인증 성공 시 인증 상태를 true로 변경
              phoneChangeBtn.style.display = 'inline-block'; // 전화번호 변경 버튼을 화면에 표시
              toggleSubmitButton();
            } else {
              document.getElementById('verificationSection').style.display = 'none';
              // 타이머 중지
              if (timerInterval) {
                clearInterval(timerInterval);
              }
              clearInput('telNo');
              phoneInput.focus();
            }
          })
          .catch(error => {
            // 타이머 중지
            if (timerInterval) {
              clearInterval(timerInterval);
            }
            console.error('Error:', error); // 오류 발생 시 콘솔에 출력
          });
      });
    }

    // "전화번호 변경" 버튼 클릭 이벤트
    if (phoneChangeBtn) {
      phoneChangeBtn.addEventListener('click', () => {
        isPhoneVerified = false; // 전화번호 인증 상태 초기화
        phoneInput.removeAttribute('readonly');
        clearInput('telNo');
        phoneInput.focus();
        document.getElementById('verificationSection').style.display = 'none';
        phoneChangeBtn.style.display = 'none';
        toggleSubmitButton(); // 버튼 상태 업데이트
      });
    }

  });
})();

// 페이지 로드 시 초기화 버튼 처리와 관련된 이벤트 리스너 설정
// 각 입력 필드에 Clear 버튼을 추가하여 내용 초기화 기능을 제공
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".form-control");
  const zip = document.getElementById('zip');
  const addZip = document.getElementById('addZip');

  if (zip.value === '') {
    document.getElementById("addressFindBtn").style.display = 'block';
    document.getElementById("addressChangeBtn").style.display = 'none';
  }
  if (addZip.value === '') {
    document.getElementById("addAddressFindBtn").style.display = 'block';
    document.getElementById("addAddressChangeBtn").style.display = 'none';
  }

  inputs.forEach(input => {
    const clearButton = input.parentElement.querySelector(".clear-btn");

    if (clearButton) {
      // 입력 필드에 텍스트가 입력될 때만 clearButton 표시
      input.addEventListener("input", () => {
        clearButton.style.display = input.value ? "inline-block" : "none";
      });

      // clearButton 클릭 시 입력 필드 초기화 및 버튼 숨기기
      clearButton.addEventListener("click", () => {
        input.value = "";
        clearButton.style.display = "none";
        input.focus();
      });
    }

    // Esc 키가 눌렸을 때 입력 필드 초기화 및 버튼 숨기기
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !input.hasAttribute('readonly')) { // readonly가 아닐 때만 실행
        input.value = "";
        if (clearButton) {
          clearButton.style.display = "none";
        }
      }
    });
  });
});

// 입력값 변경 감지를 위한 초기값 저장
const initialValues = {
  name: document.getElementById('name')?.value || '',
  birthDate: document.getElementById('birthDate')?.value || '',
  telNo: document.getElementById('telNo')?.value || '',
  address: document.getElementById('address')?.value || '',
  detailAddress: document.getElementById('detailAddress')?.value || '',
  addAddress: document.getElementById('addAddress')?.value || '',
  addDetailAddress: document.getElementById('addDetailAddress')?.value || '',
  zip: document.getElementById('zip')?.value || '',
  addZip: document.getElementById('addZip')?.value || ''
};

// 리셋 버튼 요소 선택
const resetBtn = document.getElementById('resetBtn');

// 수정된 toggleSubmitButton 함수
function toggleSubmitButton() {
  const submitButton = document.getElementById('submitBtn');
  const resetButton = document.getElementById('resetBtn');
  if (!submitButton || !resetButton) return;

  const currentValues = {
    name: document.getElementById('name')?.value,
    birthDate: document.getElementById('birthDate')?.value,
    telNo: document.getElementById('telNo')?.value,
    address: document.getElementById('address')?.value,
    detailAddress: document.getElementById('detailAddress')?.value,
    addAddress: document.getElementById('addAddress')?.value,
    addDetailAddress: document.getElementById('addDetailAddress')?.value,
    zip: document.getElementById('zip')?.value,
    addZip: document.getElementById('addZip')?.value
  };

  // 값이 변경되었는지 확인
  const hasChanges = Object.keys(initialValues).some(key =>
    initialValues[key] !== currentValues[key]
  );

  // 유효성 검사
  const isNameValid = validateName(currentValues.name);
  const isBirthValid = validateBirth(currentValues.birthDate);
  const isPhoneValid = validatePhone(currentValues.telNo);

  // 전화번호가 변경된 경우 인증 여부 확인
  const phoneChanged = initialValues.telNo !== currentValues.telNo;
  const phoneVerificationValid = phoneChanged ? isPhoneVerified : true;

  // 버튼 표시/숨김 및 활성화/비활성화 처리
  submitButton.style.display = hasChanges ? 'block' : 'none';
  resetButton.style.display = hasChanges ? 'block' : 'none';
  submitButton.disabled = !(isNameValid && isBirthValid && isPhoneValid && phoneVerificationValid);
}

// 리셋 버튼 클릭 이벤트
resetBtn.addEventListener('click', function() {
  if (confirm('모든 변경사항을 초기값으로 되돌리시겠습니까?')) {
    // 모든 입력 필드를 초기값으로 복원
    Object.keys(initialValues).forEach(key => {
      const element = document.getElementById(key);
      if (element) {
        element.value = initialValues[key];
        
        // readonly 속성 복원
        if (key === 'telNo') {
          element.setAttribute('readonly', 'readonly');
          document.getElementById('phoneCheckBtn').style.display = 'none';
          document.getElementById('phoneChangeBtn').style.display = 'block';
          document.getElementById('verificationSection').style.display = 'none';
        }
        
        // 주소 관련 버튼 상태 복원
        if (key === 'zip') {
          document.getElementById('addressFindBtn').style.display = 
            initialValues.zip ? 'none' : 'block';
          document.getElementById('addressChangeBtn').style.display = 
            initialValues.zip ? 'block' : 'none';
        }
        if (key === 'addZip') {
          document.getElementById('addAddressFindBtn').style.display = 
            initialValues.addZip ? 'none' : 'block';
          document.getElementById('addAddressChangeBtn').style.display = 
            initialValues.addZip ? 'block' : 'none';
        }
      }
    });

    // 전화번호 인증 상태 복원
    isPhoneVerified = true;

    // 버튼 상태 업데이트
    toggleSubmitButton();
  }
});

// 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
  const inputs = ['name', 'birthDate', 'telNo', 'address', 'detailAddress', 'addAddress', 'addDetailAddress'];

  inputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', toggleSubmitButton);
    }
  });
});

// 페이지 이탈 시 변경사항 확인을 위한 함수 선언
function checkFormChanges(e) {
  const currentValues = {
    name: document.getElementById('name')?.value || '',
    birthDate: document.getElementById('birthDate')?.value || '',
    telNo: document.getElementById('telNo')?.value || '',
    address: document.getElementById('address')?.value || '',
    detailAddress: document.getElementById('detailAddress')?.value || '',
    addAddress: document.getElementById('addAddress')?.value || '',
    addDetailAddress: document.getElementById('addDetailAddress')?.value || '',
    zip: document.getElementById('zip')?.value || '',
    addZip: document.getElementById('addZip')?.value || ''
  };

  // 값이 변경되었는지 확인 (trim 처리 추가)
  const hasChanges = Object.keys(initialValues).some(key => {
    const initial = (initialValues[key] || '').trim();
    const current = (currentValues[key] || '').trim();
    return initial !== current;
  });

  // 변경사항이 있는 경우에만 경고 메시지 표시
  if (hasChanges) {
    const message = '저장되지 않은 변경사항이 있습니다. 정말로 페이지를 떠나시겠습니까?';
    e.returnValue = message;
    return message;
  }
}

// beforeunload 이벤트에 함수 등록 (폼 제출 중이 아닐 때만)
let isSubmitting = false;
window.addEventListener('beforeunload', (e) => {
  if (!isSubmitting) {
    return checkFormChanges(e);
  }
});

// form submit 시에는 경고 메시지가 표시되지 않도록 처리
const form = document.getElementById('changeinfoForm');
if (form) {
  form.addEventListener('submit', () => {
    isSubmitting = true;
  });
}


