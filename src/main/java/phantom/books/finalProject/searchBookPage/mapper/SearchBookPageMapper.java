package phantom.books.finalProject.searchBookPage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import phantom.books.finalProject.searchBookPage.dto.Book;

@Mapper
public interface SearchBookPageMapper {

	// 책 전체 조회
	List<Book> allBook ();

	// 제목의 책 조회
	List<Book> searchBooksByTitle(String query);
	
	// 책 상세 조회
	Book bookDetail(int bookNo);


}
