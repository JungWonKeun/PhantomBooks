const list = document.querySelector("#bookList")



const listUp = (cp, sort, text) => {

  fetch("/admin/manager/bookList?cp="+cp +"&sort="+sort +"&text="+text)
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

      const th1 = document.createElement("th");
      th1.append(book.bookNo);

      const th2 = document.createElement("th");
      th2.append(book.bookTitle);

      const th3 = document.createElement("th");
      th3.append(book.booWriter);

      const th4 = document.createElement("th");
      th4.append(book.companyName);

      const th5 = document.createElement("th");
      th5.append(book.bookCount / book.basicCount);

      const th6 = document.createElement("th");
      th6.append(book.insertDate);

      const th7 = document.createElement("th");
      th7.append(book.bookYn);

      const th8 = document.createElement("th");
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "등록여부 수정";

      th8.append(deleteBtn);

      deleteBtn.addEventListener("click", ()=> {
        const alarm = confirm(book.bookTitle + "를 등록하시겠습니까?");

        if(alarm){
          fetch("/admin/manager/insert", {
            method : "PUT",
            headers : {"Content-Type" : "application/json"},
            body : book.bookNo
          })
          .then(response => {
            if(response.ok) return response.json();
            throw new Error("등록 실패");
          })
          .then(result => {
            if(result > 0 ) {
              alert("등록 완료 하였습니다.");
              listUp(cp, sortSelect.value, text);
            }
          })
          .catch(err => console.error(err));
        }else{
          alert("등록이 취소되었습니다.");
        }
      })
      tr.append(th1, th2, th3, th4, th5, th6, th7, th8);

      list.append(tr);
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
const sortSelect = document.querySelector('#sortSelect');
const searchText = document.querySelector("#searchText");
const resultArea = document.querySelector("#resultArea");

let text = '';

searchText.hidden = true;

sortSelect.addEventListener('change', () => {
  if(sortSelect.value == 'all'){
    listUp(1, sortSelect.value);
    searchText.hidden = true;
  }else{
    searchText.hidden = false;


    searchText.addEventListener("input", () => {
      text = searchText.value.trim();

      console.log(text);

      listUp(1, sortSelect.value, text);
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

//       // 클릭 시 채팅방 입장 함수 호출
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
      listUp(cp, sortSelect.value);
    });
  });
}

/**
 * 문서 시작시 실행하는 함수
 */
document.addEventListener("DOMContentLoaded",()=>{
  listUp(1, sortSelect.value, text);
})

