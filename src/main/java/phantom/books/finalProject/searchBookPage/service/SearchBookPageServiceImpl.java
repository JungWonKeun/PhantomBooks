package phantom.books.finalProject.searchBookPage.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.pagination.Pagination;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.searchBookPage.dto.Review;
import phantom.books.finalProject.searchBookPage.mapper.SearchBookPageMapper;

@Service
@RequiredArgsConstructor
@Transactional
public class SearchBookPageServiceImpl implements SearchBookPageService {

	private final SearchBookPageMapper mapper;

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
	
	@Override
	public Map<String, Object> searchBooks(String searchTitle, int[] categories, int[] preferences, int cp) {
	    // 전체 책 개수 조회
	    int totalCount = mapper.countBooks(searchTitle, categories, preferences);

	    // 페이지네이션 계산
	    Pagination pagination = new Pagination(cp, totalCount, 10, 5);

	    // RowBounds를 활용한 페이징 처리
	    int limit = pagination.getLimit();
	    int offset = (cp - 1) * limit;

	    RowBounds bounds = new RowBounds(offset, limit);

	    // 책 목록 조회
	    List<Book> bookList = mapper.searchBooks(searchTitle, categories, preferences, bounds);

	    // 결과를 담을 Map 생성
	    Map<String, Object> result = new HashMap<>();
	    result.put("pagination", pagination);
	    result.put("totalCount", totalCount);
	    result.put("bookList", bookList);

	    return result;
	}


	@Override
	public List<Review> getReviewsByBookNo(int bookNo) {
		return mapper.getReviewsByBookNo(bookNo);
	}

	
	 @Override
	    public boolean writeReview(int bookNo, String title, String content, double score, int memberNo, MultipartFile file)  {
	        String filePath = null;

	        // 파일 저장 처리
	        if (file != null && !file.isEmpty()) {
	            String uploadDir = "C:/images/reviewimg";
	            File directory = new File(uploadDir);
	            if (!directory.exists() && !directory.mkdirs()) {
	                throw new RuntimeException("디렉토리 생성 실패");
	            }

	            // 고유 파일 이름 생성
	            String originalFilename = file.getOriginalFilename();
	            String newFilename = UUID.randomUUID().toString() + "_" + originalFilename;
	            filePath = uploadDir + "/" + newFilename;

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
	                .reviewImgNo(filePath)
	                .build();

	        return mapper.insertReview(review) > 0;
	    }
	 
	 @Override
	 public String updateReview(int reviewNo, String title, String content, double score, int memberNo, MultipartFile file) {
	     String filePath = null;
	     
	     // 파일 처리
	     if (file != null && !file.isEmpty()) {
	         String uploadDir = "C:/images/reviewimg";
	         File directory = new File(uploadDir);
	         if (!directory.exists() && !directory.mkdirs()) {
	             throw new RuntimeException("디렉토리 생성 실패");
	         }

	         String originalFilename = file.getOriginalFilename();
	         String newFilename = UUID.randomUUID().toString() + "_" + originalFilename;
	         filePath = uploadDir + "/" + newFilename;

	         try {
	             file.transferTo(new File(filePath));
	         } catch (IOException e) {
	             e.printStackTrace();
	             return "파일 업로드 중 오류 발생";
	         }
	     }

	     // Review 객체 생성
	     Review review = Review.builder()
	             .reviewNo(reviewNo)
	             .memberNo(memberNo)
	             .reviewTitle(title)
	             .reviewContent(content)
	             .reviewScore(score)
	             .reviewImgNo(filePath) // 파일 경로를 저장
	             .build();

	     // 기존 리뷰 업데이트
	     int result = mapper.updateReview(review);
	     return result > 0 ? "리뷰 업데이트 성공" : "리뷰 업데이트 실패";
	 }

	 
	}

	

