package phantom.books.finalProject.searchBookPage.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import phantom.books.finalProject.cart.dto.CartDto;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.searchBookPage.dto.Review;

public interface SearchBookPageService {

	
	/*
	 * // 모든 책 조회 인터페이스 List<Book> allBook(int cp);
	 */

	// 검색한 책 조회
	/* List<Book> searchBooks(String query, String sortOption, int cp); */

	
	// 책 상세 조회
	Book bookDetail(int bookNo);
	
	// 선택한 책 장바구니 담기
	int putCart(Map<String, Object> map);


	// 검색 페이지에서 선택한 책 장바구니 담기
	int putSingleCart(int memberNo, int bookNo);

	// 책 상세조회 장바구니
	int detailCart(int memberNo, int bookNo);


	// 옵션이랑 쿼리 데이터를 이용한 검색
	Map<String, Object> searchBooks(String searchTitle, int[] categories, int[] preferences, int cp, String sortOption);


    // 특정 책에 대한 리뷰 리스트 가져오기 (페이지네이션 포함)
    Map<String, Object> getReviewsByBookNo(int bookNo, int cp);
   

    // 리뷰 업데이트
	String updateReview(int reviewNo, String title, String content, double score, int memberNo, MultipartFile file);

	// 리뷰 작성
	boolean writeReview(int bookNo, String title, String content, double score, int memberNo, MultipartFile file);

	// 리뷰 삭제
	int deleteReview(int reviewNo);

	// 내 정보에서 카테고리 가져오기
	ResponseEntity<List<Integer>> myCategoryBringingIn(int memberNo);

	// 내정보에서 취향 가져오기
	ResponseEntity<List<Integer>> myPreferenceBringingIn(int memberNo);

	// 선택한 요소 찜목록으로 이동 
	int putWishlist(Map<String, Object> map);

	// 한개 찜 목록으로 이동
	int putSingleWishlist(int memberNo, int bookNo);
	

	// 찜 삭제 
	int deleteWishlist(int memberNo, int bookNo);

	// 바로 구매
	 void buyBook(int bookNo, int bookPrice, String bookTitle);

	 // 찜 목록 조회 
	List<Integer> getWishList(int memberNo);

	


	


	/*
	 * // 리뷰 작성 boolean writeReview(int bookNo, String title, String content, double
	 * score, int memberNo, MultipartFile file);
	 * 
	 * // 리뷰 수정 String updateReview(int reviewNo, String title, String content,
	 * double score, int memberNo, MultipartFile file);
	 * 
	 */
	
	 

	

	
	

	
	



	
	

	

	

	
	

}
