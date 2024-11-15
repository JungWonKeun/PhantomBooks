// 입력 필드 초기화 함수
// 특정 입력 필드의 내용을 초기화하는 함수
function clearInput(inputId) {
  document.getElementById(inputId).value = '';
}

// 주소 찾기 팝업 열기 함수 예시
// 사용자가 주소 찾기를 클릭했을 때 팝업을 여는 함수 (현재는 알림창만 표시, 실제 기능 필요)
function openAddressPopup() {
  alert("주소 찾기 팝업이 열립니다.");
  // 실제 주소 찾기 팝업 기능을 추가하세요
}

// 유효성 검사 함수들

// 아이디 유효성 검사 함수
// 아이디의 길이가 6자 이상 12자 이하인지, 그리고 영문자와 숫자로만 구성되어 있는지 확인
function validateId(id) {
  const lengthValid = id.length >= 6 && id.length <= 12;
  const formatValid = /^[A-Za-z0-9]+$/.test(id);
  console.log('validateId - lengthValid:', lengthValid, 'formatValid:', formatValid);
  return { lengthValid, formatValid };
}

// 비밀번호 유효성 검사 함수
// 비밀번호의 길이가 8자 이상 12자 이하인지, 영문자, 숫자, 특수문자가 모두 포함되어 있는지 확인
function validatePassword(password) {
  const lengthValid = password.length >= 8 && password.length <= 12;
  const formatValid = /[A-Za-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  console.log('validatePassword - lengthValid:', lengthValid, 'formatValid:', formatValid);
  return { lengthValid, formatValid };
}

// 전화번호 유효성 검사 함수
// 전화번호가 11자리 숫자 형식인지와 인증 상태를 확인
function validatePhone(phone) {
  const formatValid = /^(010)\d{8}$/.test(phone); // 010 이후 8자리 숫자 형식
  console.log('validatePhone - formatValid:', formatValid);
  return formatValid;
}

// 이름 유효성 검사 함수
// 이름이 한글 2자 이상인지 확인
function validateName(name) {
  const formatValid = /^[가-힣]{2,}$/.test(name); // 한글 2글자 이상만 허용
  console.log('validateName - formatValid:', formatValid);
  return formatValid;
}

// 생일 유효성 검사 함수
// 생년월일이 공란이거나 8자리 숫자 형식이며, 올바른 날짜 형식인지 확인
function validateBirth(birth) {
  // 공란이거나 8자리 숫자 형식이며 처음 두 숫자가 19 또는 20,
  // 5,6번째 자리가 1~12, 7,8번째 자리가 1~31인 경우 통과
  const formatValid = birth === '' || /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/.test(birth);
  console.log('validateBirth - formatValid:', formatValid);
  return formatValid;
}

// 비밀번호 확인 유효성 검사 함수
// 비밀번호와 비밀번호 확인 필드가 일치하는지 검사
function validatePasswordConfirm(password, confirmPassword) {
  const isValid = password === confirmPassword;
  console.log('validatePasswordConfirm - isValid:', isValid);
  return isValid;
}

// 추가된 확인 상태 변수들
let isIdVerified = false;
let isPhoneVerified = false;
let isPasswordConfirmed = false;

// 가입 버튼 활성화 토글 함수
// 모든 입력값이 유효하고 추가된 인증 절차를 모두 완료했을 때만 가입 버튼을 활성화
function toggleSubmitButton() {
  const idInput = document.getElementById('floatingInput');
  const passwordInput = document.getElementById('floatingPassword');
  const passwordConfirmInput = document.getElementById('floatingPasswordConfirm');
  const phoneInput = document.getElementById('floatingPhone');
  const nameInput = document.getElementById('floatingName');
  const birthInput = document.getElementById('floatingBirth');
  const submitButton = document.getElementById('submitBtn');

  // 요소들이 존재하는지 확인
  if (!idInput || !passwordInput || !passwordConfirmInput || !phoneInput || !nameInput || !birthInput || !submitButton) {
    console.log('toggleSubmitButton - Missing elements');
    return;
  }

  const { lengthValid: idLengthValid, formatValid: idFormatValid } = validateId(idInput.value);
  const { lengthValid: pwLengthValid, formatValid: pwFormatValid } = validatePassword(passwordInput.value);
  const isPasswordConfirmValid = validatePasswordConfirm(passwordInput.value, passwordConfirmInput.value);
  const isPhoneValid = validatePhone(phoneInput.value);
  const isNameValid = validateName(nameInput.value);
  const isBirthValid = validateBirth(birthInput.value);

  const allValid = idLengthValid && idFormatValid && pwLengthValid && pwFormatValid && isPasswordConfirmValid && isPhoneValid && isNameValid && isBirthValid;
  const allVerified = isIdVerified && isPhoneVerified && isPasswordConfirmed;
  console.log('toggleSubmitButton - allValid:', allValid);
  submitButton.disabled = !(allValid && allVerified);
  console.log('toggleSubmitButton - submitButton.disabled:', submitButton.disabled);

}

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
    // 입력 요소들 선택
    const idInput = document.getElementById('floatingInput');
    const passwordInput = document.getElementById('floatingPassword');
    const passwordConfirmInput = document.getElementById('floatingPasswordConfirm');
    const phoneInput = document.getElementById('floatingPhone');
    const nameInput = document.getElementById('floatingName');
    const birthInput = document.getElementById('floatingBirth');
    const submitButton = document.querySelector('button[type="submit"]');
    const idCheckBtn = document.getElementById('idCheckBtn');
    const passwordConfirmBtn = document.getElementById('passwordConfirmBtn');
    const phoneCheckBtn = document.getElementById('phoneCheckBtn');
    const passwordConfirmSection = document.getElementById('passwordConfirmSection');
    submitButton.disabled = true;

    // 버튼 클릭 시 input 내용 변경이 불가능한 내용의 clear 버튼 선택
    const passwordClearBtn = passwordInput?.parentElement?.querySelector('.clear-btn');

    // 도움말 요소들 선택
    const idHelpLength = document.getElementById('idHelpLength');
    const idHelpAlphaNumeric = document.getElementById('idHelpAlphaNumeric');
    const passwordHelpLength = document.getElementById('passwordHelpLength');
    const passwordHelpChars = document.getElementById('passwordHelpChars');
    const passwordConfirmHelp = document.getElementById('passwordConfirmHelp');

    // 각 입력 필드에 대한 실시간 유효성 검사 이벤트 리스너 등록
    if (idInput) {
      idInput.addEventListener('input', () => {
        const { lengthValid, formatValid } = validateId(idInput.value);
        updateFeedback(idHelpLength, lengthValid);
        updateFeedback(idHelpAlphaNumeric, formatValid);
        idInput.classList.toggle('is-valid', lengthValid && formatValid);
        idInput.classList.toggle('is-invalid', !(lengthValid && formatValid));

        // 아이디 유효성 검사가 성공한 경우 "ID 중복확인" 버튼 표시
        if (lengthValid && formatValid && idCheckBtn) {
          idCheckBtn.style.display = 'inline-block';
        } else if (idCheckBtn) {
          idCheckBtn.style.display = 'none';
        }
        toggleSubmitButton();
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener('input', () => {
        const { lengthValid, formatValid } = validatePassword(passwordInput.value);
        updateFeedback(passwordHelpLength, lengthValid);
        updateFeedback(passwordHelpChars, formatValid);
        passwordInput.classList.toggle('is-valid', lengthValid && formatValid);
        passwordInput.classList.toggle('is-invalid', !(lengthValid && formatValid));
        // 비밀번호 변경 시 비밀번호 확인 상태를 다시 체크
        passwordConfirmInput?.dispatchEvent(new Event('input'));
        toggleSubmitButton();
      });
    }

    if (passwordConfirmInput) {
      passwordConfirmInput.addEventListener('input', () => {
        const { lengthValid: pwLengthValid, formatValid: pwFormatValid } = validatePassword(passwordInput.value);
        const isPasswordConfirmValid = validatePasswordConfirm(passwordInput.value, passwordConfirmInput.value);
        updateFeedback(passwordConfirmHelp, isPasswordConfirmValid);
        passwordConfirmInput.classList.toggle('is-valid', isPasswordConfirmValid);
        passwordConfirmInput.classList.toggle('is-invalid', !isPasswordConfirmValid);

        // 비밀번호 확인이 성공한 경우 "비밀번호 사용하기" 버튼 표시
        if (isPasswordConfirmValid && pwLengthValid && pwFormatValid && passwordConfirmBtn) {
          passwordConfirmBtn.style.display = 'inline-block';
        } else if (passwordConfirmBtn) {
          passwordConfirmBtn.style.display = 'none';
          isPasswordConfirmed = false;
        }
        toggleSubmitButton();
      });
    }

    // "비밀번호 사용하기" 버튼 클릭 이벤트
    if (passwordConfirmBtn) {
      passwordConfirmBtn.addEventListener('click', () => {
        if (passwordInput) passwordInput.disabled = true; // 비밀번호 입력 필드 비활성화
        if (passwordConfirmSection) passwordConfirmSection.remove(); // 비밀번호 확인 입력 섹션 제거
        if (passwordClearBtn) passwordClearBtn.style.display = 'none';
        isPasswordConfirmed = true;
        toggleSubmitButton();
      });
    }

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
        toggleSubmitButton();
      });
    }

    if (nameInput) {
      nameInput.addEventListener('input', () => {
        const isNameValid = validateName(nameInput.value);
        updateFeedback(nameInput.nextElementSibling, isNameValid);
        nameInput.classList.toggle('is-valid', isNameValid);
        nameInput.classList.toggle('is-invalid', !isNameValid);
        toggleSubmitButton();
      });
    }

    if (birthInput) {
      birthInput.addEventListener('input', () => {
        const isbirthValid = validateBirth(birthInput.value);
        updateFeedback(birthInput.nextElementSibling, isbirthValid);
        birthInput.classList.toggle('is-valid', isbirthValid);
        birthInput.classList.toggle('is-invalid', !isbirthValid);
        toggleSubmitButton();
      });
    }
  });
})();

