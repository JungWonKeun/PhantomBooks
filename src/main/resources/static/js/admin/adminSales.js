const salesRank = document.querySelector("#salesRank");

/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});

const sort = document.querySelector("#sortSelect");

const listUp = (cp, sort, term, date) => {
  fetch("/admin/sales/salesList?cp="+cp+"&sort="+sort + "&term="+term+"&date="+date)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("조회실패");
  })
  .then(map => {
    console.log(map);

    const pagination = map.pagination;
    const salesList = map.salesList;

    salesList.forEach(sales => {
      
      salesRank.innerHTML = '';

      const tr = document.createElement("tr");

      const th1 = document.createElement("th");
      th1.append(sales.bookNo);

      const th2 = document.createElement("th");
      th2.append(sales.bookTitle);

      const th3 = document.createElement("th");
      th3.append(sales.categoryName);

      const th4 = document.createElement("th");
      th4.append(sales.bookCount);

      const th5 = document.createElement("th");
      th5.append(sales.orderPrice);

      tr.append(th1, th2, th3, th4, th5);
      
      salesRank.append(tr);
    })

    // 페이지네이션 출력
    const pg = document.querySelector('.pagination');
    pg.innerHTML = '';
    
    // pagication 구조 분해
    const {startPage, endPage, currentPage, prevPage, nextPage, maxPage} = pagination;

    // 버튼 생성 + 화면 추가 함수
    const createPageBtn = (page, text) => {
      const a = document.createElement('a');
      a.textContent = text;
      a.dataset.page = page;

      if(!isNaN(Number(text)) &&  page == currentPage) a.classList.add('current');
      pg.append(a);
    }

    createPageBtn(1, '처음');
    createPageBtn(prevPage, '이전');

    for(let i = startPage; i <= endPage; i++) {
      createPageBtn(i, i);
    }

    createPageBtn(nextPage, '다음');
    createPageBtn(maxPage, '마지막');

    // 페이지네이션 클릭 이벤트 추가
    paginationAddEvent();
  
  
  })

}


/**
 * 정렬 기준 변경 이벤트
 */

/* 기간 정렬 기준*/
const termSelect = document.querySelector('.btn-container');
let term = '';

const week = document.querySelector(".weeks");
const month = document.querySelector(".month");
const sixMonth = document.querySelector(".sixMonth");
const dateSelect = document.querySelector(".dateSelect");
const date = document.querySelector(".date");

// 버튼 클릭 시 색 변경
const buttons = document.querySelectorAll(".btn-container > button");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
    
    if (!button.classList.contains("dateSelect")) {
      date.classList.add("hidden");
    }
  });
});

week.addEventListener("click", () => {
  term = "weeks";
  listUp(1, sortSelect.value, term);
  
  if(myChart !== null){
    myChart.destroy();
  }
});
month.addEventListener("click", () => {
  term = "month";
  listUp(1, sortSelect.value, term);

  if(myChart !== null){
    myChart.destroy();
  }
});
sixMonth.addEventListener("click", () => {
  term = "6month";
  listUp(1, sortSelect.value, term);

  if(myChart !== null){
    myChart.destroy();
  }
});

dateSelect.addEventListener("click", () => {
  
  date.classList.remove('hidden');

  date.addEventListener("change", ()=>{

    term = "dateSelect";
    
    listUp(1, sortSelect.value, term, date.value);

    if(myChart !== null){
      myChart.destroy();
    }
  })
});


/**
 * 페이지네이션
 */
const paginationAddEvent = () => {
  const pagination = document.querySelectorAll('.pagination a');

  pagination.forEach(a => {
    a.addEventListener('click', (e) => {

      if(a.classList.contains('current')) return;
      
      const cp = e.target.dataset.page;
      listUp(cp, sortSelect.value, term);

      if(myChart !== null){
        myChart.destroy();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  listUp(1,sortSelect.ariaValue, termSelect.value);
})
