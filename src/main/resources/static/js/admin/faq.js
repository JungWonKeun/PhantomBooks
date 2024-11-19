/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});

// 내용 작성 영역
const faqContent = document.querySelector(".faqContent");

/* 글쓰기 버튼 클릭 시 */

const insertBtn = document.querySelector("#insertBtn");

insertBtn?.addEventListener("click", () => {

  
  
  
 

});