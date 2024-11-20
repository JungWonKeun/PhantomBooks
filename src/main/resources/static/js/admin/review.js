/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});

// 리스트 조회
const listUp = (cp, sort, title) => {
  fetch("/admin/review/reviewList?cp="+cp+"&sort="+sort+"&title="+title)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("조회 실패");
  })
  .then(map => {
    console.log(map);

    const reviewList = map.reviewList;
    const pagination = map.pagination;

    // 리스트 작성 될 tbody
    const reviewContent = document.querySelector(".reviewContent");

    // 내용 지우기
    reviewContent.innerHTML ="";

    reviewList.forEach(review => {

      const tr = document.createElement("tr");

      // 체크박스
      const th1 = document.createElement("th");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = review.bookNo

      th1.append(input);

      // 책 번호 작성
      const td2 = document.createElement("td");
      td2.classList.add("bookNo");
      td2.innerHTML = review.bookNo;

      // 책 제목
      const td3 = document.createElement("td");
      td3.classList.add("title");

      const span = document.createElement("span");
      span.innerText = review.bookTitle;

      td3.append(span);

      td3.addEventListener("click", () => {
        const title = review.bookTitle;
        sortSelect.value = 'title';


        listUp(1, sortSelect.value, title);
      })

      // 구매자 평점
      const td4 = document.createElement("td");
      td4.classList.add("score");
      td4.innerHTML = review.reviewScore;
      
      // 리뷰 사진
      const td5 = document.createElement("td");
      td4.classList.add("image");
      td5.innerHTML = review.reviewImgNo;
      
      // 리뷰 제목
      const td6 = document.createElement("td");
      td4.classList.add("reviewTitle");
      td6.innerHTML = review.reviewTitle;

      // 리뷰 내용
      const td7 = document.createElement("td");
      td4.classList.add("content");
      td7.innerHTML = review.reviewContent;

      // 작성자
      const td8 = document.createElement("td");
      td4.classList.add("name");
      td8.innerHTML = review.memberId;

      // 작성일자
      const td9 = document.createElement("td");
      td4.classList.add("writeDate");
      td9.innerHTML = review.reviewWriteDate;
      
      // 수정일자
      const td10 = document.createElement("td");
      td4.classList.add("updateDate");
      td10.innerHTML = review.reviewWriteDate;
      
      tr.append(th1, td2, td3, td4, td5, td6, td7, td8, td9, td10);
      reviewContent.append(tr);

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
  allSelectEvent();

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

// 상단 버튼
const all = document.querySelector("#all");
const allDelete = document.querySelector("#allDelete");
const selectDelete = document.querySelector("#selectDelete");

const checkbox = document.querySelectorAll("input");
const checkboxValues = [];


/* 클릭 이벤트 */

// 전체 선택 버튼 클릭 시
const allSelectEvent = () => {
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
}


// 선택 삭제
allDelete.addEventListener("click", () => {
  const alarm = confirm("선택한 리뷰를 삭제하시겠습니까?");

  if(!alarm) return;

  checkbox.forEach(checkbox => {
    checkboxValues.push(checkbox.value);
  })

  console.log(checkboxValues);
  

  fetch("/admin/review?reviewNo="+checkboxValues, {method:"DELETE"})
  .then(response => {if(response.ok) return response.json();})
  .then(result => {
    if(result>0) alert("삭제 되었습니다."); 
    listUp(1,sortSelect.value);
    location.reload();
  })
})



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
  allSelectEvent();
})