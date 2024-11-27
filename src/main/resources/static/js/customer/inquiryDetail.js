const quiryUpdate = document.querySelector("#query-update");
const quiryDelete = document.querySelector("#query-delete");

// 문의 삭제 버튼 클릭 시
quiryDelete.addEventListener("click", () => {
  if (confirm("문의을 삭제하시겠습니까?")) {
    fetch("/customer/query?queryNo=" + queryNo, {method : "DELETE"})
    .then(response => {
      if(response.ok) return response.text();
      throw new Error("삭제 실패");
    })
    .then(result =>{
      if(result > 0){
        alert("문의을 삭제하였습니다.");
        location.href = "/customer/query";
      }
    })
    .catch(err => console.error("에러:", err));
  }
  
});

// 문의글 수정 버튼 클릭 시
quiryUpdate.addEventListener("click", () => { 
  location.href = "/customer/query?queryNo=" + queryNo;
});