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

        const tr11 = document.createElement("tr");
        const tr1 = document.createElement("tr");

        const tr21 = document.createElement("tr");
        const tr2 = document.createElement("tr");

        const tr31 = document.createElement("tr");
        const tr3 = document.createElement("tr");

        const tr41 = document.createElement("tr");
        const tr4 = document.createElement("tr");
        
        const th111 = document.createElement("th");
        const th1 = document.createElement("th");
        const th112 = document.createElement("th");
        const th2 = document.createElement("th");
        const th113 = document.createElement("th");
        const th3 = document.createElement("th");
        const th114 = document.createElement("th");
        const th4 = document.createElement("th");
        const th115 = document.createElement("th");
        const th5 = document.createElement("th");
        th111.rowSpan ="9";
        
        const img = document.createElement("img");
        img.src = book.bookCover;
        th111.append(img);
        img.style.width = '300px'; // 원하는 너비
        img.style.height = '300px'; // 원하는 높이

        th112.innerHTML = "책 제목";
        th113.innerHTML = "출판사";
        th114.innerHTML = "책 저자";
        th115.innerHTML = "번역가";
        
        th2.innerHTML = book.bookTitle;
        th3.innerHTML = book.companyName;
        th4.innerHTML = book.bookWriter;
        th5.innerHTML = book.bookTalt;

        tr11.append(th111, th112, th113, th114, th115);
        tr1.append(th2, th3, th4, th5);

        const th26 = document.createElement("th");
        const th27 = document.createElement("th");
        const th28 = document.createElement("th");
        const th29 = document.createElement("th");

        const th6 = document.createElement("th");
        const th7 = document.createElement("th");
        const th8 = document.createElement("th");
        const th9 = document.createElement("th");

        th26.innerHTML = "출간일";
        th27.innerHTML = "책 내용";
        th28.innerHTML = "페이지수";
        th29.innerHTML = "판매가격";

        th6.append(book.bookDate);
        th7.append(book.bookContent);
        th8.append(book.bookPageCount);
        th9.append(book.bookPrice);

        tr21.append(th26, th27, th28, th29);
        tr2.append(th6, th7, th8, th9);

        const th310 =document.createElement("th");
        const th311 =document.createElement("th");
        const th312 =document.createElement("th");
        const th313 =document.createElement("th");
        const th10 = document.createElement("th");
        const th11 = document.createElement("th");
        const th12 = document.createElement("th");
        const th13 = document.createElement("th");

        th310.innerHTML = "잔여수량";
        th311.innerHTML = "최초수량";
        th312.innerHTML = "요청 가격";
        th313.innerHTML = "요청 수량";

        th11.append(book.currentCount);
        th12.append(book.basicCount);
        th10.append( document.createElement("input") );
        th13.append( document.createElement("input") );

        tr31.append(th310, th311, th312, th313);
        tr3.append( th11, th12, th10, th13);
        
        const th16 = document.createElement("th");
        const th17 = document.createElement("th");
        const th14 = document.createElement("th");
        const th15 = document.createElement("th");
        const button1 = document.createElement("button");
        button1.innerHTML = "보내기";
        const button2 = document.createElement("button");
        button2.innerHTML = "취소";
        
        th16.innerHTML= "요청 이메일";
        const input = document.createElement("input")
        th17.append(input);
        input.value = book.email;
        th14.append(button1);
        th15.append(button2);

        button1.addEventListener("click", ()=>{
          const alarm = confirm(book.email + "으로 발주요청을 보내시겠습니까?");

          if(alarm){
            fetch("/admin/request", {
              method : "post",
              headers : {"Content-Type" : "application/json"},
              body : JSON.stringify({
                email : book.email,
                title : book.bookTitle
              })
              })
            .then(response => {
              if(response.ok) return response.text();
              throw new Error("전송 실패");
            })
            .then(result => {
              if(result > 0){
                alert("요청을 보냈습니다");
                location.reload();
              }
            })

          }
        })

        button2.addEventListener("click", () => {
          location.reload();
        })

        tr4.append(th16, th17, th14, th15);

        resultArea.append(tr11, tr1, tr21, tr2, tr31, tr3, tr41, tr4);
      })

      const td3 = document.createElement("td");
      td3.append(book.companyName);

      const td4 = document.createElement("td");
      td4.append(book.currentCount);

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

