// 채팅에 사용될 SockJS 객체를 저장할 변수
let chattingSock;

// 로그인이 되어있을 경우
if(notificationLoginCheck){
  
  chattingSock = new SockJS("/chattingSock");
}

/* 채팅 메시지를 보내는 함수 */
const sendMessage = () => {

  // 채팅 입력 textarea
  const inputChatting = document.querySelector("#inputChatting");
  const msg = inputChatting.value.trim(); // 입력된 채팅 메시지

  // 로그인이 되어있지 않으면 함수 종료
  if(!notificationLoginCheck) return;

  if(msg.length === 0){ // 채팅 미입력
    alert("채팅을 입력해 주세요");
    return;
  }

  // 웹소켓 핸들러로 전달할 채팅 관련 데이터를 담은 객체 생성
  const chattingObj = {
    "targetNo" : selectTargetNo,    // 메시지를 받을 대상의 회원 번호(웹소켓)
    "messageContent" : msg,         // 전달할 메시지 내용
    "chattingRoomNo" : selectChattingNo // 채팅방 번호(DB 저장용도)
  }

  // JSON으로 변환하여 웹소켓 핸들러로 전달
  chattingSock.send( JSON.stringify(chattingObj) );

  inputChatting.value = ""; // 보낸 채팅 내용 삭제

  selectChattingFn(); // 메시지 목록을 다시 조회
}

// -----------------------------------------------------------------------------------------


/* 연결된 웹소켓 객체를 통해 서버로 부터 메시지를 전달 받은 경우 */
if(chattingSock != undefined){

  chattingSock.addEventListener("message", e => {
    console.log(e.data);

    // 메소드를 통해 전달받은 JSON을 JS Object로 변환해서 msg 변수에 저장.
    const msg = JSON.parse(e.data); 
    console.log(msg);


    // 현재 채팅방을 보고있는 경우
    if(selectChattingNo == msg.chattingRoomNo){


      const ul = document.querySelector(".display-chatting");
    
      // 메세지 만들어서 출력하기
      //<li>,  <li class="my-chat">
      const li = document.createElement("li");
    
      // 보낸 시간
      const span = document.createElement("span");
      span.classList.add("chatDate");
      span.innerText = msg.sendTime;
    
      // 메세지 내용
      const p = document.createElement("p");
      p.classList.add("chat");
      p.innerHTML = msg.messageContent; // br태그 해석을 위해 innerHTML
    
      // 내가 작성한 메세지인 경우
      if(loginMemberNo == msg.senderNo){ 
        li.classList.add("my-chat");
        
        li.append(span, p);
        
      }else{ // 상대가 작성한 메세지인 경우
        li.classList.add("target-chat");
    
        // 상대 프로필
        const div = document.createElement("div");
    
        // 상대 이름
        const b = document.createElement("b");
        b.innerText = selectTargetName; // 전역변수
    
        const br = document.createElement("br");
    
        div.append(b, br, p, span);
        li.append(div);
    
      }
    
      ul.append(li)
      ul.scrollTop = ul.scrollHeight; // 스크롤 제일 밑으로
    }

    selectChattingFn();

  })
}




/// ------------------------------------------------------
let selectChattingNo; // 선택한 채팅방 번호
let selectTargetNo; // 현재 채팅 대상
let selectTargetName; // 대상의 이름
let selectTargetProfile; // 대상의 프로필


/* 사용자 검색 팝업레이어 열기 */

 // 추가버튼
const addTarget = document.querySelector("#addTarget");

// 팝업 레이어
const addTargetPopupLayer
 = document.querySelector("#addTargetPopupLayer"); 

 // 팝업 닫기
 const closeBtn = document.querySelector("#closeBtn"); 

 // 검색창
 const targetInput = document.querySelector("#targetInput"); 

 // 검색 결과 목록
 const resultArea = document.querySelector("#resultArea"); 

 const chattingArea = document.querySelector(".chatting-area");

 const chattingContent = document.querySelector(".chatting-content");

 const back = document.querySelector("#back");

  back.classList.remove("hidden");

back.addEventListener("click", () => {

  chattingContent.classList.add("hidden");
  chattingArea.classList.remove("hidden");
  targetInput.classList.add("hidden");
  addTargetPopupLayer.classList.remove("hidden");
  addTarget.classList.remove("hidden");
})


// 추가버튼 클릭 시
addTarget.addEventListener("click", () => {
 addTargetPopupLayer.classList.remove("hidden");
 targetInput.classList.remove("hidden");
 targetInput.focus();
});

// 닫기(X) 버튼 클릭 시
closeBtn.addEventListener("click", () => {
  addTargetPopupLayer.classList.add("hidden");
  resultArea.innerHTML = ""; // 검색 목록 내용 지우기
});

