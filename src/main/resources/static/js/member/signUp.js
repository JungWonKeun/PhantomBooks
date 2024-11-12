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
  'use strict'

  // 유효성 검사가 필요한 모든 폼 요소 가져오기
  const forms = document.querySelectorAll('.needs-validation');

  // 각 폼에 대해 유효성 검사를 추가하고 즉시 실행
  Array.from(forms).forEach(form => {
    // 유효성 검사 이벤트 리스너 추가
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);

    // 페이지가 로드되자마자 폼 유효성 검사 실행
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
    }
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





