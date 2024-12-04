package phantom.books.finalProject.searchBookPage.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.cart.dto.CartDto;
import phantom.books.finalProject.pagination.Pagination;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.searchBookPage.dto.Review;
import phantom.books.finalProject.searchBookPage.mapper.SearchBookPageMapper;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
/* @PropertySource("classpath:/config.properties") */
public class SearchBookPageServiceImpl implements SearchBookPageService {

	private final SearchBookPageMapper mapper;

	@Value("${phantomBooks.reviewImage.web-path}")
	private String reviewImageWebPath; // Review 이미지 웹 경로

	@Value("${phantomBooks.reviewImage.folder-path}")
	private String reviewImageFolderPath; // Review 이미지 서버 경로

	/*
	 * @Override public List<Book> allBook(int cp) {
	 * 
	 * int bookCount = mapper.allBook();
	 * 
	 * Pagination pagination = new Pagination(cp, bookCount, 10, 5);
	 * 
	 * int limit = pagination.getLimit(); int offset = (cp-1) * limit;
	 * 
	 * RowBounds bounds = new RowBounds(offset, limit);
	 * 
	 * List<Book> bookList = mapper.allBook(bounds);
	 * 
	 * Map<String, Object> map = new HashMap<>(); map.put("bookCount", bookCount);
	 * map.put("pagination", pagination); map.put("bookList", bookList);
	 * 
	 * return map; }
	 */

	// 책 제목/옵션 조회
	/*
	 * @Override public List<Book> searchBooks(String query, List<String>
	 * categories, List<String> preferences, int cp) { // 검색 조건을 기반으로 책 목록 조회
	 * Map<String, Object> params = new HashMap<>(); params.put("query", query);
	 * params.put("categories", categories); params.put("preferences", preferences);
	 * params.put("cp", cp);
	 * 
	 * return mapper.searchBooks(params); }
	 */

	// 책 상세조회
	@Override
	public Book bookDetail(int bookNo) {
		return mapper.bookDetail(bookNo);
	}

	// 선택한 책을 장바구니에 담기
	@Override
	public int putCart(Map<String, Object> map) {

		return mapper.putCart(map);
	}

	// 검색 페이지에서 선택한 책 장바구니 담기
	@Override
	public int putSingleCart(int memberNo, int bookNo) {
		return mapper.putSingleCart(memberNo, bookNo);
	}

	// 책 상세조회 장바구니
	@Override
	public int detailCart(int memberNo, int bookNo) {
		return mapper.detailCart(memberNo, bookNo);
	}

	// 책 검색
	@Override
	public Map<String, Object> searchBooks(String searchTitle, int[] categories, int[] preferences, int cp,
			String sortOption) {
		// 전체 책 개수 조회
		int totalCount = mapper.countBooks(searchTitle, categories, preferences);

		// 페이지네이션 계산
		Pagination pagination = new Pagination(cp, totalCount, 10, 5);

		// RowBounds를 활용한 페이징 처리
		int limit = pagination.getLimit();
		int offset = (cp - 1) * limit;

		RowBounds bounds = new RowBounds(offset, limit);

		// 책 목록 조회
		List<Book> bookList = mapper.searchBooks(searchTitle, categories, preferences, bounds, sortOption);

		log.debug("sortOption: {}", sortOption);
		/*
		 * // 책 평점 계산 Double scoreAvg = 0.0;
		 * 
		 * // 책 평점 for (Book book : bookList) { scoreAvg =
		 * mapper.selectScoreAvg(book.getBookNo());
		 * 
		 * log.debug("scoreAvg: {}", scoreAvg);
		 * 
		 * int result = mapper.insertScoreAvg(book.getBookNo(), scoreAvg);
		 * log.debug("result : {}", result); }
		 */

		// 결과를 담을 Map 생성
		Map<String, Object> result = new HashMap<>();
		result.put("pagination", pagination);
		result.put("totalCount", totalCount);
		result.put("bookList", bookList);

		return result;
	}

	// 리뷰 페이지 네이션
	@Override
	public Map<String, Object> getReviewsByBookNo(int bookNo, int cp) {

		/*
		 * int reviewCp = mapper.reviewCp(bookNo);
		 * 
		 * if (reviewCp == 0) { return null; }
		 */
		Map<String, Object> map = new HashMap<>();

		int countReview = mapper.countReview(bookNo);

		// Pagination 객체 생성
		Pagination pagination = new Pagination(cp, countReview, 10 ,5);

		// RowBounds로 limit, offset 지정
		int limit = pagination.getLimit();
		int offset = (cp - 1) * limit;
		RowBounds bounds = new RowBounds(offset, limit);

		List<Review> reviewList = mapper.getReviewsByBookNo(bookNo, bounds, countReview);

		map.put("reviewList", reviewList);
		map.put("pagination", pagination);

		// 리뷰 리스트 조회
		return map;
	}

