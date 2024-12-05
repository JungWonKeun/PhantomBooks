const list = document.querySelector("#list");
let myChart; // 차트영역 전역변수 선언
let memberNo = 0; // memberNo 전역변수

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

/* 이름 클릭 시 로그아웃 */
const logout = document.querySelector(".adminName");

logout.addEventListener("click", () => {
  fetch("/admin/logout")
  .then(response => { if(response.ok) return response.text();})
  .then(result => { if(result == 1) window.location.href = "/";})
})


const listUp = (cp, sort, term, date) => {
  fetch("/admin/memberList?cp="+cp + "&sort="+sort + "&term=" +term +"&date=" + date)
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
    const countInactiveMembers = map.countInactiveMembers || 0;  // 6개월 이상 로그인 안한 회원이 없을때 0 반환하는 구문
    

    // console.log("로그인 6개월 이상 회원 수:", countInactiveMembers);

    // 현재 이용중인 회원 수
    const currentMembers = countMember - countDelFl;

    list.innerHTML = '';
    
    const sales = document.querySelector(".sales");
    sales.innerHTML = '';

    // "총 회원 수" 스타일 적용
    const div1 = document.createElement("div");

    const spanTitle = document.createElement("span");
    spanTitle.classList.add("sales-title");
    spanTitle.innerText = " 총 회원 수";

    const spanCount = document.createElement("span");
    spanCount.classList.add("sales-count");
    spanCount.innerText = countMember + "명";

    div1.appendChild(spanTitle);
    div1.appendChild(document.createElement("br")); 
    div1.appendChild(spanCount);

    sales.appendChild(div1);

    // "현재 이용 중인 회원 수" 스타일 적용
    const div2 = document.createElement("div");

    const spanCurrentTitle = document.createElement("span");
    spanCurrentTitle.classList.add("sales-title");
    spanCurrentTitle.innerText = "현재 이용 중인 회원 수";

    const spanCurrentCount = document.createElement("span");
    spanCurrentCount.classList.add("sales-count");
    spanCurrentCount.innerText = currentMembers + "명";

    div2.appendChild(spanCurrentTitle);
    div2.appendChild(document.createElement("br"));
    div2.appendChild(spanCurrentCount);

    sales.appendChild(div2);
    
   // "선택된 기준에 따른 회원 수" 스타일 적용
   const div3 = document.createElement("div");

   const spanSortTitle = document.createElement("span");
   spanSortTitle.classList.add("sales-title");

   const spanSortCount = document.createElement("span");
   spanSortCount.classList.add("sales-count");

   // sortSelect 값에 따라 다른 데이터 표시
   if (sort === "signUp") {
     spanSortTitle.innerText = "기간 중 가입 회원 수";
     spanSortCount.innerText = countMemberList + "명";
   } else if (sort === "delete") {
     spanSortTitle.innerText = "기간 중 탈퇴 회원 수";
     spanSortCount.innerText = countDelFl + "명";
   } else if (sort === "unlogin") {
     spanSortTitle.innerText = "로그인 6개월 이상 회원 수";
     spanSortCount.innerText = countInactiveMembers + "명";
   }
   
   div3.appendChild(spanSortTitle);
   div3.appendChild(document.createElement("br"));
   div3.appendChild(spanSortCount);

   sales.appendChild(div3);
    memberList.forEach(member => {
      
      // 감싸는 tr태그 생성
      const tr = document.createElement("tr"); 

      if(memberList.length == 0){
        td.colSpan = 5;
        td.innerText = "검색 결과가 없습니다."
        tr.appendChild(td);
      }else{

      const td1 = document.createElement("td");
      td1.append(member.memberNo);

      

      const td2 = document.createElement("td");
      td2.append(member.memberId);
     
      const td3 = document.createElement("td");
      td3.append(member.signupDate);

      const td4 = document.createElement("td");
      td4.append(member.loginDate);

      const td5 = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "ID삭제 처리";

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

              if(myChart !== null){
                myChart.destroy();
              }
            }
          })
          .catch(err => console.error(err));
        }else{
          alert("삭제가 취소되었습니다.");
        }
      })
      td5.append(deleteBtn);
      tr.append(td1, td2, td3, td4, td5);
      list.append(tr);

      

      // 아이디 클릭 시 사용자 정보 보이기
      tr.addEventListener("click", () => {
        const graph = document.querySelector(".graph");
        graph.classList.add("hidden");

        const memberList = document.querySelector(".memberList");
        memberList.classList.add("hidden");

        const popup = document.querySelector(".pop-up");
        popup.classList.remove("hidden");

        const close = document.querySelector("#close");
        close.addEventListener("click", () => {
        console.log("버튼 클릭 됨");
        memberList.classList.remove("hidden");
        graph.classList.remove("hidden");
        popup.classList.add("hidden");
      })
      memberNo = member.memberNo;

      memberArea(memberNo);
      
      paymentArea(1, memberNo);
      
      reviewArea(1, memberNo);
      
      queryArea(1, memberNo);

      console.log("memberNo : ", memberNo) ;
    })
  }
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

