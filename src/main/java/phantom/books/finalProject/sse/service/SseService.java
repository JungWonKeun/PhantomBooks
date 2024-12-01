package phantom.books.finalProject.sse.service;

import java.util.List;
import java.util.Map;

import phantom.books.finalProject.sse.dto.Notification;

public interface SseService {

	/** 알림 삽입 후 알림 받을 회원번호 + 알림 개수 반환
	 * @param notification
	 * @return
	 */
	Map<String, Object> insertNotification(Notification notification);

	/**로그인한 회원의 알림 목록 조회
	 * @param memberNo
	 * @return
	 */
	List<Notification> selectNotificationList(int memberNo);

	
	/**현재 로그인 한 회원의 알림 중
	 *  읽지 않은 알림 개수 조회
	 * @param memberNo
	 * @return
	 */
	int selectNotReadCheck(int memberNo);

	/** x 버튼 클릭시 알림 제거
	 * @param notificationNo
	 */
	void deleteNotification(int notificationNo);

	/** 알림 읽음 표시
	 * @param notificationNo
	 */
	void readNotification(int notificationNo);
	
	

}
