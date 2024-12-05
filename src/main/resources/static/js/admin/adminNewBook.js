/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});

const openPopupButton = document.getElementById("chatting");
// 팝업 열기
openPopupButton.addEventListener("click", () => {
  window.open(
    "/admin/chatting",  // 팝업으로 열고 싶은 페이지나 URL
    "관리자 채팅창",  // 새 창의 이름
    "width=450,height=750,scrollbars=yes,resizable=yes"
  );
});

/* 이름 클릭 시 로그아웃 */
const logout = document.querySelector(".adminName");

logout.addEventListener("click", () => {
  fetch("/admin/logout")
  .then(response => { if(response.ok) return response.text();})
  .then(result => { if(result == 1) window.location.href = "/";})
})


// 등록상태 변경
const updateBtn = document.querySelectorAll(".updateBtn");

updateBtn.forEach((button) => {
  button.addEventListener("click", ()=> {
    const bookNo = button.value;
    console.log(bookNo);

    fetch("/admin/newBook", {
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : bookNo
     })
    .then(response => {
      if(response.ok) return response.text();
      throw new Error("등록 실패");
    })
    .then(result => {
      if(result == 0) {return alert(`${bookNo}는 삭제된 발주요청입니다.`);}
      else{
        
        console.log(result);
        alert(`등록 하였습니다. ${bookNo}번 책을 재고 추가하세요.`);
        location.reload();
      }
    })
  })
})

const deleteBtn = document.querySelectorAll(".deleteBtn");

deleteBtn.forEach((button) => {
  button.addEventListener("click", () => {
  const requestNo = deleteBtn.value;
  const alarm = confirm(`${requestNo}번 책 요청을 삭제하시겠습니까?`);

  if(alarm){
    fetch("/admin/newBook?requestNo="+requestNo, {method : "delete"})
    .then(response => {if(response.ok) return response.text();})
    .then(result => { if(result > 0) {
      alert(`${requestNo} 요청을 삭제하였습니다.`);
      location.reload();
      }
    })
  }
  })
})





const pageNoList = document.querySelectorAll(".pagination a");

// 페이지 이동 버튼이 클릭 되었을 때
pageNoList?.forEach( (item, index) => {
  
  // 페이지 이동 버튼 클릭 되었을 때
  item.addEventListener("click", e => {
    e.preventDefault();

    // 만약 클릭된 a 태그에 "current" 클래스가 있을 경우
    // == 현재 페이지 숫자를 클릭한 경우
    if(item.classList.contains("current")) {
      return;
    }

    // const -> let으로 변경
    let pathname = location.pathname; // 현재 게시판 조회 요청 주소



    // 클릭된 버튼이 <<, <, >, >> 인 경우
    // console.log(item.innerText);
    switch(item.innerText){
      case'<<' : // 1페이지로 이동
        pathname += "?cp=1"; 
        break;

      case'<'  : // 이전 페이지
        pathname += "?cp=" + pagination.prevPage; 
        break;

      case'>'  : // 다음 페이지
        pathname += "?cp=" + pagination.nextPage; 
        break;

      case'>>' : 
        pathname += "?cp=" + pagination.maxPage;  
        break;
      
      default  :  // 클릭한 숫자 페이지로 이동
        pathname += "?cp=" + item.innerText;
    }

    const params = new URLSearchParams(location.search);

    const key = params.get("key"); // K:V 중 K가 "key"인 요소의 값
    const query = params.get("query"); // K:V 중 K가 "query"인 요소의 값


    if(key != null){ // 검색인 경우

      pathname += `&key=${key}&query=${query}`;

    } 
    // 페이지 이동
    location.href = pathname;
  });
});


(()=>{
  
  // 쿼리스트링 모두 얻어와 관리하는 객체
  const params = new URLSearchParams(location.search);

  const key = params.get("key");

  if(key === null) return; // 검색이 아니면 함수 종료

  // 검색 조건 선택하기
  const options = document.querySelectorAll(".sortSelect > option");

  options.forEach(op => {
    // op : <option> 태그
    if(op.value === key){ // option의 value와 key가 같다면
      op.selected = true;
      return;
    }
  })
})();

