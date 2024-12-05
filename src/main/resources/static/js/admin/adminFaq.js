document.addEventListener("DOMContentLoaded", () => {
  const sortSelect = document.querySelector(".sortSelect");

  const openPopupButton = document.getElementById("chatting");
  // 팝업 열기
  openPopupButton.addEventListener("click", () => {
    window.open(
      "/admin/chatting",  // 팝업으로 열고 싶은 페이지나 URL
      "관리자 채팅창",  // 새 창의 이름
      "width=450,height=750,scrollbars=yes,resizable=yes"
    );
  });
  

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
  const addFaqBtn = document.querySelector("#addFaqBtn");
  const back = document.querySelector("#back");
  const addPopupLayer = document.querySelector("#addPopupLayer");
  const title = document.querySelector("#inputTitle");
  const content = document.querySelector("#inputContent");

  // 글쓰기 버튼 클릭 시 팝업 표시
  insertBtn?.addEventListener("click", () => {
    addPopupLayer.style.display = "block"; // 팝업 열기
    title.focus();
  });

  // 등록하기 버튼 클릭 시
  addFaqBtn?.addEventListener("click", () => {
    // 입력값 확인
    if (title.value.trim() === "") {
      alert("제목을 입력하세요.");
      return;
    }
    if (content.value.trim() === "") {
      alert("내용을 입력하세요.");
      return;
    }

    // 서버에 데이터 전송
    fetch("/admin/faq", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.value.trim(),
        content: content.value.trim(),
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("FAQ 등록 실패");
      })
      .then((result) => {
        if (result > 0) {
          alert("새로운 FAQ가 등록되었습니다.");
          // 입력값 초기화 및 팝업 닫기
          title.value = "";
          content.value = "";
          addPopupLayer.style.display = "none";
          location.reload(); // 새로고침
        }
      })
      .catch((error) => console.error(error));
  });

  // 돌아가기 버튼 클릭 시 팝업 닫기
  back?.addEventListener("click", () => {
    title.value = "";
    content.value = "";
    addPopupLayer.style.display = "none";
  });

  // 노출상태 변경
  const updateBtn = document.querySelectorAll(".updateBtn");

  updateBtn.forEach((button) => {
    button.addEventListener("click", () => {

      const faqId = button.value;

      alert(faqId + "를 노출상태를 변경합니다.");

      fetch("/admin/faq?faqId=" + faqId, { method: "post" })
        .then(response => {
          if (response.ok) return response.text();
          throw new Error("노출 상태 변경");
        })
        .then(result => {
          if (result > 0) {
            console.log(faqId);
            location.reload();
            listUp(1, sortSelect.value);
          }
        })
    })
  });

  const deleteBtn = document.querySelectorAll(".deleteBtn");

  deleteBtn.forEach((button) => {
    button.addEventListener("click", () => {
      const faqId = button.value;

      const alarm = `${faqId}를 삭제 하시겠습니까?`;

      if (alarm) {
        fetch("/admin/faq?faqId=" + faqId, { method: "DELETE" })
          .then(response => { if (response.ok) return response.text(); })
          .then(result => {
            if (result > 0) {
              alert(`${faqId}를 삭제하였습니다. `);
              location.reload();
              listUp(1, sortSelect.value);
            }
          })
      }
    })
  })



  const pageNoList = document.querySelectorAll(".pagination a");

  // 페이지 이동 버튼이 클릭 되었을 때
  pageNoList?.forEach((item, index) => {

    // 페이지 이동 버튼 클릭 되었을 때
    item.addEventListener("click", e => {
      e.preventDefault();

      // 만약 클릭된 a 태그에 "current" 클래스가 있을 경우
      // == 현재 페이지 숫자를 클릭한 경우
      if (item.classList.contains("current")) {
        return;
      }

      // const -> let으로 변경
      let pathname = location.pathname; // 현재 게시판 조회 요청 주소



      // 클릭된 버튼이 <<, <, >, >> 인 경우
      // console.log(item.innerText);
      switch (item.innerText) {
        case '<<': // 1페이지로 이동
          pathname += "?cp=1";
          break;

        case '<': // 이전 페이지
          pathname += "?cp=" + pagination.prevPage;
          break;

        case '>': // 다음 페이지
          pathname += "?cp=" + pagination.nextPage;
          break;

        case '>>':
          pathname += "?cp=" + pagination.maxPage;
          break;

        default:  // 클릭한 숫자 페이지로 이동
          pathname += "?cp=" + item.innerText;
      }

      const params = new URLSearchParams(location.search);

      const key = params.get("key"); // K:V 중 K가 "key"인 요소의 값
      const query = params.get("query"); // K:V 중 K가 "query"인 요소의 값


      if (key != null) { // 검색인 경우

        pathname += `&key=${key}&query=${query}`;

      }
      // 페이지 이동
      location.href = pathname;
    });
  });


  (() => {

    // 쿼리스트링 모두 얻어와 관리하는 객체
    const params = new URLSearchParams(location.search);

    const key = params.get("key");

    if (key === null) return; // 검색이 아니면 함수 종료

    // 검색 조건 선택하기
    const options = document.querySelectorAll(".sortSelect > option");

    options.forEach(op => {
      // op : <option> 태그
      if (op.value === key) { // option의 value와 key가 같다면
        op.selected = true;
        return;
      }
    })
  })();


  let pagination = null;

  const listUp = (cp, key) => {

    fetch("admin/faq/faqList?cp=" + cp + "&key=" + key)
      .then(response => { if (response.ok) return response.json() })
      .then(map => {
        console.log(map);

        pagination = map.pagination;
        const faqList = map.faqList;

        faqContent.innerHTML = "";
        faqList.forEach(faq => {


          if (faq.faqYn == 'Y') {
            faqContent.innerHTML +=
              `<tr>  
            <td>
              ${faq.faqId}
            </td>
            <td>
              ${faq.title}
            </td>
            <td>
              ${faq.content}
            </td>
            <td>
              노출
            </td>
            <td>
              <button class="updateBtn" value = "${faq.faqId}">
                노출 상태 변경
              </button>
            </td>
            <td>
              <button class="deleteBtn" value = "${faq.faqId}">
                삭제
              </button>
            </td>
          </tr>`;
          } else {
            `<tr>  
            <td>
              ${faq.faqId}
            </td>
            <td>
              ${faq.title}
            </td>
            <td>
              ${faq.content}
            </td>
            <td>
              비노출
            </td>
            <td>
              <button class="updateBtn" value = "${faq.faqId}">
                노출 상태 변경
              </button>
            </td>
            <td>
              <button class="deleteBtn" value = "${faq.faqId}">
                삭제
              </button>
            </td>
          </tr>`;
          }

          const deleteBtn = document.querySelectorAll(".deleteBtn");

          deleteBtn.forEach((button) => {
            button.addEventListener("click", () => {
              const faqId = button.value;

              const alarm = `${faqId}를 삭제 하시겠습니까?`;

              if (alarm) {
                fetch("/admin/faq?faqId=" + faqId, { method: "DELETE" })
                  .then(response => { if (response.ok) return response.text(); })
                  .then(result => {
                    if (result > 0) {
                      alert(`${faqId}를 삭제하였습니다. `);
                      location.reload();
                      listUp(1, sortSelect.value);
                    }
                  })
              }
            })
          })
        })
      })
  }

  sortSelect.addEventListener("change", () => {
    const key = sortSelect.value;

    listUp(1, key);
  })
});