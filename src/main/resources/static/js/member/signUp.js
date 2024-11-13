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

    const idHelpLength = document.getElementById('idHelpLength');
    const idHelpAlphaNumeric = document.getElementById('idHelpAlphaNumeric');
    const passwordHelpLength = document.getElementById('passwordHelpLength');
    const passwordHelpChars = document.getElementById('passwordHelpChars');

    // 초기 상태에서 유효성 검사 실행
    function initialValidation() {
      // ID, 비밀번호 유효성 검사
      const { lengthValid: idLengthValid, formatValid: idFormatValid } = validateId(idInput.value);
      updateFeedback(idHelpLength, idLengthValid);
      updateFeedback(idHelpAlphaNumeric, idFormatValid);
      idInput.classList.toggle('is-valid', idLengthValid && idFormatValid);
      idInput.classList.toggle('is-invalid', !(idLengthValid && idFormatValid));

      const { lengthValid: pwLengthValid, formatValid: pwFormatValid } = validatePassword(passwordInput.value);
      updateFeedback(passwordHelpLength, pwLengthValid);
      updateFeedback(passwordHelpChars, pwFormatValid);
      passwordInput.classList.toggle('is-valid', pwLengthValid && pwFormatValid);
      passwordInput.classList.toggle('is-invalid', !(pwLengthValid && pwFormatValid));

      // 전화번호, 이름 유효성 검사
      const isPhoneValid = validatePhone(phoneInput.value);
      updateFeedback(phoneInput.nextElementSibling, isPhoneValid);
      phoneInput.classList.toggle('is-valid', isPhoneValid);
      phoneInput.classList.toggle('is-invalid', !isPhoneValid);

      const isNameValid = validateName(nameInput.value);
      updateFeedback(nameInput.nextElementSibling, isNameValid);
      nameInput.classList.toggle('is-valid', isNameValid);
      nameInput.classList.toggle('is-invalid', !isNameValid);
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





