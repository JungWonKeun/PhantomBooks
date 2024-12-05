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
      const button = document.createElement("button");
      button.innerText = "리뷰 삭제";

      // 선택 삭제
      button.addEventListener("click", () => {
        const alarm =confirm("리뷰를 삭제하시겠습니까?");

        if(!alarm) return;

        fetch("/admin/review?reviewNo="+review.reviewNo, {method:"DELETE"})
        .then(response => {
          if(response.ok) return response.json();
          throw new Error("삭제 요청 실패");})
        .then(result => {
          if (result > 0) {
            alert("삭제 되었습니다.");
            listUp(1, sortSelect.value);
            location.reload();  // 페이지 새로 고침
          }
        })
        .catch(error => {
          console.error(error);
          alert("삭제 중 오류가 발생했습니다.");
        });
      })

      th1.append(button);

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
      const div = document.createElement("div");
      div.append(displayRating(review.reviewScore));

      td4.append(div);
      
      // 리뷰 사진
      const td5 = document.createElement("td");
      td5.classList.add("image");

      const img = document.createElement("img");
      img.src = review.reviewImgNo;
      td5.append(img) ;
      
      // 리뷰 제목
      const td6 = document.createElement("td");
      td6.classList.add("reviewTitle");
      td6.innerHTML = review.reviewTitle;

      // 리뷰 내용
      const td7 = document.createElement("td");
      td7.classList.add("content");
      td7.innerHTML = review.reviewContent;

      // 작성자
      const td8 = document.createElement("td");
      td8.classList.add("name");
      td8.innerHTML = review.memberId;

      // 작성일자
      const td9 = document.createElement("td");
      td9.classList.add("writeDate");
      td9.innerHTML = review.reviewWriteDate;
      
      // 수정일자
      const td10 = document.createElement("td");
      td10.classList.add("updateDate");
      td10.innerHTML = review.reviewWriteDate;
      
      tr.append(td2, td3, td4, td5, td6, td7, td8, td9, td10, th1);
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

// 별 모양 변수

// 반쪽짜리 별
const halfStar = document.createElement("i");
halfStar.classList.add("fa-solid");
halfStar.classList.add("fa-star-half");

// 꽉찬 별
const star = document.createElement("i");
star.classList.add("fa-solid");
star.classList.add("fa-star");

// 빈별
const noStar = document.createElement("i");
noStar.classList.add("fa-light");
noStar.classList.add("fa-star");

function displayRating(rating){

  const stars = document.createElement("div");

  for(let i = 1; i <= 5; i++){
    if(rating >= i){
      stars.appendChild(star.cloneNode());
    } else if(rating >= i - 0.5){
      stars.appendChild(halfStar.cloneNode());
      ;
    } else{
      stars.appendChild(noStar.cloneNode());
    }
  }
  return stars;
}

/**
 * 화면 실행 시 listUp하기
 */
document.addEventListener("DOMContentLoaded", ()=>{
  listUp(1, sortSelect.value);
})