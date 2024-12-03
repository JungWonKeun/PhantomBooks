package phantom.books.finalProject.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import phantom.books.finalProject.admin.dto.ChartSales;
import phantom.books.finalProject.order.dto.OrderBookDto;

@Mapper
public interface AdminSalesMapper {

	// 매출 리스트 수
	int countSales(@Param("cp") int cp,
								 @Param("sort") String sort,
								 @Param("term") String term,
								 @Param("date") String date,
								 @Param("text") String text);

	// 매출 리스트 조회
	List<ChartSales> salesList(@Param("cp") int cp,
															@Param("sort") String sort,
								 							 @Param("term") String term,
								 							 @Param("date") String date,
								 							 @Param("text") String text,
								 							 RowBounds bounds);

	// 일자별 판매 수량
	List<ChartSales> chartData(@Param("cp") int cp,
															@Param("sort") String sort,
														 @Param("term") String term,
														 @Param("date") String date,
														 @Param("text") String text);

}