/* 기간 정렬 기준*/
const termSelect = document.querySelector('.btn-container');
let term = '';

const week = document.querySelector(".weeks");
const month = document.querySelector(".month");
const sixMonth = document.querySelector(".sixMonth");
const dateSelect = document.querySelector(".dateSelect");
const date = document.querySelector(".date");

// 버튼 클릭 시 색 변경
const buttons = document.querySelectorAll(".btn-container > button");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
    
    if (!button.classList.contains("dateSelect")) {
      date.classList.add("hidden");
    }
  });
});

week.addEventListener("click", () => {
  term = "weeks";
  listUp(1, sortSelect.value, term);
  
  if(myChart != null){
    myChart.destroy()
  }

  chartData(1, sortSelect.value, term);
});
month.addEventListener("click", () => {
  term = "month";
  listUp(1, sortSelect.value, term);

  if(myChart != null){
    myChart.destroy()
  }
  
  chartData(1, sortSelect.value, term);

});
sixMonth.addEventListener("click", () => {
  term = "6month";
  listUp(1, sortSelect.value, term);

  if(myChart != null){
    myChart.destroy()
  }

  chartData(1, sortSelect.value, term);
});

dateSelect.addEventListener("click", () => {
  
  date.classList.remove('hidden');

  date.addEventListener("change", ()=>{

    term = "dateSelect";
    
    listUp(1, sortSelect.value, term, date.value);

    if(myChart != null){
      myChart.destroy()
    }

    chartData(1, sortSelect.value, term, date.value);

  })
});



const listName = document.querySelector("#listName");
const sortSelect = document.querySelector('#sortSelect');

sortSelect.addEventListener('change', () => {
  const selectedSort = sortSelect.value;

  term = '';

  buttons.forEach(button => button.classList.remove('active')); 
  date.value = '';
  date.classList.add('hidden');
  
  const salesTitle = document.querySelector('.sales-title');

  if (selectedSort === 'signUp') {
    listName.innerHTML = "가입 회원현황";
    salesTitle.innerText = "기간 중 가입 회원 수";
    termSelect.classList.remove('hidden');

    if(myChart != null){
      myChart.destroy()
    }
    
    chartData(1, sortSelect.value, term);
  } else if (selectedSort === 'delete') {
    listName.innerHTML = "탈퇴 회원";
    salesTitle.innerText = "기간 중 탈퇴 회원 수";
    termSelect.classList.add('hidden');

    if(myChart != null){
      myChart.destroy()
    }
    
    chartData(1, sortSelect.value, term);
  } else if (selectedSort === 'unlogin') {
    salesTitle.innerText = "로그인 6개월 이상 회원 수";
    listName.innerHTML = "로그인 6개월 이상";
    termSelect.classList.add('hidden');

    if(myChart != null){
      myChart.destroy()
    }
    
    chartData(1, sortSelect.value, term);
  }

  listUp(1, selectedSort, term.value, date.value)

  if(myChart != null){
    myChart.destroy()
  }

  chartData(1, sortSelect.value, term);
});

/**
 * 페이지네이션
 */
