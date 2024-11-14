document.addEventListener("DOMContentLoaded", function() {
  const toggles = document.querySelectorAll(".faq-toggle"); // .faq-toggle 클래스 선택

  toggles.forEach(toggle => {
    toggle.addEventListener("click", function() {
      const answer = this.nextElementSibling; // 클릭된 요소 다음에 위치한 답변 선택
      const icon = this.querySelector(".arrow-icon"); // 화살표 아이콘 선택

      // 현재 열린 답변이 있다면 닫기
      const openAnswer = document.querySelector(".supporting-text.open");
      if (openAnswer && openAnswer !== answer) {
        openAnswer.style.maxHeight = "0"; // 높이를 0으로 설정하여 닫기
        openAnswer.style.padding = "0"; // 패딩 제거
        openAnswer.classList.remove("open"); // 열린 클래스 제거
        const openIcon = openAnswer.previousElementSibling.querySelector(".arrow-icon");
        openIcon.classList.remove("open");
        openIcon.textContent = "▶"; // 화살표를 오른쪽으로 변경
      }

      // 클릭한 답변을 토글
      if (answer.classList.contains("open")) {
        answer.style.maxHeight = "0"; // 높이를 0으로 설정하여 닫기
        answer.style.padding = "0"; // 패딩 제거
        answer.classList.remove("open"); // 열린 클래스 제거
        icon.classList.remove("open");
        icon.textContent = "▶"; // 화살표를 오른쪽으로 변경
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px"; // 실제 높이로 설정하여 열기
        answer.style.padding = "10px 15px"; // 패딩 추가
        answer.classList.add("open"); // 열린 클래스 추가
        icon.classList.add("open");
        icon.textContent = "▼"; // 화살표를 아래로 변경

        // 질문이 클릭되면 화면 상단에 질문이 완전히 보이도록 스크롤
        toggle.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
