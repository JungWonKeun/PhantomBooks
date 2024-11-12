const list = document.querySelector("#list");


const listUp = (cp, sort) => {
  fetch("/admin/memberList?cp="+cp + "&sort="+sort)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("조회 실패");
  })
  .then(map => {
    console.log(map);

    const memberList = map.memberList;
    const pagination = map.pagination;

    const countMember = map.countMember;
    const countDelFl = map.countDelFl;
    const countMemberList = map.countMemberList;

    list.innerHTML = '';
    
    const sales = document.querySelector(".sales");
    sales.innerHTML = '';

    const div1 = document.createElement("div");
    div1.innerHTML = "총 회원 수 : " + countMember + "명";
    
    const div2 = document.createElement("div");
    div2.innerHTML = "기간 중 가입 회원 수 : " + countMemberList + "명";
    
    const div3 = document.createElement("div");
    div3.innerHTML = "기간 중 탈퇴 회원수 : " + countDelFl + "명";

    sales.appendChild(div1);
    sales.appendChild(div2);
    sales.appendChild(div3);

    memberList.forEach(member => {

      // 감싸는 tr태그 생성
      const tr = document.createElement("tr"); 

      const th1 = document.createElement("th");
      th1.append(member.memberNo);

      const td2 = document.createElement("td");
      td2.append(member.name);

      // 수정해야되요~~~!!!!
      const td3 = document.createElement("td");
      td3.append(member.signupDate);

      const td4 = document.createElement("td");
      td4.append(member.loginDate);

      const th5 = document.createElement("th");
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "ID삭제 처리";

      th5.append(deleteBtn);

      deleteBtn.addEventListener("click", () => {

        const alarm = confirm("삭제하시겠습니까?");

        if(alarm){
          fetch("admin/delete", {
            method : "DELETE",
            headers : {"Content-Type" : "application/json"},
            body : member.memberNo
          })
          .then(response => {
            if(response.ok) return response.json();
            throw new Error("삭제 실패");
          })
          .then(result => {
            if(result > 0 ) {
              alert("회원 정보를 삭제하였습니다.");
              listUp(cp, sortSelect.value);
            }
          })
          .catch(err => console.error(err));
        }else{
          alert("삭제가 취소되었습니다.");
        }
      })
     
      tr.append(th1, td2, td3, td4, th5);

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

sortSelect.addEventListener('change', () => {
  listUp(1, sortSelect.value);
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
      listUp(cp, sortSelect.value);
    });
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  listUp(1, sortSelect.value);
})