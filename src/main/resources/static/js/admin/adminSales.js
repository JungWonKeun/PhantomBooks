const salesRank = document.querySelector("#salesRank");
let myChart;

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


const listUp = (cp, sort, term, date, text) => {

  salesRank.innerHTML = '';

  fetch("/admin/sales/salesList?cp=" + cp + "&sort=" + sort + "&term=" + term + "&date=" + date + "&text=" + text)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("조회실패");
    })
    .then(map => {
      console.log(map);

      const pagination = map.pagination;
      const salesList = map.salesList;

      const formatPrice = (price) => {
        return price.toLocaleString();
      };

      // 천 단위 콤마 추가 함수
    

      salesList.forEach(sales => {

        const tr = document.createElement("tr");

        const th1 = document.createElement("td");
        th1.append(sales.bookNo);

        const th2 = document.createElement("td");
        th2.append(sales.bookTitle);

        const th4 = document.createElement("td");
        th4.append(sales.bookCount);

        const th5 = document.createElement("td");
        th5.append(formatPrice(sales.orderPrice));

        tr.append(th1, th2, th4, th5);

        salesRank.append(tr);
      })
      const sales = document.querySelector(".sales");

      /*  금액에 천 단위로 콤마를 추가 */ 
      
      sales.innerHTML = '';

      /* 글씨 css 다르게 적용하기 위해 추가로 작성함 */
      // 첫 번째 정보 div 생성
      const div1 = document.createElement("div");

      const spanSalesTitle = document.createElement("span");
      spanSalesTitle.classList.add("sales-title");
      spanSalesTitle.innerText = "기간 내 판매 금액";

      const spanSalesCount = document.createElement("span");
      spanSalesCount.classList.add("sales-count");
      spanSalesCount.innerText = formatPrice(map.totalOrderPrice) + " 원";

      div1.appendChild(spanSalesTitle);
      div1.appendChild(document.createElement("br"));
      div1.appendChild(spanSalesCount);

      sales.appendChild(div1);

      // 두 번째 정보 div 생성
      const div2 = document.createElement("div");

      const spanRequestTitle = document.createElement("span");
      spanRequestTitle.classList.add("sales-title");
      spanRequestTitle.innerText = "기간 내 발주 금액";

      const spanRequestCount = document.createElement("span");
      spanRequestCount.classList.add("sales-count");
      spanRequestCount.innerText = formatPrice(map.totalRequestPrice) + " 원";

      div2.appendChild(spanRequestTitle);
      div2.appendChild(document.createElement("br"));
      div2.appendChild(spanRequestCount);

      sales.appendChild(div2);

      // 세 번째 정보 div 생성
      const div3 = document.createElement("div");

      const spanProfitTitle = document.createElement("span");
      spanProfitTitle.classList.add("sales-title");
      spanProfitTitle.innerText = "순수익";

      const spanProfitCount = document.createElement("span");
      spanProfitCount.classList.add("sales-count");
      spanProfitCount.innerText = formatPrice(map.salesPrice) + " 원";

      div3.appendChild(spanProfitTitle);
      div3.appendChild(document.createElement("br"));
      div3.appendChild(spanProfitCount);

      sales.appendChild(div3);

      // 페이지네이션 출력
      const pg = document.querySelector('.pagination');
      pg.innerHTML = '';

      // pagication 구조 분해
      const { startPage, endPage, currentPage, prevPage, nextPage, maxPage } = pagination;

      // 버튼 생성 + 화면 추가 함수
      const createPageBtn = (page, text) => {
        const a = document.createElement('a');
        a.textContent = text;
        a.dataset.page = page;

        if (!isNaN(Number(text)) && page == currentPage) a.classList.add('current');
        pg.append(a);
      }

      createPageBtn(1, '처음');
      createPageBtn(prevPage, '이전');

      for (let i = startPage; i <= endPage; i++) {
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


  chartData(1, sortSelect.value, term);
});
month.addEventListener("click", () => {
  term = "month";
  listUp(1, sortSelect.value, term);

  chartData(1, sortSelect.value, term);
});
sixMonth.addEventListener("click", () => {
  term = "6month";

  chartData(1, sortSelect.value, term);

  listUp(1, sortSelect.value, term);
});

dateSelect.addEventListener("click", () => {

  date.classList.remove('hidden');

  date.addEventListener("change", () => {

    term = "dateSelect";

    chartData(1, sortSelect.value, term, date.value);

    listUp(1, sortSelect.value, term, date.value);
  })
});


const sortSelect = document.querySelector('#sortSelect');
const searchText = document.querySelector(".text");

let text = '';

sortSelect.addEventListener("change", () => {
  const selectedSort = sortSelect.value;

  term = '';

  buttons.forEach(button => button.classList.remove('active'));
  searchText.value = '';
  searchText.classList.add('hidden');

  if (selectedSort === 'sales') {
    termSelect.classList.remove('hidden');
    searchText.classList.add("hidden");

    chartData(1, selectedSort, termSelect.value, date.value);

    listUp(1, selectedSort, term.value, date.value);
  } else {
    termSelect.classList.add('hidden');
    searchText.classList.remove("hidden");

    // searchText.addEventListener("input", () => {

    //   text = searchText.value;

    //   listUp(1, selectedSort, term.value, date.value, text);

    // })
    // const searchBtn = document.querySelector("#searchBtn");

    // searchBtn.addEventListener("click", () => {
    //   if(myChart !== null){
    //     myChart.destroy();
    //   }

    //   chartData(1, selectedSort, term.value, date.value, text);
    // })
  }
});

searchText.addEventListener("input", () => {
  const selectedSort = sortSelect.value;
  text = searchText.value;

  listUp(1, selectedSort, term.value, date.value, text);

})

const searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", () => {

  const selectedSort = sortSelect.value;
  chartData(1, selectedSort, term.value, date.value, text);
})


