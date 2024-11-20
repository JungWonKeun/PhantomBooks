/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});

// 상단 버튼
const all = document.querySelector("#all");
const allDelete = document.querySelector("#allDelete");
const selectDelete = document.querySelector("#selectDelete");

const checkbox = document.querySelectorAll("input");

// 전체 선택 버튼 클릭 시
all.addEventListener("click", () => {
  
  const allChecked = Array.from(checkbox).every(input => input.checked);
  
  checkbox.forEach(input => {
    input.checked = !allChecked;
  })
  if(all.textContent == "전체 선택"){
    all.innerHTML = "전체 선택 해제";
  }else{
    all.innerHTML = "전체 선택";
  }
})


const listUp = (cp, sort) => {
  fetch("/admin/review/reviewList?cp="+cp+"&sort="+sort)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("조회 실패");
  })
  .then(map => {
    console.log(map);
  })
}

/**
 * 페이지네이션
 */
const paginationAddEvent = () => {
  const pagination = document.querySelectorAll('.pagination a');

  pagination.forEach(a => {
    a.addEventListener('click', (e) => {

      if(a.classList.contains('current')) return;
      
      const cp = e.target.dataset.page;
      listUp(cp, sortSelect.value);
    });
  });
}

/**
 * sort 이벤트
 */

const sortSelect = document.querySelector(".sortSelect");

sortSelect.addEventListener('change', () => {
  const sort = sortSelect.value;

  listUp(1, sort)
})

/**
 * 화면 실행 시 listUp하기
 */
document.addEventListener("DOMContentLoaded", ()=>{
  listUp(1, sortSelect.value);
})