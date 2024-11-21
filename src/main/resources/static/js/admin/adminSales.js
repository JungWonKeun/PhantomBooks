const myForm = document.querySelector("#myForm");

/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});


myForm.addEventListener("submit", () =>{
  fetch("/sumit", {
    method :  "post",
    headers : {"Content-type" : "application/json"},
    body : memberNo
  })
  .then(response => {
    if(response.ok) return response.text();
    throw new Error("error");
  })
  .then(result => {
    if(result > 0) {
      alert("문의 등록이 완료되었습니다.");
    }else{
      alert("문의를 다시 등록 해주세요.");
    }
  })
  .catch(err => console.error(err));
})