// 사용자 검색(AJAX)
targetInput.addEventListener("input", () => {
  
  // 입력된 값(공백 제거)
  const query = targetInput.value.trim();

  chattingArea.classList.add("hidden");
  chattingContent.classList.add("hidden");
  
  // 입력된 값이 없을 경우
  if(query.length === 0){ 
    resultArea.innerHTML = ""; // 검색 결과 목록 삭제
    return;
  }

  // 입력된 값이 있을 경우
  fetch("/admin/chatting/selectTarget?query="+query)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("검색 실패");
  })
  .then(list => {
    console.log(list);

    resultArea.innerHTML = ""; // 이전 검색 결과 비우기

    if (list.length == 0) {
      const li = document.createElement("li");
      li.classList.add("result-row");
      li.innerText = "일치하는 회원이 없습니다";
      resultArea.append(li);
      return;
    }

    for (let member of list) {
      // li요소 생성(한 행을 감싸는 요소)
      const li = document.createElement("li");
      li.classList.add("result-row");
      li.setAttribute("data-id", member.memberNo);

      let nickname = member.adminName;
      let email = member.adminEmail;

      const span = document.createElement("span");
      span.innerHTML = `${nickname}`.replace(query, `<mark>${query}</mark>`);

      // 요소 조립(화면에 추가)
      li.append(span);
      resultArea.append(li);

      // 클릭 시 채팅방 입장 함수 호출
      li.addEventListener("click", chattingEnter);
    }
    
  })
  .catch(err => console.error(err));
});

/**
 * 채팅방 입장
 * @param e : 이벤트 객체
 */
const chattingEnter = (e) => {
  addTargetPopupLayer.classList.add("hidden");
  targetInput.classList.add("hidden");
  // e.crrentTarget : 이벤트 리스너가 설정된 요소

  // data-id 값을 얻어와 저장(참여자 회원 번호)
  const targetNo = e.currentTarget.dataset.id;
  // console.log(targetNo);
  
  chattingArea.classList.add("hidden");
  chattingContent.classList.remove("hidden");
  
  fetch("/admin/chatting/enter", {
    method : "POST",
    headers : {"Content-Type": "application/json"},
    body : targetNo 
  })
  .then(response => {
    if(response.ok) return response.text();
    throw new Error("실패");
  })
  .then(chattingNo => {
    // 입장한 채팅방 번호
    console.log(chattingNo);
    selectRoomList(); // 비동기로 채팅방 목록 조회
    
    setTimeout(() => {
      // 입장하려던 채팅방이 이미
      // 채팅방 목록에 존재하는 경우
      
      // 1) 채팅방 목록 li 태그 얻어오기
      const itemList = document.querySelectorAll(".chatting-item");
      
      // 2) li 태그의 "chat-no" 값과
      //   입장하려는 방번호(chattingNo)가 같은 경우
      //   == 입장하려는 방이 채팅방 목록에 존재하는 경우
      for(let item of itemList){
        if(item.getAttribute("chat-no") == chattingNo){
          item.focus();
          item.click(); // 클릭 -> selectChattingFn() 호출됨
          
          // 검색창 닫기
          addTargetPopupLayer.classList.add("hidden"); 
          
          // 검색창 내용 비우기
          targetInput.value = "";
          resultArea.innerHTML = "";
          return;
        }
        
      }
      
    }, 300);
  })
  .catch(err => console.error(err));
  
}


// -----------------------------------------------
// 비동기로 채팅방 목록 조회
const selectRoomList = () => {

  const chattingContent = document.querySelector(".chatting-content");
  chattingContent.classList.add("hidden");

	fetch("/admin/chatting/roomList")
	.then(resp => resp.json())
	.then(roomList => {
		console.log(roomList);

		// 채팅방 목록 출력 영역 선택
		const chattingList = document.querySelector(".chatting-list");

		// 채팅방 목록 지우기
		chattingList.innerHTML = "";

		// 조회한 채팅방 목록을 화면에 추가
		for(let room of roomList){
			const li = document.createElement("li");
			li.classList.add("chatting-item");
			li.setAttribute("chat-no", room.chattingRoomNo);
			li.setAttribute("target-no", room.targetNo);

			if(room.chattingRoomNo == selectChattingNo){
				li.classList.add("select");
			}


			// item-body 부분
			const itemBody = document.createElement("div");
			itemBody.classList.add("item-body");

			const p = document.createElement("p");

			const targetName = document.createElement("span");
			targetName.classList.add("target-name");
			targetName.innerText = room.targetNickname;
     
			
			const recentSendTime = document.createElement("span");
			recentSendTime.classList.add("recent-send-time");
			recentSendTime.innerText = room.sendTime;
			
			
			p.append(targetName, recentSendTime);
			
			
			const div = document.createElement("div");
			
			const recentMessage = document.createElement("p");
			recentMessage.classList.add("recent-message");

			if(room.lastMessage != undefined){
				recentMessage.innerHTML = room.lastMessage;
			}
			
			div.append(recentMessage);

			itemBody.append(p,div);

			// 현재 채팅방을 보고있는게 아니고 읽지 않은 개수가 0개 이상인 경우 -> 읽지 않은 메세지 개수 출력
			if(room.notReadCount > 0 && room.chattingRoomNo != selectChattingNo ){
				const notReadCount = document.createElement("p");
				notReadCount.classList.add("not-read-count");
				notReadCount.innerText = room.notReadCount;
				div.append(notReadCount);
			} else if(selectChattingNo !== undefined 
        && room.chattingRoomNo == selectChattingNo){

				// 현재 채팅방을 보고있는 경우
				// 비동기로 해당 채팅방 글을 읽음으로 표시
				fetch("/admin/chatting/updateReadFlag",{
					method : "PUT",
					headers : {"Content-Type": "application/json"},
					body : selectChattingNo
				})
				.then(resp => resp.text())
				.then(result => console.log(result))
				.catch(err => console.log(err));

			}
			

			li.append(itemBody);
			chattingList.append(li);
		}

		roomListAddEvent();
	})
	.catch(err => console.log(err));
}


