package phantom.books.finalProject.admin.service;

import java.util.Map;

import phantom.books.finalProject.customer.dto.Notice;

public interface AdminNoticeService {

	// 목록 조회
	Map<String, Object> notice(int cp, String key);

	// 공지사항 작성
	int insertNotice(Notice notice);

	// 공지 사항 수정
	int updateNotice(Notice notice);

	// 공지사항 삭제
	int deleteNotice(int noticeId);

	int updateStatus(int noticeId);

	Notice noticeInfo(int noticeId);

}