const paginationAddEvent = () => {
  const pagination = document.querySelectorAll('.pagination a');
  const pagination1 = document.querySelectorAll('.pagination1 a');
  const pagination2= document.querySelectorAll('.pagination2 a');
  const pagination3 = document.querySelectorAll('.pagination3 a');

  pagination.forEach(a => {
    a.addEventListener('click', (e) => {

      if(a.classList.contains('current')) return;
      
      const cp = e.target.dataset.page;
      listUp(cp, sortSelect.value, term);

    });
  });
  pagination1.forEach(a => {
    a.addEventListener('click', (e) => {

      if(a.classList.contains('current')) return;
      
      const cp = e.target.dataset.page;
      paymentArea(cp, memberNo);
    });
  });

  pagination2.forEach(a => {
    a.addEventListener('click', (e) => {

      if(a.classList.contains('current')) return;
      
      const cp = e.target.dataset.page;
      reviewArea(cp, memberNo);
    });
  });

  pagination3.forEach(a => {
    a.addEventListener('click', (e) => {

      if(a.classList.contains('current')) return;
      
      const cp = e.target.dataset.page;
      queryArea(cp, memberNo);
    });
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  listUp(1, sortSelect.value, termSelect.value);
  chartData(1, sortSelect.value, termSelect.value);
})

// 차트
const chartData = (cp, sort, term, date) => {
  let signUpDate = new Array();
  let memberCount = new Array();

  fetch("/admin/chartData?cp="+cp + "&sort="+sort + "&term=" +term +"&date=" + date)
  .then(response => {if(response.ok) return response.json();})
  .then(list => {if(!list.length == 0){
    
    // forEach로 list의 값을 newArray에 추가
    list.forEach(chart => {
      signUpDate.push(chart.signUpDate);
      memberCount.push(chart.countMember);
    });

    if(myChart != null){
      myChart.destroy()
    }
    
  // 차트 생성
    myChart = new Chart(document.getElementById("myChart").getContext('2d'), {
      type: 'line',
      data: {
          labels: signUpDate,
          datasets: [{
              label: '가입현황',
              data: memberCount,
              borderWidth: 2,
              borderColor: '#205375',
          }]
      },
      options: {
          scales: {
              x: {
                min : 0
              },
              y: {
                  beginAtZero: false
              }
            }
          }
        });
      } 
    })
}

// 회원 정보 불러오기
const memberArea = (memberNo) => {

  const memberInfo = document.querySelector("#memberInfo");
  memberInfo.innerHTML = "";

  fetch("admin/memberInfo?memberNo="+ memberNo)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("조회 실패");
  })
  .then(result => {
    console.log(result);

    const tr = document.createElement("tr");

    const th1 = document.createElement("th");
    th1.innerHTML = result.memberId;

    let memberId = result.memberId;

    const th2 = document.createElement("th");
    th2.innerHTML = result.totalPrice + "원";
    totalPrice = result.totalPrice;

    const th3 = document.createElement("th");
    th3.innerHTML = result.memberDelFl;

    const th4 = document.createElement("th");
    const select = document.createElement("select");
    
    const option1 = document.createElement("option");
    option1.innerHTML = "일반";
    const option2 = document.createElement("option");
    option2.innerHTML = "고오스";
    const option3 = document.createElement("option");
    option3.innerHTML = "고우스트";
    const option4 = document.createElement("option");
    option4.innerHTML = "팬텀";
    
    option1.value = '일반';
    option2.value = '고오스';
    option3.value = '고우스트';
    option4.value = '팬텀';
    
    select.append(option1, option2, option3, option4);
    select.value = result.rankName;
    th4.append(select);

    const th5 = document.createElement("th");

    const button1 = document.createElement("button");
    button1.innerHTML = "정보 수정";
    button1.classList.add("infoUpdateBtn");

    const button2 = document.createElement("button");
    button2.innerHTML = "삭제";
    button2.classList.add("infoDeleteBtn"); 

    button1.addEventListener("click", () => {
      fetch("/admin/memberUpdate", ({ 
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
          memberNo : memberNo,
          rankName : select.value
        })
        })
      )
      .then(response => {if(response.ok) return response.text();})
      .then(result => {if(result > 0) {
        alert(memberId + "정보를 수정하였습니다.");
        memberArea(memberNo);
      }
      })
    })

    button2.addEventListener("click", () =>{
      const alarm = confirm(result.memberId + "계정을 삭제하시겠습니까?");

      if(alarm){
        fetch("admin/delete", {
          method : "DELETE",
          headers : {"Content-Type" : "application/json"},
          body : memberNo
        })
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

    th5.append(button1, button2);

    tr.append(th1, th2, th3, th4, th5);

    memberInfo.append(tr);
  })
}

