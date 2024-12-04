const memberPw = document.getElementById('memberPw');
const telNo = document.getElementById('telNo');

// 전화번호로 본인 확인
const checkTelNoForm = document.querySelector("#checkTelNoForm");

checkTelNoForm.addEventListener("submit", e => {
  e.preventDefault(); // 기본 제출 동작 중지

  if (phoneSubmitBtnSuccess.disabled) {
    alert('모든 필드를 올바르게 입력하고 인증 절차를 완료해야 합니다.');
    return;
  }

  // FormData 객체 생성
  const formData = new FormData(checkTelNoForm);

  // fetch를 사용하여 서버에 비동기 요청
  fetch('/myPage/checkTelNo', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        // 성공 시 비밀번호 변경 섹션 표시
        document.getElementById('phoneCheckSection').style.display = 'none';
        document.getElementById('changePwSection').style.display = 'block';
      } else {
        // 실패 시 전화번호 재입력 요구
        alert('저장된 전화번호와 일치하지 않습니다. 다시 확인해주세요.');
        telNo.value = '';
        telNo.removeAttribute('readonly');
        telNo.focus();
        document.getElementById('phoneChangeBtn').style.display = 'none';
        isPhoneVerified = false;
        toggleSubmitButton();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    });
});

// 비밀번호 변경
const changePwForm = document.querySelector("#changePwForm");

changePwForm.addEventListener("submit", e => {
  e.preventDefault(); // 기본 제출 동작 중지

  if (passwordSubmitBtnSuccess.disabled) {
    alert('모든 필드를 올바르게 입력하고 인증 절차를 완료해야 합니다.');
    return;
  }

  // FormData 객체 생성
  const formData = new FormData(changePwForm);

  // fetch를 사용하여 서버에 비동기 요청
  fetch('/myPage/changePw', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        alert('비밀번호 변경이 완료되었습니다.\n다시 로그인해주세요.');
        window.location.href = '/member/logout';
      }
      if (data.status === 'fail') {
        alert(data.message);
        if (data.type === '1') {
          document.getElementById('currentPw').value = '';
          document.getElementById('currentPw').focus();
        }
        if (data.type === '2') {
          memberPw.value = '';
          memberPw.removeAttribute('readonly');
          memberPw.focus();
          document.getElementById('passwordConfirmSection').style.display = 'block';
          document.getElementById('passwordChangeBtn').style.display = 'none';
          isPasswordConfirmed = false;
        }
        document.getElementById('floatingPasswordConfirm').value = '';
        document.getElementById('passwordConfirmBtn').style.display = 'none'; // 비밀번호 사용하기 버튼 숨기기
        toggleSubmitButton();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    });
});


// 입력 필드 초기화 함수
// 특정 입력 필드의 내용을 초기화하는 함수
function clearInput(inputId) {
  document.getElementById(inputId).value = '';

}

