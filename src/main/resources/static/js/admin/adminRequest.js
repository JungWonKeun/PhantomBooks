const list = document.querySelector("#bookList")

/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});

const listUp = (cp, sort, view, text) => {

  fetch("/admin/manager/bookList?cp="+cp +"&sort="+sort + "&view=" + view + "&text="+text)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("조회 실패");
  })
  .then(map => {
    console.log(map);

    const bookList = map.bookList;
    const pagination = map.pagination;

    list.innerHTML = "";

    bookList.forEach(book => {
      const tr = document.createElement("tr");

      const td1 = document.createElement("td");
      td1.append(book.bookNo);

      const td2 = document.createElement("td");
      td2.append(book.bookTitle);

      td2.addEventListener("click", () => {
        resultArea.innerHTML = "";

        const tr1 = document.createElement("tr");
        const tr2 = document.createElement("tr");
        const tr3 = document.createElement("tr");
        const th1 = document.createElement("th");
        const th2 = document.createElement("th");
        th1.rowSpan ="4";
        th1.innerHTML = book.bookCover;
        
        th2.colSpan = "4";
        th2.innerHTML = "책 제목 : " + book.bookTitle;

        tr1.append(th1, th2);

        const th3 = document.createElement("th");
        th3.colSpan = "4";
        th3.innerHTML = "출판사 : " + book.companyName;

        tr2.append(th3);

        const th4 = document.createElement("th");
        th4.colSpan = "4";
        th4.innerHTML = "책 저자 : " + book.bookWriter;

        tr3.append(th4);

        resultArea.append(tr1, tr2, tr3);
      })

      const td3 = document.createElement("td");
      td3.append(book.bookWriter);

      const td4 = document.createElement("td");
      td4.append(book.companyName);

      tr.append(td1, td2, td3, td4);
      list.append(tr);
    })

    const resultArea = document.querySelector(".resultArea");

    resultArea.innerHTML = "";
    const tr1 = document.createElement("tr");
    const th1 = document.createElement("th");
    th1.innerHTML = "발주 요청할 책을 선택해주세요";
    th1.colSpan ="5";

    tr1.append(th1);
    resultArea.append(tr1);


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
const sortSelect = document.querySelector('#sortSelect');
const searchText = document.querySelector("#searchText");
const resultArea = document.querySelector("#resultArea");

let text = '';

viewSelect.addEventListener("change", ()=>{
  console.log(viewSelect.value);
  
  listUp(1, sortSelect.value, viewSelect.value, text);
 
})

searchText.hidden = true;

sortSelect.addEventListener('change', () => {
  if(sortSelect.value == 'all'){
    listUp(1, sortSelect.value, viewSelect.value);
    searchText.hidden = true;
  }else{
    searchText.hidden = false;


    searchText.addEventListener("input", () => {
      text = searchText.value.trim();

      console.log(text);

      listUp(1, sortSelect.value, viewSelect.value, text);
    })
  }

})

// /**
//  * 출판사 검색 시 자동완성 추천
//  */
// const url = "/admin/manager/inputText?sort=" + sort + "&text=" + text

// searchText.addEventListener("input", (sort, text) => {
//   fetch(url)
//   .then(response => {
//     if(response.ok) return response.json();
//     throw new Error("검색 실패");
//   })
//   .then(list => {
//     console.log(list);

//     resultArea.innerHTML = ""; // 이전 검색 결과 비우기

//     if (list.length == 0) {
//       const li = document.createElement("li");
//       li.classList.add("result-row");
//       li.innerText = "일치하는 출판사가 없습니다";
//       resultArea.append(li);
//       return;
//     }

//     for (let company of list) {
//       // li요소 생성(한 행을 감싸는 요소)
//       const li = document.createElement("li");
//       li.classList.add("result-row");

//       let companyName = company.companyName;

//       const span = document.createElement("span");
//       span.innerHTML = `${companyName}`.replace(text, `<mark>${text}</mark>`);

//       // 요소 조립(화면에 추가)
//       li.append(span);
//       resultArea.append(li);

//       
//       li.addEventListener("click", listUp(1, sortSelect.value, text));
//     }
//   })
//   .catch(err => console.error(err));
// })

/**
 * 페이지네이션
 */
const paginationAddEvent = () => {
  const pagination = document.querySelectorAll('.pagination a');

  pagination.forEach(a => {
    a.addEventListener('click', (e) => {

      if(a.classList.contains('current')) return;
      
      const cp = e.target.dataset.page;
      listUp(cp, sortSelect.value, viewSelect.value);
    });
  });
}

/**
 * 문서 시작시 실행하는 함수
 */
document.addEventListener("DOMContentLoaded",()=>{
  listUp(1, sortSelect.value, viewSelect.value, text);
})

