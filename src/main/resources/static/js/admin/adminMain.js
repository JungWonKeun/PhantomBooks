const list = document.querySelector("#list");
let myChart; // 차트영역 전역변수 선언

/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});


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
    const chartData = map.chartData;
    
    
    
    let signUpDate = new Array();
    let memberCount = new Array();
    
    // forEach로 list의 값을 newArray에 추가
    chartData.forEach(chart => {
      signUpDate.push(chart.signUpDate);
      memberCount.push(chart.countMember);
    });
    
    
    // 차트

    // 차트 생성
    myChart = new Chart(document.getElementById("myChart").getContext('2d'), {
      type: 'line',
        data: {
            labels: signUpDate,
            datasets: [{
                label: '가입현황',
                data: memberCount,
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     'rgba(54, 162, 235, 0.2)',
                //     'rgba(255, 206, 86, 0.2)',
                //     'rgba(75, 192, 192, 0.2)',
                //     'rgba(153, 102, 255, 0.2)',
                //     'rgba(255, 159, 64, 0.2)'
                // ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


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

      // 아이디 클릭 시 사용자 정보 보이기
      td2.addEventListener("click", () => {
        const popup = document.querySelector(".pop-up");
      })

      const td3 = document.createElement("td");
      td3.append(member.signupDate);

      const td4 = document.createElement("td");
      td4.append(member.loginDate);

      const td5 = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "ID삭제 처리";

      td5.append(deleteBtn);

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
     
      tr.append(td1, td2, td3, td4, td5);
    }
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
  
  if(myChart !== null){
    myChart.destroy();
  }
});
month.addEventListener("click", () => {
  term = "month";
  listUp(1, sortSelect.value, term);

  if(myChart !== null){
    myChart.destroy();
  }
});
sixMonth.addEventListener("click", () => {
  term = "6month";
  listUp(1, sortSelect.value, term);

  if(myChart !== null){
    myChart.destroy();
  }
});

dateSelect.addEventListener("click", () => {
  
  date.classList.remove('hidden');

  date.addEventListener("change", ()=>{

    term = "dateSelect";
    
    listUp(1, sortSelect.value, term, date.value);

    if(myChart !== null){
      myChart.destroy();
    }
  })
});



const sortSelect = document.querySelector('#sortSelect');
const listName = document.querySelector("#listName");

sortSelect.addEventListener('change', () => {
  const selectedSort = sortSelect.value;

  term = '';

  buttons.forEach(button => button.classList.remove('active')); 
  date.value = '';
  date.classList.add('hidden');


  if (selectedSort === 'signUp') {
    listName.innerHTML = "가입 회원현황";
    termSelect.classList.remove('hidden');
  } else if (selectedSort === 'delete') {
    listName.innerHTML = "탈퇴 회원";
    termSelect.classList.add('hidden');
  } else if (selectedSort === 'unlogin') {
    listName.innerHTML = "로그인 6개월 이상";
    termSelect.classList.add('hidden');
  }

  if(myChart !== null){
    myChart.destroy();
  }

  listUp(1, selectedSort, term.value, date.value)
    .then(() => {
      const salesTitle = document.querySelector('.sales-title');
      const salesCount = document.querySelector('.sales-count');

      if (selectedSort === 'signUp') {
        salesTitle.innerText = "기간 중 가입 회원 수";
      } else if (selectedSort === 'delete') {
        salesTitle.innerText = "기간 중 탈퇴 회원 수";
      } else if (selectedSort === 'unlogin') {
        salesTitle.innerText = "로그인 6개월 이상 회원 수";
      }
    });
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
      listUp(cp, sortSelect.value, term);

      if(myChart !== null){
        myChart.destroy();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  listUp(1, sortSelect.value, termSelect.value);
})