// 비밀번호 유효성 검사 함수
// 비밀번호의 길이가 8자 이상 12자 이하인지, 영문자, 숫자, 특수문자가 모두 포함되어 있는지 확인
function validatePassword(password) {
  const lengthValid = password.length >= 8 && password.length <= 12;
  const formatValid = /[A-Za-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return { lengthValid, formatValid };
}

// 비밀번호 확인 유효성 검사 함수
// 비밀번호와 비밀번호 확인 필드가 일치하는지 검사
function validatePasswordConfirm(password, confirmPassword) {
  const isValid = password === confirmPassword;
  return isValid;
}


// 전화번호 유효성 검사 함수
// 전화번호가 11자리 숫자 형식인지와 인증 상태를 확인
function validatePhone(phone) {
  const formatValid = /^(010)\d{8}$/.test(phone); // 010 이후 8자리 숫자 형식
  return formatValid;
}

let isPasswordConfirmed = false;
let isPhoneVerified = false;

// 제출 버튼 활성화 토글 함수
// 모든 입력값이 유효하고 추가된 인증 절차를 모두 완료했을 때만 버튼을 활성화
function toggleSubmitButton() {
  const phoneSection = document.getElementById('phoneCheckSection');
  const passwordSection = document.getElementById('changePwSection');

  if (phoneSection) {
    const phoneInput = document.getElementById('telNo');
    const phoneSubmitButtonDanger = document.getElementById('phoneSubmitBtnDanger');
    const phoneSubmitButtonSuccess = document.getElementById('phoneSubmitBtnSuccess');

    console.log('Phone verified:', isPhoneVerified);
    console.log('Phone valid:', validatePhone(phoneInput.value));

    const isPhoneValid = validatePhone(phoneInput.value);
    if (isPhoneValid && isPhoneVerified) {
      phoneSubmitButtonDanger.style.display = 'none';
      phoneSubmitButtonSuccess.style.display = 'inline-block';
    } else {
      phoneSubmitButtonDanger.style.display = 'inline-block';
      phoneSubmitButtonSuccess.style.display = 'none';
    }
  }

  if (passwordSection) {
    const passwordInput = document.getElementById('memberPw');
    const passwordSubmitButtonDanger = document.getElementById('passwordSubmitBtnDanger');
    const passwordSubmitButtonSuccess = document.getElementById('passwordSubmitBtnSuccess');

    const { lengthValid: pwLengthValid, formatValid: pwFormatValid } = validatePassword(passwordInput.value);
    const allValid = pwLengthValid && pwFormatValid && isPasswordConfirmed;

    if (allValid) {
      passwordSubmitButtonDanger.style.display = 'none';
      passwordSubmitButtonSuccess.style.display = 'inline-block';
    } else {
      passwordSubmitButtonDanger.style.display = 'inline-block';
      passwordSubmitButtonSuccess.style.display = 'none';
    }
  }
}
(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    // 비밀번호 입력 필드, 클리어 버튼, 검사 버튼, 변경 버튼
    const passwordInput = document.getElementById('memberPw');
    const passwordClearBtn = document.getElementById('passwordClearBtn');
    const passwordChangeBtn = document.getElementById('passwordChangeBtn');

    // 비밀번호 확인 입력 필드, 비밀번호 확인 버튼
    const passwordConfirmInput = document.getElementById('floatingPasswordConfirm');
    const passwordConfirmBtn = document.getElementById('passwordConfirmBtn');

    // 전화번호 입력 필드, 전화번호 인증 버튼, 전화번호 변경 버튼
    const phoneInput = document.getElementById('telNo');
    const phoneCheckBtn = document.getElementById('phoneCheckBtn');
    const phoneChangeBtn = document.getElementById('phoneChangeBtn');

    // 전화번호 확인 입력 필드
    const phoneCheckInput = document.getElementById('floatingPhoneCheck');
    const phoneCertifiedBtn = document.getElementById('phoneCertifiedBtn');
    // 피드백 스타일 업데이트 함수
    // 유효성 검사 결과에 따라 해당 요소에 성공/실패 스타일을 적용하는 함수
    function updateFeedback(element, isValid) {
      if (element) {
        element.classList.toggle('text-success', isValid);
        element.classList.toggle('text-danger', !isValid);
      }
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
      });
    }

    // "비밀번호 사용하기" 버튼 클릭 이벤트
    if (passwordConfirmBtn) {
      passwordConfirmBtn.addEventListener('click', () => {
        if (confirm('해당 비밀번호를 사용하시겠습니까?')) {
          passwordInput.setAttribute('readonly', 'readonly'); // 비밀번호 입력 필드 비활성화
          passwordConfirmSection.style.display = 'none'; // 비밀번호 확인 입력 섹션 숨기기
          passwordClearBtn.style.display = 'none';
          isPasswordConfirmed = true;
          passwordChangeBtn.style.display = 'inline-block';
          toggleSubmitButton();
        }
        passwordInput.focus();
      });
    }

    // "비밀번호 변경" 버튼 클릭 이벤트
    if (passwordChangeBtn) {
      passwordChangeBtn.addEventListener('click', () => {
        passwordInput.removeAttribute('readonly'); // 비밀번호 입력 필드 활성화
        passwordInput.value = '';
        passwordConfirmInput.value = '';
        passwordInput.focus();
        if (passwordChangeBtn) passwordChangeBtn.style.display = 'none'; // 비밀번호 변경 버튼 숨기기
        if (passwordConfirmSection) passwordConfirmSection.style.display = 'block'; // 비밀번호 확인 입력 섹션 표시
        if (passwordConfirmBtn) passwordConfirmBtn.style.display = 'none'; // 비밀번호 사용하기 버튼 숨기기
        isPasswordConfirmed = false;
        toggleSubmitButton()
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
        fetch('/member/requestVerification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // 요청 헤더 설정
          },
          body: new URLSearchParams({ 'telNo': telNo }) // 요청 본문에 전화번호 추가
        })
          .then(response => response.json()) // 서버의 응답을 텍스트 형태로 처리
          .then(data => {
             /* if (data === 'success') { // 인증 코드 요청 성공시 
            alert(data); // 응답 메시지를 사용자에게 표시 */
            if (data.status === 'success') { // 인증 코드 요청 성공시
              // 3분(180초) 타이머 시작
              startTimer(179);
              alert(`인증 코드가 전송되었습니다: ${data.verificationCode}`); // 성공 메시지와 인증 코드 출력

              if (phoneCheckInput) phoneCheckInput.value = data.verificationCode;
              if (phoneCheckBtn) phoneCheckBtn.style.display = 'none';
              document.getElementById('verificationSection').style.display = 'flex'; // 인증번호 입력 섹션을 화면에 표시
              if (phoneCheckInput) phoneCheckInput.focus();

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

    // 인증 코드 확인 함수
    // 사용자가 입력한 인 코드를 서버에 확인 요청하고, 인증 상태를 업데이트
    if (phoneCertifiedBtn) {
      phoneCertifiedBtn.addEventListener('click', () => {
        if (!phoneInput || !phoneCheckInput) return;
        const telNo = phoneInput.value;
        const verificationCode = phoneCheckInput.value;

        fetch('/member/verifyCode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ 'telNo': telNo, 'code': verificationCode })
        })
          .then(response => {
            if (response.ok) {
              return response.text();
            } else {
              alert("전화번호나 인증번호가 일치하지 않습니다.");
              throw new Error("인증 코드 확인 실패");
            }
          })
          .then(data => {
            // 타이머 중지
            if (timerInterval) {
              clearInterval(timerInterval);
              document.getElementById('timer').textContent = '인증완료';
            }

            phoneInput.setAttribute('readonly', 'readonly');
            if (phoneClearBtn) phoneClearBtn.style.display = 'none';
            document.getElementById('verificationSection').style.display = 'none';
            if (phoneCheckBtn) phoneCheckBtn.style.display = 'none';
            isPhoneVerified = true;
            toggleSubmitButton();
          })
          .catch(error => {
            console.error('Error:', error);
            isPhoneVerified = false;
            toggleSubmitButton();
          });
      });
    }

    // "전화번호 변경" 버튼 클릭 이벤트
    if (phoneChangeBtn) {
      phoneChangeBtn.addEventListener('click', () => {
        isPhoneVerified = false;
        phoneInput.removeAttribute('readonly');
        clearInput('telNo');
        phoneInput.focus();
        document.getElementById('verificationSection').style.display = 'none';
        phoneChangeBtn.style.display = 'none';
        toggleSubmitButton();
      });
    }
  });
})();


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
      if (event.key === "Escape" && !input.hasAttribute('readonly')) { // readonly가 아닐 때만 실행
        input.value = "";
        if (clearButton) {
          clearButton.style.display = "none";
        }
      }
    });
  });
});
