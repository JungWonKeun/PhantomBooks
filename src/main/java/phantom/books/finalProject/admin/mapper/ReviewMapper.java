package phantom.books.finalProject.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.searchBookPage.dto.Review;


@Mapper
public interface ReviewMapper {

	// 리뷰 count
	int countReview(
			@Param("cp") int cp, @Param("sort") String sort, @Param("title") String title);

	// review 리스트 조회
	List<Review> reviewList(
			@Param("cp") int cp, @Param("sort") String sort, @Param("title") String title ,RowBounds bounds);

	// 리뷰 선택 삭제
	int deleteReview(int reviewNo);

}
