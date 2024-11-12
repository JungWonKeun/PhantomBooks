// 모달 열기/닫기 토글 함수
function toggleModal() {
  const modal = document.getElementById("modalSignin");
  if (modal.style.display === "none" || modal.style.display === "") {
      modal.style.display = "block";
  } else {
      modal.style.display = "none";
  }
}

// 모달 외부 클릭 시 닫기
window.addEventListener("click", function (event) {
  const modal = document.getElementById("modalSignin");
  if (event.target === modal) {
      modal.style.display = "none";
  }
});

