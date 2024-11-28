package phantom.books.finalProject.customer.service;

import java.util.List;
import java.util.Map;

import phantom.books.finalProject.customer.dto.Notice;


public interface NoticeService {

	Map<String, Object> viewNoticeList(int cp);

	Notice selectNotice(int noticeId);

	int updateReadCount(int noticeId);

	 List<Notice> getTopNotices();
}