// 구매내역 불러오기
const paymentArea = (cp, memberNo) => {

  const payment = document.querySelector(".payment");
  const paymentList = document.querySelector("#payment");


  fetch("/admin/orderList?cp="+cp + "&memberNo="+ memberNo)
  .then(response => {if(response.ok) return response.json();})
  .then(map => {
    let allPrice = 0;

    const orderList = map.orderList;
    const pagination = map.pagination;
    payment.innerHTML = "";
    paymentList.innerHTML = "";
    
    orderList.forEach(order => {
      allPrice += order.totalPrice;


      const tr = document.createElement("tr");

      const th1 = document.createElement("th");
      th1.append(order.orderNo);

      const th2 = document.createElement("th");
      th2.innerHTML = `${order.bookTitle} 등 ${order.orderCount}권`;

      const th3 = document.createElement("th");
      th3.append(order.orderDate);

      const th4 = document.createElement("th");
      th4.append(order.totalPrice);

      tr.append(th1, th2, th3, th4);

      paymentList.append(tr);
    })

    payment.innerHTML = `구매내역`;
    

    // 페이지네이션 출력
    const pg1 = document.querySelector('.pagination1');
    pg1.innerHTML = '';
    
    // pagication 구조 분해
    const {startPage, endPage, currentPage, prevPage, nextPage, maxPage} = pagination;

    // 버튼 생성 + 화면 추가 함수
    const createPageBtn = (page, text) => {
      const a = document.createElement('a');
      a.textContent = text;
      a.dataset.page = page;

      if(!isNaN(Number(text)) &&  page == currentPage) a.classList.add('current');
      pg1.append(a);
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



// 리뷰 리스트 불러오기
const reviewArea = (cp, memberNo) => {

  const reviewContent = document.querySelector("#review");
  
  fetch("/admin/reviewList?cp="+ cp + "&memberNo="+ memberNo)
  .then(response => {if(response.ok) return response.json();})
  .then(map => {
    reviewContent.innerHTML = "";
    console.log(map);
    const reviewList = map.reviewList;
    const pagination = map.pagination;

    reviewList.forEach(review => {
      const tr = document.createElement("tr");

      const th1 = document.createElement("th");
      th1.append(review.reviewNo);
      const th2 = document.createElement("th");
      th2.innerHTML = review.bookTitle + "<br>(" + review.reviewScore + ")";
      const th3 = document.createElement("th");
      th3.append(review.reviewTitle);
      const th4 = document.createElement("th");
      th4.append(review.reviewContent);

      tr.append(th1, th2, th3, th4);

      reviewContent.append(tr);
    })

    // 페이지네이션 출력
    const pg2 = document.querySelector('.pagination2');
    pg2.innerHTML = '';
    
    // pagication 구조 분해
    const {startPage, endPage, currentPage, prevPage, nextPage, maxPage} = pagination;

    // 버튼 생성 + 화면 추가 함수
    const createPageBtn = (page, text) => {
      const a = document.createElement('a');
      a.textContent = text;
      a.dataset.page = page;

      if(!isNaN(Number(text)) &&  page == currentPage) a.classList.add('current');
      pg2.append(a);
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

// 문의 내역 불러오기
const queryArea = (cp, memberNo) => {

  const queryContent = document.querySelector("#query");
  
  fetch("/admin/queryList?cp="+cp +"&memberNo="+ memberNo)
  .then(response => {if(response.ok) return response.json()})
  .then(map => {
      console.log(map);
      queryContent.innerHTML = "";

    const queryList = map.queryList;
    const pagination = map.pagination;

    queryList.forEach(query => {
      const tr = document.createElement("tr");

      const th1 = document.createElement("th");
      th1.append(query.queryNo);

      const th2 = document.createElement("th");
      th2.append(query.querySubject);

      const th3 = document.createElement("th");
      th3.append(query.queryTitle);

      const th4 = document.createElement("th");
      th4.innerHTML =  query.queryContent;

      const th5 = document.createElement("th");
      th5.append(query.status);

      tr.append(th1, th2, th3, th4, th5);

      queryContent.append(tr);
    })
    // 페이지네이션 출력
    const pg3 = document.querySelector('.pagination3');
    pg3.innerHTML = '';
    
    // pagication 구조 분해
    const {startPage, endPage, currentPage, prevPage, nextPage, maxPage} = pagination;

    // 버튼 생성 + 화면 추가 함수
    const createPageBtn = (page, text) => {
      const a = document.createElement('a');
      a.textContent = text;
      a.dataset.page = page;

      if(!isNaN(Number(text)) &&  page == currentPage) a.classList.add('current');
      pg3.append(a);
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