/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});

const listUp = (cp) => {
  fetch("/admin/adminManager/adminList?cp="+cp)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("조회 실패");
  })
  .then(map => {
    console.log(map);

    const adminList = map.memberList;
    const pagination = map.pagination;

    // 리스트 작성 영역
    const adminContent = document.querySelector(".adminContent");
    
    adminContent.innerHTML = "";

    adminList.forEach(admin => {

      const tr = document.createElement("tr");

      // 관리자 번호
      const th1 = document.createElement("th");
      th1.innerHTML = admin.memberId.split("n")[1];

      // 관리자 아이디
      const th2 = document.createElement("th");
      th2.innerHTML = admin.memberId;

      const th3 = document.createElement("th");
      th3.innerHTML = admin.adminName;

      const th4 = document.createElement("th");
      th4.innerHTML = admin.adminEmail;


      const th5 = document.createElement("th");
      const button1 = document.createElement("button");
      button1.innerHTML = "계정 정보 수정";
      button1.addEventListener("click", () =>{
        const alarm = confirm(admin.memberId + "계정정보를 변경을 희망하십니까?");

        if(alarm){

          const input1 = document.createElement("input");
          input1.placeholder = "담당업무를 기입하세요";
          th3.innerHTML = "";
          th3.append(input1);
          const input2 = document.createElement("input");
          input2.placeholder = "담당자 이메일을 입력하세요";
          th4.innerHTML = "";
          th4.append(input2);

          button1.style.display = "none";

          const button = document.createElement("button");
          button.innerHTML = "수정하기";

           th5.append(button);

          button.addEventListener("click", () => {
          
          const adminName = input1.value.trim();
          const adminEmail = input2.value.trim();

          
          fetch("/admin/adminManager?memberNo=" + admin.memberNo, {
            method : "PUT",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
              adminName : adminName,
              adminEmail : adminEmail
            })
           })
          .then(response => {
            if(response.ok) return response.text();
            throw new Error("수정 실패");
          })
          .then(result => {
            if(result > 0) {
              alert("정보 수정이 완료되었습니다.");
              location.reload();
            }
          })
          .catch(err => console.error(err));
          })
        }
      })

      th5.append(button1);

      const th6 = document.createElement("th");
      const button2 = document.createElement("button");
      button2.innerHTML = "계정 삭제";
      button2.addEventListener("click", () =>{
        const alarm = confirm(admin.memberId + "계정을 삭제하시겠습니까?");

        if(alarm){
          fetch("/admin/adminManager?memberNo="+admin.memberNo, {method : "DELETE"})
          .then(response => {
            if(response.ok) return response.text();
            throw new Error("삭제 실패");
          })
          .then(result => {
            if(result > 0) {
              alert("삭제 되었습니다.");
              location.reload();
            }
          })
          .catch(err => console.error(err));
        }
      })

      th6.append(button2);
      
      tr.append(th1, th2, th3, th4, th5, th6);
      adminContent.append(tr);
      
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
 * 화면 실행 시 listUp하기
 */
document.addEventListener("DOMContentLoaded", ()=>{
  listUp(1);
})
