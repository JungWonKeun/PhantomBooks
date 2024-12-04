package phantom.books.finalProject.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.mapper.AdminNoticeMapper;
import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.customer.dto.Notice;
import phantom.books.finalProject.pagination.Pagination;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AdminNoticeServiceImpl implements AdminNoticeService{

	private final AdminNoticeMapper mapper;
	
	@Override
	public Map<String, Object> notice(int cp, String key) {
		
		int countNotice = mapper.countNotice(cp, key);
		
		// 페이지네이션
		Pagination pagination = new Pagination(cp, countNotice, 10, 5);
		
		int limit = pagination.getLimit();
		int offset = (cp-1) * limit;
		
		RowBounds bounds = new RowBounds(offset, limit);
		
		List<Notice> noticeList = mapper.noticeList(cp, key, bounds);
		
		Map<String, Object> map = new HashMap<>();
    
		map.put("noticeList", noticeList);
    map.put("pagination", pagination);
    
    log.debug("countNotice : {}", countNotice);
    log.debug("pagination : {}", pagination);
    log.debug("noticeList : {}", noticeList);
		
		return map;
	}
	
	// 공지사항 작성
	@Override
	public int insertNotice(Notice notice) {
		return mapper.insertNotice(notice);
	}
	
	@Override
	public Notice noticeInfo(int noticeId) {
		return mapper.noticeInfo(noticeId);
	}
	
	// 공지사항 수정
	@Override
	public int updateNotice(Notice notice) {
		return mapper.updateNotice(notice);
	}
	
	// 공지사항 삭제
	@Override
	public int deleteNotice(int noticeId) {
		return mapper.deleteNotice(noticeId);
	}
	
	@Override
	public int updateStatus(int noticeId) {
		return mapper.updateStatus(noticeId);
	}
}
