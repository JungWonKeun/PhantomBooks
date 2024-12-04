// 
// 답글 작성할 영역
const title = document.querySelector(".title");
const text = document.querySelector(".supporting-text");

const queryContent = document.querySelector(".queryContent");

/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});

const listUp = (cp, sort) => {
  fetch("/admin/query/queryList?cp="+cp +"&sort="+sort)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("조회 실패");
  })
  .then(map => {
    console.log(map);

    const queryList = map.queryList;
    const pagination = map.pagination;

    // 문의 내역 기록할 tbody 내 내용 삭제
    queryContent.innerHTML = "";
    
    queryList.forEach(query => {
      
      const tr = document.createElement("tr");

      // 문의 번호
      const td1 = document.createElement("th");
      td1.classList.add("queryNo");

      td1.innerHTML = query.queryNo;


      // 제목 & 내용
      const td2 = document.createElement("td");


      // 제목이 작성될 태그
      const title = document.createElement("div");
      title.classList.add("title");
      title.classList.add("faq-toggle");

      const span2 = document.createElement("span");
      span2.classList.add("arrow-icon");
      span2.innerHTML = query.queryTitle;

      span2.append(title);
      td2.append(span2);
      
      // 내용이 작성될 태그
      const content = document.createElement("div");
      
      content.classList.add("supporting-text");
      content.style.display = "none";
      
      // 제목 클릭 시 내용이 보이게 하기
      // + 답변상태 변경
      tr.addEventListener("click", () => {
        content.style.display = "block";

        fetch("/admin/query/updateStatus?queryNo=" + query.queryNo, {method : "PUT"})
        .then(response => {
          if(response.ok) return response.json();
          throw new Error("안읽혀요");
        })
        .then(result => {
          if(result > 0) {
            if(span1.value = "접수완료") span1.innerHTML = "관리자 확인";
          }
          console.error("안되요~");
        })

      })

      
      // 회원이 작성한 문의 내용
      const p1 = document.createElement("p");
      p1.innerHTML = query.queryContent;



      const hr = document.createElement("hr");

      // 답글 작성 부분
      const p2 = document.createElement("p");

      const input = document.createElement("input");
      const updateBtn = document.createElement("button");
      const deleteBtn = document.createElement("button");

      deleteBtn.innerHTML = "삭제하기";

      p2.append(input, updateBtn, deleteBtn);

      

      if(query.reply != null){
        input.value = query.reply;
        updateBtn.innerHTML ="수정하기";

        updateBtn.addEventListener("click", (e) => {
          if(input.value.trim() == query.reply){ 
            
            // 제출 막기
            e.preventDefault();
            return;
          }

          // 수정하기 버튼 클릭 시
          fetch("/admin/query?queryNo="+query.queryNo, {
            method : "PUT",
            headers : {"Content-Type" : "application/json"},
            body : input.value.trim()
          })
          .then(response => {
            if(response.ok) return response.json();
            throw new Error("답글작성 실패");
          })
          .then(result => {
            if(result > 0){
              alert(`${query.queryNo}번 문의 글에 답글을 수정하였습니다.`);

              listUp(cp, sortSelect.value);
            }
          })
      })

      }else{
        updateBtn.innerText = "답글 작성하기";

        updateBtn.addEventListener("click", () => {
          if(input.value.trim() == ""){ 
            alert("답글을 작성해주세요.");
            return;
          }

          fetch("/admin/query?queryNo="+query.queryNo, {
            method : "PUT",
            headers : {"Content-Type" : "application/json"},
            body : input.value.trim()
          })
          .then(response => {
            if(response.ok) return response.json();
            throw new Error("답글작성 실패");
          })
          .then(result => {
            if(result > 0){
              alert(`${query.queryNo}번 문의 글에 답글을 작성하였습니다.`);

              listUp(cp, sortSelect.value);
            }
            
          })
        })
      }

      // 삭제버튼 클릭시
      deleteBtn.addEventListener("click", () => {
        
        const alarm = confirm("문의글을 삭제하시겠습니까?");

        if(alarm){

          fetch("/admin/query?queryNo="+query.queryNo, { method : "DELETE" })
          .then(response => {
            if(response.ok) return response.json();
            throw new Error("답글작성 실패");
          })
          .then(result => {
            if(result > 0){
              alert(`${query.queryNo}번 문의 글에 답글을 삭제하였습니다.`);

              listUp(cp, sortSelect.value);
            }
          })
        }
    })

      content.append(p1, hr, p2);

      td2.append(title, content);


      // 작성자
      const td3 = document.createElement("td");

      td3.classList.add("writer");
      td3.innerHTML = query.memberId;

      // 작성일
      const td4 = document.createElement("td");
      td4.innerHTML = query.queryWriteDate;
      td4.classList.add("writeDate");

      // 답변 상태
      let status = '';

      if( query.status === 0){
        status = "접수완료";
      }else if( query.status === 1 ){
        status = "관리자 확인";
      }else{
        status = "답변완료";
      }
      
      const td5 = document.createElement("td");
      td5.classList.add("status");

      const span1 = document.createElement("span");
      span1.innerHTML = status;

      td5.classList.add = "status";
      td5.append(span1);
      

      tr.append(td1, td2, td3, td4, td5);

      queryContent.append(tr);
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
const sortSelect = document.querySelector(".sortSelect");

sortSelect.addEventListener('change', () => {
  const sort = sortSelect.value;

  listUp(1, sort)
})





document.addEventListener("DOMContentLoaded", ()=>{
  listUp(1, sortSelect.value);
})
