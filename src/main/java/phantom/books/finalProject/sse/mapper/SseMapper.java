package phantom.books.finalProject.sse.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import phantom.books.finalProject.sse.dto.Notification;



@Mapper
public interface SseMapper {

	// 알림 삽입
	int insertNotification(Notification notification);

	// 알림을 받아야하는 회원의 번호 + 안읽은 알람 개수 조회
	Map<String, Object> selectReceiveMember(int notificationNo);

	
	// 로그인한 회원의 알림 목록 조회
	List<Notification> selectNotificationList(int memberNo);

	// 현재 로그인 한 회원의 알림 중 읽지 않은 알림 개수 조회
	int selectNotReadCheck(int memberNo);

	// x 버튼 클릭시 알림 제거
	void deleteNotification(int notificationNo);

	// 알림 읽음 표시
	void readNotification(int notificationNo);

}
