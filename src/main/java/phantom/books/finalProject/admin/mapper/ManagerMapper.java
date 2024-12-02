package phantom.books.finalProject.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.admin.dto.Chart;
import phantom.books.finalProject.admin.dto.ChartBook;
import phantom.books.finalProject.searchBookPage.dto.Book;

@Mapper
public interface ManagerMapper {

	// 페이지네이션 설정을 위한 카운트
	int countBookList(@Param("sort") String sort, @Param("text") String text);

	// 관리자 재고 관리 페이지 리스트 
	List<Book> bookList(@Param("sort") String sort, @Param("text") String text, RowBounds bounds);

	// 등록 여부 수정 
	int insert(int bookNo);

	// 차트에 사용할 데이터
	List<ChartBook> chartData(@Param("sort") String sort,
												@Param("text") String text,
												RowBounds bounds);


}
