/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});

// 내용 작성 영역
const faqContent = document.querySelector(".faqContent");

/* 글쓰기 버튼 클릭 시 */
const insertBtn = document.querySelector("#insertBtn");

// 팝업 / 내용
const addPopupLayer = document.querySelector("#addPopupLayer");
const inputArea = document.querySelector(".input-area");
const title = document.querySelector("#inputTitle");
const content = document.querySelector("#inputContent");


insertBtn?.addEventListener("click", () => {

  // 팝업 나타나게 하기
  addPopupLayer.classList.remove("popup-layer-close");
  title.focus();
  const addFaqBtn = document.querySelector("#addFaqBtn");
  const back = document.querySelector("#back");
 
  // 등록하기 버튼 클릭 시
  addFaqBtn.addEventListener("click", () => {
    
    // 1. 내용 검사
    if(title.value == ""){
      alert("제목을 작성해주세요");
      return;
    }

    if(content.value == ""){
      alert("내용을 작성해주세요");
      return;
    }

    fetch("/admin/faq", {
      method : "PUT",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({
        title : title.value.trim(),
        content : content.value.trim()
      })
    })
    .then(response => {
      if(response.ok) return response.json();
      throw new Error("추가 실패");
    })
    .then(result => {
      if(result > 0){
        alert("새로운 FAQ를 등록하였습니다.");

        // 작성한 내용 없애기
        title.value = "";
        content.value = "";

        // 팝업 숨기기
        addPopupLayer.classList.add("popup-layer-close");

        location.reload();
      }
    })
  })

  // 돌아가기 버튼
  back.addEventListener("click", () => {
    
    // 작성한 내용 없애기
    title.value = '';
    content.value = "";

    // 팝업 숨기기
    addPopupLayer.classList.add("popup-layer-close");
  })

});

// 노출상태 변경
const updateBtn = document.querySelector(".updateBtn");
const updateId = document.querySelectorAll(".updateId");




updateBtn.addEventListener("click", ()=> {

  fetch("/admin/faq?faqId="+faqId, {method : "post"})
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("삭제 실패");
  })
  .then(result => {
    if(result > 0) {
      console.log(faqId);
      // location.reload();
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
  const query = params.get("query");

  if(key === null) return; // 검색이 아니면 함수 종료

  // 검색어 화면에 출력하기
  document.querySelector("#searchQuery").value = query;

  // 검색 조건 선택하기
  const options = document.querySelectorAll("#searchKey > option");

  options.forEach(op => {
    // op : <option> 태그
    if(op.value === key){ // option의 value와 key가 같다면
      op.selected = true;
      return;
    }
  })
})();

// 전체 선택 버튼
const allSelectBtn = document.querySelector("#allSelectBtn");
const selectFaqs = document.querySelectorAll("#selectFaq"); // 여러 개의 체크박스를 선택

// 상단 선택 버튼
const allBtn = document.querySelector("#all");
const selectUpdateBtn = document.querySelector("#selectUpdate");
const selectDeleteBtn = document.querySelector("#selectDelete");

allSelectBtn.addEventListener("click", () => {
  // 전체 선택 버튼이 클릭되면 체크박스들의 상태를 반전
  const allChecked = Array.from(selectFaqs).every(faq => faq.checked); // 모든 체크박스가 선택된 상태인지 확인

  selectFaqs.forEach(faq => {
    faq.checked = !allChecked; // 모든 체크박스가 선택되었으면 해제하고, 그렇지 않으면 모두 선택
  });
});

// 전체 선택 해제
allBtn.addEventListener("click", () => {
  const allChecked = Array.from(selectFaqs).every(faq => faq.checked = false); // 모든 체크박스가 선택된 상태인지 확인

  selectFaqs.forEach(faq => {
    faq = !allChecked; 
  });
})