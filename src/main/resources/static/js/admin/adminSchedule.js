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


document.addEventListener("DOMContentLoaded", () => {
    let calendarTag = document.querySelector('#calendar'); // HTML 요소 ID가 'calendar'인 태그를 가져옴
    let calendar = new FullCalendar.Calendar(calendarTag, {
        height: '550px', // 캘린더 높이 설정
        expandRows: true, // 화면 크기에 맞게 캘린더 높이를 자동 조정
        slotMinTime: '00:00', // Day 뷰에서의 시작 시간
        slotMaxTime: '23:59', // Day 뷰에서의 종료 시간

        customButtons: { // 사용자 정의 버튼 추가
            testButton: {
                text: "테스트버튼" // 버튼에 표시할 텍스트
            }
        },

        // 캘린더 상단에 표시할 툴바 설정
        headerToolbar: {
            left: 'prevYear,prev,next,nextYear today', // 왼쪽 영역에 표시할 버튼들
            center: 'title', // 중앙에는 캘린더 제목 표시
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek' // 오른쪽 영역에 표시할 버튼들
        },

        initialView: 'dayGridMonth', // 초기 로드 시 보여질 기본 뷰
        navLinks: true, // 날짜 클릭 시 Day 또는 Week 뷰로 이동 가능하게 함
        editable: true, // 이벤트 드래그/수정 가능 여부
        selectable: true, // 날짜를 드래그하여 선택할 수 있는 기능 활성화
        nowIndicator: true, // 현재 시간 표시
        dayMaxEvents: true, // 하루에 이벤트가 많으면 "+X"로 표시

        locale: 'ko', // 캘린더를 한국어로 설정

        // 이벤트 추가 시 실행되는 콜백 함수
        eventAdd: function (obj) {
            console.log("eventAdd : " + obj);
        },

        // 이벤트 변경 시 실행되는 콜백 함수
        eventChange: function (obj) {
            console.log("eventChange : " + obj);
        },

        // 이벤트 삭제 시 실행되는 콜백 함수
        eventRemove: function (obj) {
            console.log("eventRemove : " + obj);
        },

        // 날짜를 드래그하여 선택하면 실행되는 함수
        select: function (arg) {
            let title = prompt('일정 입력'); // 일정 이름을 입력받음
            if (title) {
                let newData = {
                    title: title,
                    startDate: arg.start,
                    endDate: arg.end,
                    allDay: arg.allDay
                };

                // 새로운 일정을 서버에 저장
                fetch("/admin/schedule/calendarSave", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newData)
                })
                .then(response => {
                    if (!response.ok) throw new Error("일정 저장 실패");
                    return response.json();
                })
                .then(data => {
                    if (data) {
                        calendar.addEvent({
                            id: data.calendarNo, // 서버에서 받은 ID
                            title: data.title,
                            start: data.startDate,
                            end: data.endDate,
                            allDay: data.allDay,
                            editable: true // 이벤트 수정 가능 여부

                        });
                    }
                    console.log(data);
                })
                .catch(error => console.error("Error:", error));
            }
            calendar.unselect(); // 선택 해제
        },

        // 일정 클릭 시 실행되는 함수
        eventClick: function (arg) {
            if (confirm("선택한 일정을 삭제하시겠습니까?")) {
                // 서버에 일정 삭제 요청
                fetch(`/admin/schedule/calendarDelete?no=${arg.event.id}`, {
                    method: "DELETE"
                })
                .then(response => {
                    if (!response.ok) throw new Error("삭제 실패");
                    return response.text();
                })
                .then(data => {
                    if (data === "success") {
                        alert("삭제하였습니다.");
                        arg.event.remove(); // 화면에서 일정 제거
                    } else {
                        alert("오류가 발생하였습니다");
                    }
                })
                .catch(error => console.error("Error:", error));
            }
        },

        // 일정 드래그로 날짜 이동 시 실행되는 함수
        eventDrop: function (arg) {
            let event = {
                id: arg.event.calendarNo,
                title: arg.event.title,
                startDate: arg.event.start,
                endDate: arg.event.end,
                allDay: arg.event.allDay
            };
            console.log(event);
            // 수정된 일정 정보를 서버에 저장
            fetch(`/admin/schedule/eventUpdate?no=${arg.event.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(event)
            })
            .catch(error => console.error("Error:", error));
        },

        // 일정 크기 변경 시 실행되는 함수
        eventResize: function (arg) {
            let event = {
                id: arg.event.calendarNo,
                title: arg.event.title,
                startDate: arg.event.start,
                endDate: arg.event.end,
                allDay: arg.event.allDay
            };
            console.log(event);
            // 수정된 일정 정보를 서버에 저장
            fetch(`/admin/schedule/eventUpdate/${arg.event.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(event)
            })
            .catch(error => console.error("Error:", error));
        },

        // 초기 이벤트 데이터 로드
        events: function(fetchInfo, successCallback, failureCallback) {
            fetch("/admin/schedule/calendarList")
            .then(response => {
                if (!response.ok) throw new Error("이벤트 로드 실패");
                return response.json();
            })
            .then(data => {
                if (data != null) {
                    let events = data.map(item => ({
                        id: item.calendarNo,
                        title: item.title,
                        start: item.startDate,
                        end: item.endDate,
                        allDay: item.allDay,
                        editable: true
                    }));
                    successCallback(events);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                failureCallback(error);
            });
        }
    });

    // 캘린더 렌더링
    calendar.render();
});


  

  
