package phantom.books.finalProject.searchBookPage.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.http.ResponseEntity;

import phantom.books.finalProject.cart.dto.CartDto;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.searchBookPage.dto.Review;

@Mapper
public interface SearchBookPageMapper {

	
	// 책 제목/옵션 조회
	List<Book> searchBooksByTitle(@Param("query") String query,
			@Param("sortOption") String sortOption,
			@Param("cp") int cp);

	// 제목의 책 조회
	int searchBooksByTitle(@Param("query") String query,
			@Param("sortOption") String sortOption);
	
	// 책 상세 조회
	Book bookDetail(int bookNo);

	// 선택한 책 장바구니 담기
	int putCart(Map<String, Object> map);

	// 검색창에서 1개  장바구니로 보내기
	int putSingleCart(@Param("memberNo") int memberNo,@Param("bookNo") int bookNo);

	// 상세조회 페이지에서 1개 장바구니로 보내기
	int detailCart(@Param("memberNo") int memberNo,@Param("bookNo") int bookNo);

	// 책 개수 조회
    int countBooks(@Param("searchTitle") String searchTitle, 
                   @Param("categories") int[] categories, 
                   @Param("preferences") int[] preferences);

    // 책 목록 조회
    List<Book> searchBooks(@Param("searchTitle") String searchTitle, 
                           @Param("categories") int[]  categories, 
                           @Param("preferences") int[]  preferences,
                           RowBounds bounds,
                           @Param("sortOption") String sortOption);

	// 리뷰 페이지 네이션용 리뷰 개수 조회
	int countReview(int bookNo);
   
    // 책 번호에 따른 리뷰 가져오기 (RowBounds를 사용하여 페이지네이션 처리)
    List<Review> getReviewsByBookNo(
        @Param("bookNo") int bookNo,
        RowBounds bounds,
        @Param("countReview") int countReview );
    // 리뷰 작성
        int insertReview(Review review);

        // 리뷰 수정
		int updateReview(Review review);

		// 더보기 용 리뷰 개수 조회
		int countReviewsByBookNo(int bookNo);

		// 리뷰 삭제
		int deleteReview(int reviewNo);

		// 책 평점
		Double selectScoreAvg(int bookNo);

		int insertScoreAvg(@Param("bookNo") int bookNo, @Param("scoreAvg") Double scoreAvg);

		// 리뷰작성시 평점 수정
		int updateScoreAvg(int bookNo);

		// 리뷰 삭제시 평점 수정
		int updateScoreAvgDelete(int reviewNo);

		// 리뷰 업데이트시 평점 수정
		int updateScoreAvgUpdate(@Param("reviewNo") int reviewNo);

		// 내 정보에서 카테고리 불러오기
		List<Integer> myCategoryBringingIn(int memberNo);

		//내정보에서 취향 불러오기
		List<Integer> myPreferenceBringingIn(int memberNo);

		// 선택한 요소 찜목록로 이동
		int putWishlist(Map<String, Object> map);

		// 한개 찜 목록로 이동
		int putSingleWishlist(@Param("memberNo") int memberNo,@Param("bookNo") int bookNo);

		// 바로구매용 장바구니 연결
		int scBag(int memberNo, int bookNo);

		// 바로 구매
		Object buyBook(int bookNo, int bookPrice, String bookTitle);

		// 리뷰 체크 
		int reviewCheck(@Param("bookNo") int bookNo,@Param("memberNo") int memberNo);

		// 리뷰 작성 제한
		int reviewCp(int bookNo);

		// 찜 삭제
		int deleteWishlist(@Param("memberNo") int memberNo,@Param("bookNo") int bookNo);

		// 찜목록 조회
		List<Integer> getWishList(int memberNo);


	




		





	

	

	

	



}