// 아이디 중복 검사 함수 추가
// 사용자가 입력한 아이디가 중복인지 서버에 확인하고, 사용을 선택할 경우 아이디 입력 필드를 비활성화
function idCheck() {
  const idInput = document.getElementById('floatingInput');
  if (!idInput) return;
  const idValue = idInput.value;

  fetch('/member/idCheck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 'memberId': idValue })
  })
    .then(response => {
      if (response.ok) { // HTTP 응답 상태 코드 200번(응답 성공)
        return response.json();
      }
      throw new Error("아이디 중복 검사 에러");
    })
    .then(data => {
      if (data !== 1) { // 중복이 아닌 경우
        if (confirm('아이디 사용 가능합니다. 해당 아이디로 가입을 진행하시겠습니까?')) {
          idInput.disabled = true; // 아이디 입력 필드 비활성화
          const idClearBtn = document.getElementById('idClearBtn');
          if (idClearBtn) idClearBtn.style.display = 'none';
          if (idCheckBtn) idCheckBtn.style.display = 'none';
          isIdVerified = true; // 인증 성공 시 인증 상태를 true로 변경
          toggleSubmitButton();
        } else {
          clearInput('floatingInput'); // 아이디 입력 필드 초기화
        }
      } else {
        alert('아이디가 중복됩니다.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// 전화번호 인증 코드 요청 함수
// 사용자가 입력한 전화번호로 인증 코드를 요청하고, 인증 섹션을 보여줌
function requestVerificationCode() {
  // 전화번호 입력값 가져오기
  const phoneInput = document.getElementById('floatingPhone');
  if (!phoneInput) return;
  const telNo = phoneInput.value;
  const phoneClearBtn = document.getElementById('phoneClearBtn');

  // 서버에 전화번호 인증 요청 보내기
  fetch('/member/requestVerification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // 요청 헤더 설정
    },
    body: new URLSearchParams({ 'telNo': telNo }) // 요청 본문에 전화번호 추가
  })
    .then(response => response.json()) // 서버의 응답을 텍스트 형태로 처리
    .then(data => {
      if (data.status === 'success') { // 인증 코드 요청 성공시
        alert(`인증 코드가 전송되었습니다: ${data.verificationCode}`); // 성공 메시지와 인증 코드 출력
        /* if (data === 'success') { // 인증 코드 요청 성공시 
        alert(data); // 응답 메시지를 사용자에게 표시 */
        const phoneCheckInput = document.getElementById('floatingPhoneCheck');
        if (phoneCheckInput) phoneCheckInput.value = data.verificationCode;
        document.getElementById('verificationSection').style.display = 'flex'; // 인증번호 입력 섹션을 화면에 표시
        if (phoneCheckInput) phoneCheckInput.focus();
      }
    })
    .catch(error => {
      console.error('Error:', error); // 오류 발생 시 콘솔에 출력
    });
}

// 인증 코드 확인 함수
// 사용자가 입력한 인증 코드를 서버에 확인 요청하고, 인증 상태를 업데이트
function verifyCode() {
  // 전화번호와 인증번호 입력값 가져오기
  const phoneInput = document.getElementById('floatingPhone');
  const phoneCheckInput = document.getElementById('floatingPhoneCheck');
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
      if (confirm("인증이 성공했습니다. 해당 번호로 가입을 진행하시겠습니까?")) {
        phoneInput.disabled = true; // 전화번호 입력 필드 비활성화
        if (phoneClearBtn) phoneClearBtn.style.display = 'none';
        document.getElementById('verificationSection').style.display = 'none'; // 인증번호 입력 섹션을 화면에 표시
        if (phoneCheckBtn) phoneCheckBtn.style.display = 'none';
        isPhoneVerified = true; // 인증 성공 시 인증 상태를 true로 변경
        toggleSubmitButton();
      } else {
        document.getElementById('verificationSection').style.display = 'none';
        clearInput('floatingPhone');
        phoneInput.focus();
      }
    })
    .catch(error => {
      console.error('Error:', error); // 오류 발생 시 콘솔에 출력
    });
}


// 페이지 로드 시 초기화 버튼 처리와 관련된 이벤트 리스너 설정
// 각 입력 필드에 Clear 버튼을 추가하여 내용 초기화 기능을 제공
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".form-control");

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
      if (event.key === "Escape") { // Esc 키를 확인
        input.value = "";
        if (clearButton) {
          clearButton.style.display = "none";
        }
      }
    });
  });
});
