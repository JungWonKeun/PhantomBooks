
// 답글 작성할 영역
const title = document.querySelector(".title");
const text = document.querySelector(".supporting-text");


const queryContent = document.querySelector(".queryContent");

const listUp = (cp, sort) => {
  fetch("/admin/query/queryList?cp="+cp +"&sort="+sort)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("조회 실패");
  })
  .then(map => {
    console.log(map);

    const queryList = map.queryList;

    // 문의 내역 기록할 div태그 내 내용 삭제
    queryContent.innerHTML = "";
    
    queryList.forEach(query => {
      let status = '';
      
      if( query.status === 0){
        status = "접수완료";
      }else if( query.status === 1 ){
        status = "관리자 확인";
      }else{
       status = "답변완료";
      }
      
      // 답변 상태
      const div1 = document.createElement("div");

      const span1 = document.createElement("span");
      span1.innerHTML = status;

      div1.classList.add = "status";
      div1.appendChild(span1);

      // 제목 & 내용
      const div2 = document.createElement("div");

        // 제목이 작성될 태그
        const title = document.createElement("div");
        title.classList.add("title");
        title.classList.add("faq-toggle");

        const span2 = document.createElement("span");
        span2.classList.add("arrow-icon");
        span2.innerHTML = query.queryTitle;

        title.appendChild(span2);
        
        // 내용이 작성될 태그
        const content = document.createElement("div");

        // 회원이 작성한 문의 내용
        const p1 = document.createElement("p");
        p1.innerHTML = query.queryContent;


        // 답글 작성 부분
        const p2 = document.createElement("p");
        if(query.reply != null){
          p2.innerHTML = query.reply;
        }else{
          const input = document.createElement("input");
          const button = document.createElement("button");
          
          p2.appendChild(input, button);
          
          button.addEventListener("click", () => {
            if(input.value.trim() ==null) 
              return confirm("답변을 작성해주세요.");

            fetch("/admin/query/insertReply", {method : "put"})
            .then(response => {
              if(!response.ok) throw new Error("답변 등록 실패");
              response.text();
            })
            .then(result => {
              if(result> 0){
                alert("답변을 등록하였습니다.");
              }
            })
            .catch(err => console.error(err));
          })
        }



      // 작성자
      const div3 = document.createElement("div");

      // 작성일
      const div4 = document.createElement("div");
    })
  
  })
}

const sortSelect = document.querySelector(".sortSelect");

sortSelect.addEventListener('change', () => {
  const sort = sortSelect.value;

  listUp(1, sort)
})


document.addEventListener("DOMContentLoaded",()=>{
  listUp(1, sortSelect.value);
})