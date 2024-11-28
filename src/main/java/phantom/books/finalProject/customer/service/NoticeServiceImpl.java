package phantom.books.finalProject.customer.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.customer.dto.Notice;
import phantom.books.finalProject.customer.mapper.NoticeMapper;
import phantom.books.finalProject.pagination.Pagination;

@Service
@RequiredArgsConstructor
@Transactional
public class NoticeServiceImpl implements NoticeService {

	private final NoticeMapper mapper;
	
	@Override
	public Map<String, Object> viewNoticeList(int cp) {
		
		Map<String, Object> map = new HashMap<>();
		
		int countNoticeList = mapper.countNoticeList();
		
		Pagination pagination = new Pagination(cp, countNoticeList, 10, 5);
		
		int limit = pagination.getLimit();
		int offset = (cp-1) * limit;
		
		RowBounds bounds = new RowBounds(offset, limit);
		
		List<Notice> noticeList = mapper.noticeList(bounds);
		
		map.put("noticeList", noticeList);
		map.put("pagination", pagination);
		
		return map;
	}
	@Override
	public Notice selectNotice(int noticeId) {
		return mapper.selectNotice(noticeId);
	}
	@Override
	public int updateReadCount(int noticeId) {
		return mapper.updateReadCount(noticeId);
	}
	
	/**
     * 공지사항 상위 5개를 가져오는 메서드
     * @return 상위 5개의 공지사항 리스트
     */
    @Override
    public List<Notice> getTopNotices() {
        RowBounds bounds = new RowBounds(0, 5); // 상위 5개 공지사항 가져오기
        return mapper.noticeList(bounds);
    }
}
