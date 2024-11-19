document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const showLoginModal = urlParams.get('showLoginModal') === 'true';
  if (showLoginModal) {
    const modalLogin = new bootstrap.Modal(document.getElementById('modalLogin'), {});
    modalLogin.show();
  }
});


document.querySelector("#modalLogin form").addEventListener("submit", function (event) {
  event.preventDefault(); // 기본 폼 제출 동작을 막음

  const memberId = document.querySelector("input[name='memberId']").value;
  const memberPw = document.querySelector("input[name='memberPw']").value;


  fetch("/member/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      memberId: memberId,
      memberPw: memberPw,
    })
  })
    .then(response => {
      if (!response.ok) {
        // 401 또는 기타 오류 상태일 때 오류 메시지 처리
        throw new Error("아이디 또는 비밀번호를 확인해주세요");
      }
      return response.json();  // JSON으로 파싱
    })
    .then(data => {
      alert("로그인 성공!");
      const modalElement = document.getElementById("modalLogin");
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (data.authority === 2) {
        window.location.href = "/admin";
        return;
      }
      modal.hide();
      // 페이지 새로고침
      window.location.reload(); // 로그인 상태에 따른 조건부 렌더링 반영
    })
    .catch(error => {
      alert(error.message);
      console.error("Error:", error);
    });

});