// ------------------------------------

// 채팅방 목록에 이벤트를 추가하는 함수 
const roomListAddEvent = () => {
	const chattingItemList = document.getElementsByClassName("chatting-item");
	
	for(let item of chattingItemList){
    item.addEventListener("click", e => {
      // 추가버튼 삭제
      const addTarget = document.querySelector("#addTarget");
      addTarget.classList.add("hidden");

      const chattingContent = document.querySelector(".chatting-content");
      chattingContent.classList.remove("hidden");

      
			// 전역변수에 채팅방 번호, 상대 번호, 상태 프로필, 상대 이름 저장
			selectChattingNo = item.getAttribute("chat-no");
			selectTargetNo = item.getAttribute("target-no");

      console.log(item.children[0].children[0].children[0]);
      selectTargetName = item.children[0].children[0].children[0].innerText;

			if(item.children[0].children[0].children[0] != undefined){
				item.children[0].children[0].children[0].remove();
			}
	
			// 모든 채팅방에서 select 클래스를 제거
			for(let it of chattingItemList) it.classList.remove("select")
	
			// 현재 클릭한 채팅방에 select 클래스 추가
			item.classList.add("select");
	
			// 비동기로 메세지 목록을 조회하는 함수 호출
			selectChattingFn();
		});
	}
}


// --------------------------------------------------------------
// 비동기로 메세지 목록을 조회하는 함수
const selectChattingFn = () => {

	fetch(`/admin/chatting/selectMessage?chattingNo=${selectChattingNo}`)
	.then(resp => resp.json())
	.then(messageList => {
		console.log(messageList);

		// <ul class="display-chatting">
		const ul = document.querySelector(".display-chatting");

		if(ul){
            ul.innerHTML = "";
            chattingArea.classList.add("hidden");
            chattingContent.classList.remove("hidden");
        }else{
            return;
        }

		// 메세지 만들어서 출력하기
		for(let msg of messageList){
			//<li>,  <li class="my-chat">
			const li = document.createElement("li");

			// 보낸 시간
			const span = document.createElement("span");
			span.classList.add("chatDate");
			span.innerText = msg.sendTime;

			// 메세지 내용
			const p = document.createElement("p");
			p.classList.add("chat");
			p.innerHTML = msg.messageContent; // br태그 해석을 위해 innerHTML

			// 내가 작성한 메세지인 경우
			if(loginMemberNo == msg.senderNo){ 
				li.classList.add("my-chat");
				
				li.append(span, p);
				
			}else{ // 상대가 작성한 메세지인 경우
				li.classList.add("target-chat");

				const div = document.createElement("div");

				// 상대 이름
				const b = document.createElement("b");
				b.innerText = selectTargetName; // 전역변수

				const br = document.createElement("br");

				div.append(b, br, p, span);
				li.append(div);

			}

			ul.append(li);
			ul.scrollTop = ul.scrollHeight; // 스크롤 제일 밑으로
		}

	})
	.catch(err => console.log(err));
}


document.addEventListener("DOMContentLoaded", () => {
  
  // 채팅방 목록에 클릭 이벤트 추가하는 함수 호출
  selectRoomList();

  // 보내기 버튼 클릭 시 메시지 보내기
  document.querySelector("#send").addEventListener("click", sendMessage);

  // 채팅 입력 후 엔터 입력 시 메시지 보내기
  document.querySelector("#inputChatting").addEventListener("keyup", e => {
    // 입력한 키가 Enter인 경우
    if(e.key == "Enter"){
      if(!e.shiftKey){ /// shift가 눌러지지 않은 경우
                      // == shift + enter 입력 시 제출 X
        sendMessage();
      }
    }
  })
})