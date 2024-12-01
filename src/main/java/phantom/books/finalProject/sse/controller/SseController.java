package phantom.books.finalProject.sse.controller;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.sse.dto.Notification;
import phantom.books.finalProject.sse.service.SseService;

@RestController
@Slf4j
public class SseController {
	
	@Autowired
	private SseService service;
	
	// SseEmitter : 서버로부터 메시지를 전달 받을
	//							클라이언트 정보를 저장한 객체
	//							== 연결된 클라이언트
	
	// ConcurrentHashMap : 멀티스레드 환경에서 동기화를 보장하는 Map
	// -> 한번에 많은 요청이 있어도 차례대로 처리
	
	private final Map<String, SseEmitter> emitters
		= new ConcurrentHashMap<>(); // == 클라이언트의 대기명단
	
	/** 클라이언트 연결 요청처리
	 * @return
	 */
	@GetMapping("sse/connect")
	public SseEmitter sseConnect(
			@SessionAttribute("loginMember") Member loginMember
			) {
		
		// Map에 저장될 key 갑승로 회원 번호 얻어오기
		String clientId = loginMember.getMemberNo() + "";
		
		// SseEmitter 객체 생성
		// -> 연결 대기시간 10분 설정(ms 단위)
		SseEmitter emitter = new SseEmitter(10 * 60 * 1000L);
		
		// 클라이언트 정보를 Map에 추가
		emitters.put(clientId, emitter);
		
		// 클라이언트 연결 종료 시 Map에서 제거
		emitter.onCompletion(() -> emitters.remove(clientId));
		
		// 클라이언트 타임 아웃 시 Map에서 제게
		emitter.onTimeout(( )-> emitters.remove(clientId));
		
		return emitter;
	}
	
	/** 알림 메세지 전송 */
	@PostMapping("sse/send")
	public void sendNotification(
			@RequestBody Notification notification,
			@SessionAttribute("loginMember") Member loginMember
			) {
		
		// 알림 보낸 회원(현재 로그인한 회원) 번호 추가
		notification.setSendMemberNo(loginMember.getMemberNo());
		
		// 전달받은 알림 데이터를 DB에 저장하고
		// 알림받을 회원의 번호
		// + 해당 회원이 읽지 않은 알림 개수 반환 받는 서비스 호출
		Map<String, Object> map 
			= service.insertNotification(notification);	
		
		
		// 알림을 받을 클라이언트 ID
		String clientId = map.get("receiveMemberNo").toString();
		
		// 연결된 클라이언트 대기 명단(emitters)에서
		// clientId가 일치하는 클라이언트 찾기
		SseEmitter emitter = emitters.get(clientId);
		
		// clientId가 일치하는 클라이언트가 있을 경우
		if(emitter != null) {
			
			try {
				emitter.send( map );
			}catch (Exception e) {
				emitters.remove(clientId);
			}
		}
		
	}
	
	
	/** 로그인한 회원의 알림 목록 조회
	 * @param loginMember 
	 * @return
	 */
	@GetMapping("notification")
	public List<Notification> notificationList(
			@SessionAttribute("loginMember") Member loginMember
			){
		
		int memberNo = loginMember.getMemberNo();
		
		return service.selectNotificationList(memberNo);
	}
	
	
	/** 현재 로그인 한 회원의 알림 중
	 *  읽지 않은 알림 개수 조회
	 *  ("NOTIFICATION"."NOTIFICATION_CHECK = 'N'"
	 * @param loginMember
	 * @return
	 */
	@GetMapping("notification/notReadCheck")
	public int notReadCheck(
			@SessionAttribute("loginMember") Member loginMember
			) {
		int memberNo = loginMember.getMemberNo();
		
		return service.selectNotReadCheck(memberNo);
	}
	
	/** x 버튼 클릭시 알림 제거
	 * @param notificationNo
	 * @return
	 */
	@DeleteMapping("notification")
	public void deleteNotification(
			@RequestBody int notificationNo
			) {
		service.deleteNotification(notificationNo);
	}
	
	/** 알림 읽음 표시
	 * @param notificationNo
	 */
	@PutMapping("notification")
	public void readNotification(
			@RequestBody int notificationNo) {
		service.readNotification(notificationNo);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
