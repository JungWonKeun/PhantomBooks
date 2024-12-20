const memberId = document.getElementById('memberId');
const memberPw = document.getElementById('memberPw');
const telNo = document.getElementById('telNo');
const birthDate = document.getElementById('birthDate');


const signUpForm = document.querySelector("#signUpForm");


// 회원가입
signUpForm.addEventListener("submit", e => {
  if (confirm("회원가입을 진행하시겠습니까?")) {
    // 서버에 폼을 제출
    signUpForm.submit();
  } else {
    e.preventDefault();
    alert("회원가입을 취소하였습니다.");
  }
});



// 입력 필드 초기화 함수
// 특정 입력 필드의 내용을 초기화하는 함수
function clearInput(inputId) {
  document.getElementById(inputId).value = '';

};

// 사용자가 주소 찾기를 클릭했을 때 팝업을 여는 함수
function openAddressPopup() {
  alert("주소 찾기 팝업이 열립니다.");
  // 실제 주소 찾기 팝업 기능을 추가하세요
};

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
}


// 유효성 검사 함수들

// 아이디 유효성 검사 함수
// 아이디의 길이가 6자 이상 12자 이하인지, 그리고 영문자와 숫자로만 구성되어 있는지 확인
function validateId(id) {
  const lengthValid = id.length >= 6 && id.length <= 12;
  const formatValid = /^[A-Za-z0-9]+$/.test(id);
  return { lengthValid, formatValid };
}

