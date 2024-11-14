// 입력 필드 초기화 함수
function clearInput(inputId) {
  document.getElementById(inputId).value = '';
}


// 주소 찾기 팝업 열기 함수 예시
function openAddressPopup() {
  alert("주소 찾기 팝업이 열립니다.");
  // 실제 주소 찾기 팝업 기능을 추가하세요
}

(() => {
  'use strict';


  // 유효성 검사 함수들
  function validateId(id) {
    const lengthValid = id.length >= 6 && id.length <= 12;
    const formatValid = /^[A-Za-z0-9]+$/.test(id);
    return { lengthValid, formatValid };
  }

  function validatePassword(password) {
    const lengthValid = password.length >= 8 && password.length <= 12;
    const formatValid = /[A-Za-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return { lengthValid, formatValid };
  }

  // 전화번호 인증 상태 확인 변수
  let isPhoneVerified = false;

  function validatePhone(phone) {
    const formatValid = /^\d{11}$/.test(phone); // 11자리 숫자 형식
    return formatValid && isPhoneVerified;
  }

  function validateName(name) {
    const formatValid = /^[가-힣]{2,}$/.test(name); // 한글 2글자 이상만 허용
    return formatValid;
  }
  function validateBirth(birth) {
    // 공란이거나 8자리 숫자 형식이며 처음 두 숫자가 19 또는 20,
    // 5,6번째 자리가 1~12, 7,8번째 자리가 1~31인 경우 통과
    const formatValid = birth === '' || /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/.test(birth);
    return formatValid;
  }


  // 피드백 스타일 업데이트 함수
  function updateFeedback(element, isValid) {
    element.classList.toggle('text-success', isValid);
    element.classList.toggle('text-danger', !isValid);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const idInput = document.getElementById('floatingInput');
    const passwordInput = document.getElementById('floatingPassword');
    const phoneInput = document.getElementById('floatingPhone');
    const nameInput = document.getElementById('floatingName');
    const birthInput = document.getElementById('floatingBirth');
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;


    const idHelpLength = document.getElementById('idHelpLength');
    const idHelpAlphaNumeric = document.getElementById('idHelpAlphaNumeric');
    const passwordHelpLength = document.getElementById('passwordHelpLength');
    const passwordHelpChars = document.getElementById('passwordHelpChars');

    function toggleSubmitButton() {
      const { lengthValid: idLengthValid, formatValid: idFormatValid } = validateId(idInput.value);
      const { lengthValid: pwLengthValid, formatValid: pwFormatValid } = validatePassword(passwordInput.value);
      const isPhoneValid = validatePhone(phoneInput.value);
      const isNameValid = validateName(nameInput.value);
      const isBirthValid = validateBirth(birthInput.value);

      const allValid = idLengthValid && idFormatValid && pwLengthValid && pwFormatValid && isPhoneValid && isNameValid && isBirthValid;
      submitButton.disabled = !allValid;
    }

    // 초기 상태에서 유효성 검사 실행
    function initialValidation() {
      // ID 유효성 검사
      const { lengthValid: idLengthValid, formatValid: idFormatValid } = validateId(idInput.value);
      updateFeedback(idHelpLength, idLengthValid);
      updateFeedback(idHelpAlphaNumeric, idFormatValid);
      idInput.classList.toggle('is-valid', idLengthValid && idFormatValid);
      idInput.classList.toggle('is-invalid', !(idLengthValid && idFormatValid));

      // 비밀번호 유효성 검사
      const { lengthValid: pwLengthValid, formatValid: pwFormatValid } = validatePassword(passwordInput.value);
      updateFeedback(passwordHelpLength, pwLengthValid);
      updateFeedback(passwordHelpChars, pwFormatValid);
      passwordInput.classList.toggle('is-valid', pwLengthValid && pwFormatValid);
      passwordInput.classList.toggle('is-invalid', !(pwLengthValid && pwFormatValid));

      // 전화번호 유효성 검사
      const isPhoneValid = validatePhone(phoneInput.value);
      updateFeedback(phoneInput.nextElementSibling, isPhoneValid);
      phoneInput.classList.toggle('is-valid', isPhoneValid);
      phoneInput.classList.toggle('is-invalid', !isPhoneValid);

      // 이름 유효성 검사
      const isNameValid = validateName(nameInput.value);
      updateFeedback(nameInput.nextElementSibling, isNameValid);
      nameInput.classList.toggle('is-valid', isNameValid);
      nameInput.classList.toggle('is-invalid', !isNameValid);

      // 생일 유효성 검사
      const isbirthValid = validateBirth(birthInput.value);
      updateFeedback(birthInput.nextElementSibling, isbirthValid);
      birthInput.classList.toggle('is-valid', isbirthValid);
      birthInput.classList.toggle('is-invalid', !isbirthValid);

      toggleSubmitButton();
      submitButton.disabled = !allValid;
    }


    // 페이지 로드 시 초기 유효성 검사 실행
    initialValidation();

    // 아이디 입력 유효성 검사
    idInput.addEventListener('input', () => {
      const { lengthValid, formatValid } = validateId(idInput.value);
      updateFeedback(idHelpLength, lengthValid);
      updateFeedback(idHelpAlphaNumeric, formatValid);
      idInput.classList.toggle('is-valid', lengthValid && formatValid);
      idInput.classList.toggle('is-invalid', !(lengthValid && formatValid));
    });

    // 비밀번호 입력 유효성 검사
    passwordInput.addEventListener('input', () => {
      const { lengthValid, formatValid } = validatePassword(passwordInput.value);
      updateFeedback(passwordHelpLength, lengthValid);
      updateFeedback(passwordHelpChars, formatValid);
      passwordInput.classList.toggle('is-valid', lengthValid && formatValid);
      passwordInput.classList.toggle('is-invalid', !(lengthValid && formatValid));
    });

    // 전화번호 입력 유효성 검사
    phoneInput.addEventListener('input', () => {
      const isPhoneValid = validatePhone(phoneInput.value);
      updateFeedback(phoneInput.nextElementSibling, isPhoneValid);
      phoneInput.classList.toggle('is-valid', isPhoneValid);
      phoneInput.classList.toggle('is-invalid', !isPhoneValid);
    });

    // 이름 입력 유효성 검사
    nameInput.addEventListener('input', () => {
      const isNameValid = validateName(nameInput.value);
      updateFeedback(nameInput.nextElementSibling, isNameValid);
      nameInput.classList.toggle('is-valid', isNameValid);
      nameInput.classList.toggle('is-invalid', !isNameValid);
    });

    // 생일 입력 유효성 검사
    birthInput.addEventListener('input', () => {
      const isbirthValid = validateBirth(birthInput.value);
      updateFeedback(birthInput.nextElementSibling, isbirthValid);
      birthInput.classList.toggle('is-valid', isbirthValid);
      birthInput.classList.toggle('is-invalid', !isbirthValid);
    });

    // 폼 유효성 검사와 제출 이벤트 핸들링
    const form = document.querySelector('.needs-validation');
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    });

    // 개발자 도구에서 전화번호 인증 설정하기 위한 디버그용 코드 (테스트용)
    window.setPhoneVerified = (value) => {
      isPhoneVerified = value;
      phoneInput.dispatchEvent(new Event('input'));
    };
  });
})();


