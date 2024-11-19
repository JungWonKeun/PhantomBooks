const queryBtn = document.querySelector("#queryBtn");
const myForm = document.querySelector("#myForm");

queryBtn.addEventListener("click", (e) => {
  e.preventDefault(); // 기본 폼 제출 동작 막기
  
  // 폼 데이터 수집
  const menu = document.querySelector("#subject").value;
  const title = document.querySelector("#title").value;
  const content = quill.root.innerHTML; // Quill 에디터 내용
  // 데이터 전송
  fetch("/customer/query/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      querySubject: menu,
      queryTitle: title,
      queryContent: content
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
      location.href="/support";
    } else {
      alert("문의를 다시 등록 해주세요.");
    }
  })
  .catch(err => console.error("에러:", err));
});
