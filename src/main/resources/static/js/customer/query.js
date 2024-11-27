queryBtn.addEventListener("click", (e) => {
  e.preventDefault(); // 기본 폼 제출 동작 막기

  const menu = document.querySelector("#subject").value;
  const title = document.querySelector("#title").value;
  let content = quill.root.innerHTML; // Quill 에디터 내용
  const textarea = document.getElementById("content"); // 숨겨진 textarea

  // 불필요한 태그 제거
  content = content.replace(/<\/?p>/g, "").trim();

  // Quill 내용을 textarea에 설정
  textarea.value = content;

  // 유효성 검사
  if (menu === "1") { // '유형 선택'이 선택된 경우
    alert("문의 유형을 선택해주세요.");
    return;
  }
  if (title === "") {
    alert("제목을 작성해주세요.");
    return;
  }
  if (content === "" || content === "<br>") { // Quill 에디터 빈 내용 검사
    alert("내용을 작성해주세요.");
    return;
  }

  // 데이터 전송
  fetch("/customer/query/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      querySubject: menu,
      queryTitle: title,
      queryContent: textarea.value // textarea에서 Quill 값 가져오기
    })
  })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error("서버 응답 오류");
    })
    .then(result => {
      if (result > 0) {
        alert("문의 등록이 완료되었습니다.");
        myForm.reset();
        quill.root.innerHTML = ""; // 에디터 내용 초기화
        location.href = "/customer/inquiry";
      } else {
        alert("문의를 다시 등록 해주세요.");
      }
    })
    .catch(err => console.error("에러:", err));
});
