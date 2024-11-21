package phantom.books.finalProject.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.admin.mapper.AdminReviewMapper;
import phantom.books.finalProject.pagination.Pagination;
import phantom.books.finalProject.searchBookPage.dto.Review;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminReviewServiceImpl implements AdminReviewService{

	private final AdminReviewMapper mapper;
	
	// 전체 리뷰 조회
	@Override
	public Map<String, Object> reviewList(int cp, String sort, String title) {
		
		// sort 조건에 맞는 리뷰 수 count
		int countReview = mapper.countReview(cp, sort, title);
		
		// 페이지네이션
		Pagination pagination = new Pagination(cp, countReview);
		
		int limit = pagination.getLimit();
		int offset = (cp-1) * limit;
		
		RowBounds bounds = new RowBounds(offset, limit);
		
		// sort조건에 맞는 리뷰 리스트 조회
		List<Review> reviewList = mapper.reviewList(cp, sort, title, bounds);
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("pagination", pagination);
		map.put("reviewList", reviewList);
		
		
		return map;
	}
	
	// 리뷰 선택 삭제
	@Override
	public int deleteReview(int reviewNo) {
		return mapper.deleteReview(reviewNo);
	}
}
