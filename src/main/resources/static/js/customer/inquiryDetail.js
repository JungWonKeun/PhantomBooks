document.addEventListener("DOMContentLoaded", () => {
  const quiryUpdate = document.querySelector(".quiry-update");
  const quiryDelete = document.querySelector(".quiry-delete");


  if (quiryUpdate) {
    quiryUpdate.addEventListener("click", () => {
      location.href = `/customer/inquiryUpdate/${queryNo}`;
    });
  }
});

function quiryDelete() {
  if (confirm("삭제하시겠습니까?")) {
    fetch(`/customer/inquiryDetail?queryNo=${queryNo}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) return response.text();
        throw new Error("삭제 실패");
      })
      .then(result => {
        if (result > 0) {
          alert("문의 삭제되었습니다.");
          location.href = "/customer/inquiry"; // 문의글 목록 페이지로 이동
        } else {
          alert("답변이 완료된 문의는 삭제 할 수 없습니다.");
        }
      })
      .catch(error => {
        console.error("삭제 요청 중 오류 발생:", error);
        alert("오류가 발생했습니다. 다시 시도해 주세요.");
      });
  }
}
