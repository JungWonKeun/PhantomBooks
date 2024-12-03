const salesRank = document.querySelector("#salesRank");
let myChart;

/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});

const sort = document.querySelector("#sortSelect");

const listUp = (cp, sort, term, date, text) => {
  fetch("/admin/sales/salesList?cp="+cp+"&sort="+sort + "&term="+term+"&date="+date + "&text=" +text)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("조회실패");
  })
  .then(map => {
    console.log(map);

    const pagination = map.pagination;
    const salesList = map.salesList;
    const chartData = map.chartData;
    salesRank.innerHTML = '';

    let orderDate = new Array();
    let orderCount = new Array();
    let orderPrice = new Array();
    let requestPrice = new Array();
    
    // forEach로 list의 값을 newArray에 추가
    chartData.forEach(chart => {
      orderDate.push(chart.orderDate);
      orderCount.push(chart.orderCount);
      orderPrice.push(chart.orderPrice);
      requestPrice.push(chart.requestPrice);
    });

    myChart = new Chart(document.querySelector("#myChart").getContext('2d'), {
      type: 'bar', // 기본 차트 유형
      data: {
        labels: orderDate, // X축 (시간 데이터)
        datasets: [
          {
            label: '판매 금액', // 첫 번째 데이터 세트
            yAxisID : 'y1',
            data: orderPrice, // Y축 값
            backgroundColor: 'rgba(54, 162, 235, 0.5)', // 막대 색상
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            type: 'bar', // 막대형 차트
          },
          {
            label: '발주 금액', // 첫 번째 데이터 세트
            yAxisID : 'y1',
            data: requestPrice, // Y축 값
            backgroundColor: 'rgba(54, 162, 235, 0.5)', // 막대 색상
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            type: 'bar', // 막대형 차트
          },
          {
            label: '판매 수량', // 두 번째 데이터 세트
            yAxisID : 'y2',
            data: orderCount, // Y축 값
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
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

    salesList.forEach(sales => {

      const tr = document.createElement("tr");

      const th1 = document.createElement("th");
      th1.append(sales.bookNo);

      const th2 = document.createElement("th");
      th2.append(sales.bookTitle);

      const th4 = document.createElement("th");
      th4.append(sales.bookCount);

      const th5 = document.createElement("th");
      th5.append(sales.orderPrice);

      tr.append(th1, th2, th4, th5);
      
      salesRank.append(tr);
    })
    const sales = document.querySelector(".sales");

      sales.innerHTML = '';

      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      const div3 = document.createElement("div");
      
      div1.innerHTML = "기간 내 판매 금액 : " + map.totalOrderPrice +"원";
      div2.innerHTML = "기간 내 발주금액 : "  + map.totalRequestPrice + "원";
      div3.innerHTML = "순 수익 : " + map.salesPrice + "원";

      sales.appendChild(div1);
      sales.appendChild(div2);
      sales.appendChild(div3);

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
  
  if(myChart !== null){
    myChart.destroy();
  }

  listUp(1, sortSelect.value, term);
});
month.addEventListener("click", () => {
  term = "month";
  
  if(myChart !== null){
    myChart.destroy();
  }
  
  listUp(1, sortSelect.value, term);
});
sixMonth.addEventListener("click", () => {
  term = "6month";

  if(myChart !== null){
    myChart.destroy();
  }

  listUp(1, sortSelect.value, term);
});

dateSelect.addEventListener("click", () => {
  
  date.classList.remove('hidden');

  date.addEventListener("change", ()=>{

    term = "dateSelect";
    
    if(myChart !== null){
      myChart.destroy();
    }

    listUp(1, sortSelect.value, term, date.value);
  })
});


const sortSelect = document.querySelector('#sortSelect');
const text = document.querySelector(".text");

sortSelect.addEventListener('change', () => {
  const selectedSort = sortSelect.value;

  term = '';

  buttons.forEach(button => button.classList.remove('active')); 
  date.value = '';
  date.classList.add('hidden');

  if (selectedSort === 'sales') {
    termSelect.classList.remove('hidden');
    text.classList.add("hidden");
  } else if (selectedSort === 'company') {
    termSelect.classList.add('hidden');
    text.classList.remove("hidden");
  }

  if(myChart !== null){
    myChart.destroy();
  }

  listUp(1, selectedSort, term.value, date.value, text.value);
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

document.addEventListener("DOMContentLoaded", () => {
  listUp(1, sortSelect.value, termSelect.value);
})
