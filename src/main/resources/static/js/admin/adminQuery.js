const openPopupButton = document.getElementById("chatting");
// 팝업 열기
openPopupButton.addEventListener("click", () => {
  window.open(
    "/admin/chatting",  // 팝업으로 열고 싶은 페이지나 URL
    "관리자 채팅창",  // 새 창의 이름
    "width=450,height=750,scrollbars=yes,resizable=yes"
  );
});

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

let openContent = null; // 현재 열려 있는 답글 폼을 추적

const listUp = (cp, sort) => {
  fetch("/admin/query/queryList?cp=" + cp + "&sort=" + sort)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error("조회 실패");
    })
    .then((map) => {
      console.log(map);

      const queryList = map.queryList;
      const pagination = map.pagination;

      // 문의 내역 기록할 tbody 내 내용 삭제
      queryContent.innerHTML = "";

      queryList.forEach((query) => {
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
        title.innerHTML = query.queryTitle;

        // 내용이 작성될 태그
        const content = document.createElement("div");
        content.classList.add("supporting-text");
        content.style.display = "none";

        // 닫기 버튼
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "X";
        closeButton.classList.add("close-btn");
        closeButton.addEventListener("click", () => {
          content.style.display = "none";
          openContent = null;
        });
        content.append(closeButton);

        // 답글 작성 폼 내부 클릭 시 이벤트 전파 막기
        content.addEventListener("click", (e) => e.stopPropagation());

        // 제목 클릭 시 내용이 보이게 하기
        title.addEventListener("click", () => {
          if (openContent && openContent !== content) {
            openContent.style.display = "none";
          }

          // 현재 클릭한 폼 열기/닫기
          content.style.display = content.style.display === "none" ? "block" : "none";
          openContent = content.style.display === "block" ? content : null;
        });

        // 회원이 작성한 문의 내용
        const p1 = document.createElement("p");
        p1.innerHTML = query.queryContent;

        const hr = document.createElement("hr");

        // 답글 작성 부분
        const p2 = document.createElement("div");
        p2.style.display = "flex";
        p2.style.gap = "10px";

        const input = document.createElement("input");
        input.type = "text";
        input.value = query.reply;
        input.placeholder = "답글을 입력하세요";
        input.style.flex = "1";

        const updateBtn = document.createElement("button");
        updateBtn.innerHTML = query.reply ? "수정하기" : "답글 작성하기";
        updateBtn.classList.add("update-btn");

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "삭제하기";
        deleteBtn.classList.add("delete-btn");

        p2.append(input, updateBtn, deleteBtn);

        // 답글 작성 버튼 클릭
        updateBtn.addEventListener("click", () => {
          const reply = input.value.trim();
          if (!reply) {
            alert("답글을 입력해주세요.");
            return;
          }

          fetch(`/admin/query?queryNo=${query.queryNo}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: input.value,
          })
            .then((response) => {
              if (response.ok) return response.json();
              throw new Error("답글 작성 실패");
            })
            .then((result) => {
              if (result > 0) {
                alert(`${query.queryNo}번 문의 글에 답글을 작성하였습니다.`);
                listUp(cp, sort);
              }
            });
        });

        // 삭제 버튼 클릭
        deleteBtn.addEventListener("click", () => {
          if (confirm("정말 삭제하시겠습니까?")) {
            fetch(`/admin/query?queryNo=${query.queryNo}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (response.ok) return response.json();
                throw new Error("삭제 실패");
              })
              .then((result) => {
                if (result > 0) {
                  alert(`${query.queryNo}번 문의 글이 삭제되었습니다.`);
                  listUp(cp, sort);
                }
              });
          }
        });

        content.append(closeButton, p1, hr, p2);
        td2.append(title, content);

        // 작성자
        const td3 = document.createElement("td");
        td3.classList.add("writer");
        td3.textContent = query.memberId;

        // 작성일
        const td4 = document.createElement("td");
        td4.classList.add("writeDate");
        td4.textContent = query.queryWriteDate;

        // 답변 상태
        const td5 = document.createElement("td");
        td5.classList.add("status");
        td5.textContent = query.status === 0 ? "접수완료" : query.status === 1 ? "관리자 확인" : "답변완료";

        tr.append(td1, td2, td3, td4, td5);
        queryContent.append(tr);
      });

      // 페이지네이션 출력
      const pg = document.querySelector(".pagination");
      pg.innerHTML = "";

      const { startPage, endPage, currentPage, prevPage, nextPage, maxPage } = pagination;

      const createPageBtn = (page, text) => {
        const a = document.createElement("a");
        a.textContent = text;
        a.dataset.page = page;

        if (page == currentPage) a.classList.add("current");
        pg.append(a);
      };

      createPageBtn(1, "처음");
      createPageBtn(prevPage, "이전");
      for (let i = startPage; i <= endPage; i++) createPageBtn(i, i);
      createPageBtn(nextPage, "다음");
      createPageBtn(maxPage, "마지막");

      // 페이지네이션 클릭 이벤트 추가
      paginationAddEvent();
    });
};




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
