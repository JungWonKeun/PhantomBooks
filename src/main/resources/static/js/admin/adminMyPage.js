/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});



/**** 정보수정 유효성 검사 ****/

/* 필수 입력 항목의 유효성 검사 여부 체크하기 위한 객체(체크리스트) */
const checkObj = {
  "memberPw"       : false,
  "pwCheck": false,
  "adminEmail"    : false
};

/* 유효성 검사 - 비밀번호 */

// 1) 비밀번호 유효성 검사에 사용되는 요소 얻어오기
const memberPw = document.querySelector("#memberPw");
const pwCheck = document.querySelector("#pwCheck");
const pwMessage = document.querySelector("#pwMessage");

// 2) 비밀번호 메시지 미리 작성
const pwMessageObj = {}; // 빈 객체
pwMessageObj.normal = "영어,숫자,특수문자 1글자 이상, 6~20자 사이.";
pwMessageObj.invalid = "유효하지 않은 비밀번호 형식입니다.";
pwMessageObj.valid = "유효한 비밀번호 형식입니다.";
pwMessageObj.error = "비밀번호가 일치하지 않습니다.";
pwMessageObj.check = "비밀번호가 일치 합니다.";


// 3) 비밀번호 입력될 때 마다 유효성 검사 시행
memberPw.addEventListener("input", ()=>{
  const inputPw = memberPw.value.trim();

  // 4) 입력된 비밀번호 없을 경우
  if(inputPw.length == 0){

    // 비밀번호 메시지를 normal 상태 메시지로 변경
    pwMessage.innerText = pwMessageObj.normal;

    // checkObj에서 pw false로 변경
    checkObj.memberPw = false;

    memberPw.value = ""; // 잘못 입력된 값

    return;
  }

  // 5) 비밀번호 형식이 맞는지 검사(정규표현식을 이용한 검사)

  // 비밀번호 형식 정규 표현식 객체
  const lengthCheck = inputPw.length >= 6 && inputPw.length <= 20;
  const letterCheck = /[a-zA-Z]/.test(inputPw); // 영어 알파벳 포함
  const numberCheck = /\d/.test(inputPw); // 숫자 포함
  const specialCharCheck = /[!@#_-]/.test(inputPw); // 특수문자 포함

  // 조건이 하나라도 만족하지 못하면
  if ( !(lengthCheck && letterCheck && numberCheck && specialCharCheck) ) {
    pwMessage.innerText = pwMessageObj.invalid; // 유효하지 않은 때 메시지
    pwMessage.classList.add("error"); // 빨간 글씨 추가
    pwMessage.classList.remove("confirm"); // 초록 글씨 삭제
    checkObj.memberPw = false; // 유효하지 않다고 체크
    return;
  }

  // 형식에 맞는 경우
  pwMessage.innerText = pwMessageObj.valid;
  pwMessage.classList.add("confirm"); 
  pwMessage.classList.remove("error");
  checkObj.memberPw = true;


  // 비밀번호 확인이 작성된 상태에서
  // 비밀번호가 입력된 경우
  if(pwCheck.value.trim().length > 0){
    checkpw(); // 같은지 비교하는 함수
  }
});

/* ----- 비밀번호, 비밀번호 확인 같은지 검사하는 함수 ----- */
function checkpw(){

  // 같은 경우
  if(memberPw.value === pwCheck.value){
    pwMessage.innerText = pwMessageObj.check;
    checkObj.pwCheck = true;
    return;
  }

  // 다른 경우
  pwMessage.innerText = pwMessageObj.error;
  checkObj.pwCheck = false;
}


/* ----- 비밀번호 확인이 입력 되었을 때  ----- */
pwCheck.addEventListener("input", ()=>{

  // 비밀번호 input에 작성된 값이 유효한 형식일때만 비교
  if( checkObj.memberPw === true ){
    checkpw();
    return;
  }


  // 비밀번호 input에 작성된 값이 유효하지 않은 경우
  checkObj.memberPw = false;
});

/* ----- 이메일 유효성 검사 ----- */

// 1) 이메일 유효성 검사에 필요한 요소 얻어오기
const emailMessage = document.querySelector("#emailMessage");

// 2) 이메일 메시지를 미리 작성
const emailMessageObj = {}; // 빈 객체
emailMessageObj.normal = "업무에 사용할 이메일을 입력해주세요";
emailMessageObj.invalid = "알맞은 이메일 형식으로 작성해 주세요";
emailMessageObj.check = "사용가능한 이메일입니다.";


// 3) 이메일이 입력된때 마다 유효성 검사 시행
adminEmail.addEventListener("input", e=>{
  
  //입력된 값 얻어오기
  const inputEmail = adminEmail.value.trim();

  // 4) 입력된 이메일이 없을 경우
  if(inputEmail.length == 0){

    // 이메일 메시지를 normal 상태 메시지로 변경
    emailMessage.innerText = emailMessageObj.normal;

    // checkObj에서 Email을 false로 변경
    checkObj.adminEmail = false;

    adminEmail.value = ""; // 잘못 입력된 값

    return;
  }

  // 5) 이메일 형식이 맞는지 검사(정규표현식을 이용한 검사)

  // 이메일 형식 정규 표현식 객체
  const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 입력 값이 이메일 형식이 아닌 경우
  if( regEx.test(inputEmail) === false ) {
    emailMessage.innerText = emailMessageObj.invalid; // 유효하지 않은 때 메시지
    checkObj.adminEmail = false; // 유효하지 않다고 체크
    return;
  }
  emailMessage.innerText = emailMessageObj.check;
  checkObj.adminEmail = true;




// ---------------------------------------------
const updateBtn = document.querySelector("#updateBtn");
const updateAdmin = document.querySelector("#info-box");


updateAdmin.addEventListener("submit", e => {

  // e.preventDefault(); // 기본 이벤트(form 제출) 막기

  // for(let key in 객체)
  // -> 반복마다 객체의 키 값을 하나씩 꺼내서 key 변수에 저장

  // 유효성 검사 체크리스트
  // fals인 경우가 있는지 검사
  for(let key in checkObj){ 

    if( checkObj[key] === false ){ // 유효하지 않은 경우
      let str; // 출력할 메시지 저장

      switch(key){
        case "adminEmail"     : str = "이메일이 유효하지 않습니다."; break;
        case "memberPw"       : str = "비밀번호가 유효하지 않습니다."; break;
      }

      alert(str); // 경고 출력

      // 유효하지 않은 요소로 focus 이동
      document.getElementById(key).focus();

      e.preventDefault(); // 제출 막기

      return;
    }
  }
})