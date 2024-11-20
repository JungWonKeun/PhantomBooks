package phantom.books.finalProject.admin.service;

import java.util.Map;

public interface ReviewService {

	// 전체 리뷰 조회
	Map<String, Object> reviewList(int cp, String sort, String title);

}
