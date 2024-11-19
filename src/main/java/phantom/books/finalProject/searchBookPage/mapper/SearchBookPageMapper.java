package phantom.books.finalProject.searchBookPage.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.searchBookPage.dto.Book;

@Mapper
public interface SearchBookPageMapper {

	
	// 책 제목/옵션 조회
	List<Book> searchBooksByTitle(@Param("query") String query,@Param("sortOption") String sortOption, @Param("cp") int cp);

	// 제목의 책 조회
	int searchBooksByTitle(@Param("query") String query,@Param("sortOption") String sortOption);
	
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
                           RowBounds bounds);



	

	

	

	



}