/**
 * 페이지네이션
 */
const paginationAddEvent = () => {
  const pagination = document.querySelectorAll('.pagination a');

  pagination.forEach(a => {
    a.addEventListener('click', (e) => {

      if (a.classList.contains('current')) return;

      const cp = e.target.dataset.page;
      listUp(cp, sortSelect.value, termSelect.value, dateSelect.value, searchText.value);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  listUp(1, sortSelect.value, termSelect.value);
  chartData(1, sortSelect.value, termSelect.value);
})


const chartData = (cp, sort, term, date, text) => {

  let orderDate = new Array();
  let orderCount = new Array();
  let orderPrice = new Array();
  let requestPrice = new Array();

  fetch("/admin/sales/chartData?cp=" + cp + "&sort=" + sort + "&term=" + term + "&date=" + date + "&text=" + text)
    .then(response => { if (response.ok) return response.json(); })
    .then(list => {
      if (Array.isArray(list) && list.length != 0) {
        console.log(list);

        if (myChart != null) {
          myChart.destroy();
        }
        // forEach로 list의 값을 newArray에 추가
        list.forEach(chart => {
          orderDate.push(chart.orderDate);
          orderCount.push(chart.orderCount);
          orderPrice.push(chart.orderPrice);
          requestPrice.push(chart.requestPrice);
        });
        console.log(orderDate);
        console.log(orderCount);
        console.log(orderPrice);
        console.log(requestPrice);


        myChart = new Chart(document.querySelector("#myChart").getContext('2d'), {
          type: 'bar', // 기본 차트 유형
          data: {
            labels: orderDate, // X축 (시간 데이터)
            datasets: [
              {
                label: '판매 금액', // 첫 번째 데이터 세트
                yAxisID: 'y1',
                data: orderPrice, // Y축 값
                backgroundColor: 'rgba(255, 99, 132, 0.5)', // 막대 색상
                borderColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1,
                type: 'bar', // 막대형 차트
              },
              {
                label: '발주 금액', // 첫 번째 데이터 세트
                yAxisID: 'y1',
                data: requestPrice, // Y축 값
                backgroundColor: 'rgba(54, 162, 235, 0.5)', // 막대 색상
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                type: 'bar', // 막대형 차트
              },
              {
                label: '판매 수량', // 두 번째 데이터 세트
                yAxisID: 'y2',
                data: orderCount, // Y축 값
                borderColor: '#205375',
                type: 'line', // 선형 차트
                fill: false, // 선만 표시
                tension: 0.4, // 곡선 정도
              }
            ]
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: '기간',
                }
              },
              y1: {
                type: 'linear',
                position: 'left',
                title: {
                  display: true,
                  text: '금액(원)',
                }
              },
              y2: {
                type: 'linear',
                position: 'right',
                title: {
                  display: true,
                  text: '수량(개)',
                },
                grid: {
                  drawOnChartArea: false, // Y2 그리드 비활성화
                }
              }
            }
          }
        });
      }
    })

}