// 비밀번호 유효성 검사 함수
// 비밀번호의 길이가 8자 이상 12자 이하인지, 영문자, 숫자, 특수문자가 모두 포함되어 있는지 확인
function validatePassword(password) {
  const lengthValid = password.length >= 8 && password.length <= 12;
  const formatValid = /[A-Za-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return { lengthValid, formatValid };
}

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

// 비밀번호 확인 유효성 검사 함수
// 비밀번호와 비밀번호 확인 필드가 일치하는지 검사
function validatePasswordConfirm(password, confirmPassword) {
  const isValid = password === confirmPassword;
  return isValid;
}

// 추가된 확인 상태 변수들
let isIdVerified = false;
let isPasswordConfirmed = false;
let isPhoneVerified = false;




// 가입 버튼 활성화 토글 함수
// 모든 입력값이 유효하고 추가된 인증 절차를 모두 완료했을 때만 가입 버튼을 활성화
function toggleSubmitButton() {
  const memberId = document.getElementById('memberId');
  const passwordInput = document.getElementById('memberPw');
  const phoneInput = document.getElementById('telNo');
  const nameInput = document.getElementById('name');
  const birthInput = document.getElementById('birthDate');
  const submitButton = document.getElementById('submitBtn');

  // 요소들이 존재하는지 확인

  if (!memberId || !passwordInput || !phoneInput || !nameInput) {
    console.log("요소들이 존재하지 않습니다.");

    return;
  }

  const { lengthValid: idLengthValid, formatValid: idFormatValid } = validateId(memberId.value);
  const { lengthValid: pwLengthValid, formatValid: pwFormatValid } = validatePassword(passwordInput.value);
  const isPhoneValid = validatePhone(phoneInput.value);
  const isNameValid = validateName(nameInput.value);
  const isBirthValid = validateBirth(birthInput.value);

  const allValid = idLengthValid && idFormatValid && pwLengthValid && pwFormatValid && isPhoneValid && isNameValid && isBirthValid;
  const allVerified = isIdVerified && isPhoneVerified;
  submitButton.disabled = !(allValid && allVerified);

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
    // id 입력 필드, 클리어 버튼, 검사 버튼, 변경 버튼
    const memberId = document.getElementById('memberId');
    const idClearBtn = document.getElementById('idClearBtn');
    const idCheckBtn = document.getElementById('idCheckBtn');
    const idChangeBtn = document.getElementById('idChangeBtn');

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

    // 이름 입력 필드
    const nameInput = document.getElementById('name');

    // 생년월일 입력 필드
    const birthInput = document.getElementById('birthDate');

    const submitButton = document.querySelector('button[type="submit"]');

    const passwordConfirmSection = document.getElementById('passwordConfirmSection');
    submitButton.disabled = true;

    // 도움말 요소들 선택
    const idHelpLength = document.getElementById('idHelpLength');
    const idHelpAlphaNumeric = document.getElementById('idHelpAlphaNumeric');
    const passwordHelpLength = document.getElementById('passwordHelpLength');
    const passwordHelpChars = document.getElementById('passwordHelpChars');
    const passwordConfirmHelp = document.getElementById('passwordConfirmHelp');

    // 각 입력 필드에 대한 실시간 유효성 검사 이벤트 리스너 등록
    if (memberId) {
      memberId.addEventListener('input', () => {
        const { lengthValid, formatValid } = validateId(memberId.value);
        updateFeedback(idHelpLength, lengthValid);
        updateFeedback(idHelpAlphaNumeric, formatValid);
        memberId.classList.toggle('is-valid', lengthValid && formatValid);
        memberId.classList.toggle('is-invalid', !(lengthValid && formatValid));

        // 아이디 유효성 검사가 성공한 경우 "ID 중복확인" 버튼 표시
        if (lengthValid && formatValid && idCheckBtn) {
          idCheckBtn.style.display = 'inline-block';
        } else if (idCheckBtn) {
          idCheckBtn.style.display = 'none';
        }
      });
    }

    // 아이디 중복 검사 함수 추가
    // 사용자가 입력한 아이디가 중복인지 서버에 확인하고, 사용을 선택할 경우 아이디 입력 필드를 비활성화

    if (idCheckBtn) {
      idCheckBtn.addEventListener('click', () => {
        const idValue = memberId.value;

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
                memberId.setAttribute('readonly', 'readonly'); // 아이디 입력 필드 비활성화
                idClearBtn.style.display = 'none';
                idCheckBtn.style.display = 'none';
                isIdVerified = true; // 인증 성공 시 인증 상태를 true로 변경
                idChangeBtn.style.display = 'inline-block'; // 아이디 변경 버튼 표시
                idChangeBtn.focus();
                toggleSubmitButton();
              } else {
                clearInput('memberId'); // 아이디 입력 필드 초기화
              }
            } else {
              alert('아이디가 중복됩니다.');
              memberId.focus();
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      });
    }

    // "ID 변경하기" 버튼 클릭 이벤트
    if (idChangeBtn) {
      idChangeBtn.addEventListener('click', () => {
        memberId.removeAttribute('readonly'); // 아이디 입력 필드 활성화
        memberId.focus();
        idClearBtn.style.display = 'inline-block';
        if (idCheckBtn) idCheckBtn.style.display = 'block'; // 검사 버튼 표시
        if (idChangeBtn) idChangeBtn.style.display = 'none'; // 변경 버튼 숨기기
        isIdVerified = false;
      })
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
        
        // 유효성 검사 상태 초기화
        passwordInput.classList.remove('is-valid', 'is-invalid');
        passwordConfirmInput.classList.remove('is-valid', 'is-invalid');
        
        // 도움말 텍스트 상태 초기화
        updateFeedback(passwordHelpLength, false);
        updateFeedback(passwordHelpChars, false);
        updateFeedback(passwordConfirmHelp, false);
        
        passwordInput.focus();
        if (passwordChangeBtn) passwordChangeBtn.style.display = 'none'; // 비밀번호 변경 버튼 숨기기
        if (passwordConfirmSection) passwordConfirmSection.style.display = 'block'; // 비밀번호 확인 입력 섹션 표시
        if (passwordConfirmBtn) passwordConfirmBtn.style.display = 'none'; // 비밀번호 사용하기 버튼 숨기기
        isPasswordConfirmed = false;
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
        fetch('/member/requestVerification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ 'telNo': telNo })
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              alert(data.message);
              startTimer(179);
              if (phoneCheckBtn) phoneCheckBtn.style.display = 'none';
              document.getElementById('verificationSection').style.display = 'flex';
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
            if (confirm("인증이 성공했습니다. 해당 번호로 가입을 진행하시겠습니까?")) {
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
            console.error('Error:', error); // 오류 발생 시 콘솔에 출력
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
      });
    }

  });
})();

// 페이지 로드 시 초기화 버튼 처리와 관련된 이벤트 리스너 설정
// 각 입력 필드에 Clear 버튼을 추가하여 내용 초기화 기능을 제공
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".form-control");

  // 각 입력 필드에 Clear 버튼을 ��가하여 내용 초기화 기능을 제공
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
