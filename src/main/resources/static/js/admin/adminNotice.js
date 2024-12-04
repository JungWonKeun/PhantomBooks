const sortSelect = document.querySelector(".sortSelect");
const noticeContent = document.querySelector(".noticeContent");


/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});

const changeBtn = document.querySelectorAll(".changeBtn");

changeBtn.forEach((button)=> {
  button.addEventListener("click", () => {

    const noticeId = button.value;
    fetch("/admin/notice/status?noticeId="+noticeId,{method : "POST"})
    .then(response => { if(response.ok) return response.text();})
    .then(result => { if(result > 0) {
      alert("변경 완료");
      listUp(1, sortSelect.value);

      location.reload();
      }
   })
  })
})

// 팝업 / 내용
const addPopupLayer = document.querySelector("#addPopupLayer");
const inputArea = document.querySelector(".input-area");
const title = document.querySelector("#inputTitle");
const content = document.querySelector("#inputContent");

insertBtn?.addEventListener("click", () => {

  // 팝업 나타나게 하기
  addPopupLayer.classList.remove("popup-layer-close");
  title.focus();
  const addNoticeBtn = document.querySelector("#addNoticeBtn");
  const back = document.querySelector("#back");
  
  // 등록하기 버튼 클릭 시
  addNoticeBtn.addEventListener("click", () => {
    
    // 1. 내용 검사
    if(title.value == ""){
      alert("제목을 작성해주세요");
      return;
    }

    if(content.value == ""){
      alert("내용을 작성해주세요");
      return;
    }

    fetch("/admin/notice", {
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
        alert("새로운 공지사항을 등록하였습니다.");

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


updateBtn.addEventListener("click", () => {
  
  // checked 된 noticeId
  const noticeId = document.querySelector("#checkedNoticeId").value;

  fetch("/admin/notice/noticeInfo?noticeId="+noticeId)
  .then(response => {if(response.ok) return response.json();})
  .then(notice => {if(notice != null){
    title.value = notice.title;
    content.value = notice.content;

    // 팝업 나타나게 하기
    addPopupLayer.classList.remove("popup-layer-close");
    title.focus();
    const addNoticeBtn = document.querySelector("#addNoticeBtn");
    const back = document.querySelector("#back");
    
    // 등록하기 버튼 클릭 시
    addNoticeBtn.innerHTML = "수정하기";
    addNoticeBtn.addEventListener("click", () => {
      
      // 1. 내용 검사
      if(title.value == ""){
        alert("제목을 작성해주세요");
        return;
      }

      if(content.value == ""){
        alert("내용을 작성해주세요");
        return;
      }

      fetch("/admin/notice", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
          noticeId : noticeId,
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
          alert("공지사항을 수정하였습니다.");

          // 작성한 내용 없애기
          title.value = "";
          content.value = "";

          // 팝업 숨기기
          addPopupLayer.classList.add("popup-layer-close");

          listUp(1, sortSelect.value);
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
  }})

  location.reload();
})

deleteBtn.addEventListener("click", () => {
  // checked 된 noticeId
  const noticeId = document.querySelector("input:checked").value;

  const alarm = confirm(`${noticeId}번의 공지사항을 삭제하시겠습니까?`);

  if(alarm){
    fetch("/admin/notice?noticeId="+noticeId, {method : "DELETE"})
    .then(response => {
      if(response.ok) return response.text();
      throw new Error("삭제 실패");
    })
    .then(result =>{
      if(result > 0){
        alert("공지사항을 삭제하였습니다.");
        location.reload();
      }
    })
  }
  
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

    if(key != null){ // 검색인 경우

      pathname += `?cp=${cp}&key=${key}`;

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
  const options = document.querySelectorAll("#sortSelect > option");

  options.forEach(op => {
    // op : <option> 태그
    if(op.value === key){ // option의 value와 key가 같다면
      op.selected = true;
      return;
    }
  })
})();


const listUp = (cp, key) => {
  fetch("admin/notice/noticeList?cp=" + cp + "&key=" + key)
  .then(response => { if(response.ok) return response.json() })
  .then(map => {
    console(map);
    
    const pagination = map.pagination;
    const noticeList = map.noticeList;

    noticeContent.innerHTML = "";
    noticeList.forEach(notice => {
      noticeContent.innerHTML = 
        `<tr>  
          <th>
            <input type="checkbox" id="checkedNoticeId" value="${notice.noticeId}">
          </th>
          <td>
            ${notice.noticeId}
          </td>
          <td>
          ${notice.title}
          </td>
          <td>
            ${notice.createDate}
          </td>
          <td>
          ${notice.view}
          </td>
          <td>
            ${notice.status}
          </td>
          <td>
            <button class="changeBtn" value = ${notice.noticeIde}>
              노출 상태 변경
            </button>
          </td>
        </tr>`;

        if(notice.status == 0){
          noticeContent.querySelector("td:nth-child(5)").textContent = "비활성화";
        }else{
          noticeContent.querySelector("td:nth-child(5)").textContent = "활성화";
        }
    })  
  })
}

document.addEventListener("DOMContentLoaded", () => {
  listUp(1, sortSelect.value);
})