	// 리뷰작성
	@Override
    public boolean writeReview(int bookNo, 
    		String title, String content, 
    		double score, int memberNo, 
    		MultipartFile file)  {
        String filePath = null;
        String webPath = null; 
        
        
        int reviewCheck = mapper.reviewCheck(bookNo, memberNo);
		if (reviewCheck < 0) {
			return false;
		}
		

        // 파일 저장 처리
      File folder = new File(reviewImageFolderPath);
      if (!folder.exists()) {
          folder.mkdirs();
      }
        if (file != null && !file.isEmpty()) {
            String uploadDir = reviewImageFolderPath;
            // 고유 파일 이름 생성
            String originalFilename = file.getOriginalFilename();
            String newFilename = UUID.randomUUID()
            		.toString()
            		+ "_" + originalFilename;
            filePath = uploadDir + newFilename;
            webPath = reviewImageWebPath + newFilename;
            
            // 파일 저장
            try {
				file.transferTo(new File(filePath));
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
        }

        // 리뷰 생성
        Review review = Review.builder()
                .bookNo(bookNo)
                .memberNo(memberNo)
                .reviewTitle(title)
                .reviewContent(content)
                .reviewScore(score)
                .reviewImgNo(webPath)
                .build();

		int result = mapper.insertReview(review);

		if (result == 0)
			return false;

		return mapper.updateScoreAvg(bookNo) > 0;
	}

	// 리뷰 수정

	@Override
	public String updateReview(int reviewNo, String title, String content, double score, int memberNo,
			MultipartFile file) {
		String filePath = null;
		String webPath = null;
		// 파일 저장 처리
		File folder = new File(reviewImageFolderPath);
		if (!folder.exists()) {
			folder.mkdirs();
		}
		if (file != null && !file.isEmpty()) {
			String uploadDir = reviewImageFolderPath;
			// 고유 파일 이름 생성
			String originalFilename = file.getOriginalFilename();
			String newFilename = UUID.randomUUID()
					.toString() 
					+ "_" + originalFilename;
			filePath = uploadDir + newFilename;
			webPath = reviewImageWebPath + newFilename;

			// 파일 저장
			try {
				file.transferTo(new File(filePath));
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		// Review 객체 생성
		Review review = Review.builder()
				.reviewNo(reviewNo)
				.memberNo(memberNo)
				.reviewTitle(title)
				.reviewContent(content)
				.reviewScore(score)
				.reviewImgNo(webPath) // 파일 경로를 저장
				.build();

		// 기존 리뷰 업데이트
		int result = mapper.updateReview(review);

		if (result == 0)
			return null;

		int updateScoreAvgUpdate = mapper.updateScoreAvgUpdate(reviewNo);

		if (updateScoreAvgUpdate == 0)
			return null;

		return webPath;


	}

	// 리뷰 삭제
	@Override
	public int deleteReview(int reviewNo) {

		int result = mapper.deleteReview(reviewNo);

		if (result == 0)
			return 0;

		return mapper.updateScoreAvgDelete(reviewNo);
	}

	// 카테고리 불러오기
	@Override
	public ResponseEntity<List<Integer>> myCategoryBringingIn(int reviewNo) {
		List<Integer> categoryNoList = mapper.myCategoryBringingIn(reviewNo);

		// 디버깅 로그 추가
		/*
		 * log.debug("categories for member {}: {}", reviewNo, categoryNoList);
		 */
		if (categoryNoList != null && !categoryNoList.isEmpty()) {
			return ResponseEntity.ok(categoryNoList); // 정상 반환
		} else {
			return ResponseEntity.noContent().build(); // 데이터가 없을 경우
		}

	}

	// 카테고리 불러오기
	@Override
	public ResponseEntity<List<Integer>> myPreferenceBringingIn(int memberNo) {

		List<Integer> preferenceNoList = mapper.myPreferenceBringingIn(memberNo);

		// 디버깅 로그 추가
		log.debug("Fetched categories for member {}: {}", memberNo, preferenceNoList);

		if (preferenceNoList != null && !preferenceNoList.isEmpty()) {
			return ResponseEntity.ok(preferenceNoList); // 정상 반환
		} else {
			return ResponseEntity.noContent().build(); // 데이터가 없을 경우
		}

	}

	// 선택한 요소 찜 목록에 추가
	@Override
	public int putWishlist(Map<String, Object> map) {

		return mapper.putWishlist(map);
	}

	// 개별 찜 목록에 추가
	@Override
	public int putSingleWishlist(int memberNo, int bookNo) {

		return mapper.putSingleWishlist(memberNo, bookNo);
	}

	// 바로 구매
	@Override
	public void buyBook(int bookNo, int bookPrice, String bookTitle) {
		
		return;
	}
	
	@Override
	public int deleteWishlist(int memberNo, int bookNo) {
		
		return mapper.deleteWishlist(memberNo, bookNo);
	}
}
