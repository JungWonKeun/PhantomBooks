package phantom.books.finalProject.admin.service;

import java.util.List;
import java.util.Map;

public interface AdminReviewService {

	// 전체 리뷰 조회
	Map<String, Object> reviewList(int cp, String sort, String title);

	// 선택 삭제
	int deleteReview(int reviewNo);

}