// 전화번호 인증 코드 요청 함수
function requestVerificationCode() {
  // 전화번호 입력값 가져오기
  const telNo = document.getElementById('floatingPhone').value;

  // 서버에 전화번호 인증 요청 보내기
  fetch('/member/requestVerification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // 요청 헤더 설정
    },
    body: new URLSearchParams({ 'telNo': telNo }) // 요청 본문에 전화번호 추가
  })
    .then(response => response.text()) // 서버의 응답을 텍스트 형태로 처리
    .then(data => {
      alert(data); // 응답 메시지를 사용자에게 표시
      document.getElementById('verificationSection').style.display = 'flex'; // 인증번호 입력 섹션을 화면에 표시
      document.getElementById('floatingPhone').disabled = true; // 전화번호 입력 필드 비활성화
    })
    .catch(error => {
      console.error('Error:', error); // 오류 발생 시 콘솔에 출력
    });
}

// 인증 코드 확인 함수
function verifyCode() {
  // 전화번호와 인증번호 입력값 가져오기
  const telNo = document.getElementById('floatingPhone').value;
  const verificationCode = document.getElementById('floatingPhoneCheck').value;

  // 서버에 인증 코드 확인 요청 보내기
  fetch('/member/verifyCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // 요청 헤더 설정
    },
    body: new URLSearchParams({ 'telNo': telNo, 'code': verificationCode }) // 요청 본문에 전화번호와 인증번호 추가
  })
    .then(response => response.text()) // 서버의 응답을 텍스트 형태로 처리
    .then(data => {
      document.getElementById('verificationSection').style.display = 'none'; // 인증번호 입력 섹션을 화면에 표시
      alert(data); // 응답 메시지를 사용자에게 표시
    })
    .catch(error => {
      console.error('Error:', error); // 오류 발생 시 콘솔에 출력
    });

// 아이디 중복 검사 함수 추가
function checkId() {
  const idInput = document.getElementById('floatingInput').value;

  fetch('/member/checkId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 'memberId': idInput })
  })
    .then(response => {
      if (response.ok) { // HTTP 응답 상태 코드 200번(응답 성공)
        return response.json();
      }
      throw new Error("아이디 중복 검사 에러");
    })
    .then(data => {
      if (data.count === 0) { // 중복이 아닌 경우
        alert('아이디 사용 가능합니다.');
        document.getElementById('floatingInput').disabled = true; // 아이디 입력 필드 비활성화
        toggleSubmitButton();
      } else {
        alert('아이디가 중복됩니다.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
}




document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".form-control");

  inputs.forEach(input => {
    const clearButton = input.parentElement.querySelector(".clear-btn");

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

    // Esc 키가 눌렸을 때 입력 필드 초기화 및 버튼 숨기기
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { // Esc 키를 확인
        input.value = "";
        clearButton.style.display = "none";
      }
    });
  });
});





