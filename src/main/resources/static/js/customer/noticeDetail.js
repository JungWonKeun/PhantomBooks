document.addEventListener("DOMContentLoaded", () => {
  // 버튼 컨테이너 가져오기
  const buttonContainer = document.getElementById("goToListBtn");

  // 기존 버튼에 이벤트 리스너 추가
  buttonContainer.addEventListener("click", () => {
    // 공지사항 목록 페이지로 이동
    location.href = "/customer/notice";
  });

  // 동적으로 버튼을 추가해야 하는 경우를 위한 샘플 코드
  /*
  const newButton = document.createElement("button");
  newButton.textContent = "동적 추가 버튼";
  newButton.addEventListener("click", () => {
    console.log("동적 버튼 클릭!");
  });
  document.body.appendChild(newButton); // 필요시 적절한 컨테이너에 추가
  */
});
