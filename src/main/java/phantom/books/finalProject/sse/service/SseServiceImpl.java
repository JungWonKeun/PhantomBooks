package phantom.books.finalProject.sse.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.sse.dto.Notification;
import phantom.books.finalProject.sse.mapper.SseMapper;

@Service
@RequiredArgsConstructor
@Transactional
public class SseServiceImpl implements SseService{

	
	private final SseMapper mapper;

	// 알림 삽입 후 알림 받을 회원번호 + 알림 개수 반환
	@Override
	public Map<String, Object> insertNotification(Notification notification) {
		
		// 매개변수 notification에 저장된 값(5개)
		// -> type, url, content, pkNo, sendMemberNo
		
		// 결과 저장용 map
		Map<String, Object> map = null;
		
		// 알림 삽입
		int result = mapper.insertNotification(notification);
		
		if(result > 0) { // 알림 삽입 성공 시
			
			// 알림을 받아야하는 회원의 번호 + 안읽은 알람 개수 조회
			map = mapper.selectReceiveMember(notification.getNotificationNo());
		}
		
		
		return map;
	}
	
	
	// 로그인한 회원의 알림 목록 조회 
	@Override
	public List<Notification> selectNotificationList(int memberNo) {
		return mapper.selectNotificationList(memberNo);
	}
	
	
	// 현재 로그인 한 회원의 알림 중 읽지 않은 알림 개수 조회
	@Override
	public int selectNotReadCheck(int memberNo) {
		return mapper.selectNotReadCheck(memberNo);
	}
	
	// x 버튼 클릭시 알림 제거
	@Override
	public void deleteNotification(int notificationNo) {
		mapper.deleteNotification(notificationNo);
	}
	
	// 알림 읽음 표시
	@Override
	public void readNotification(int notificationNo) {
		mapper.readNotification(notificationNo);
	}
	
}
