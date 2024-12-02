package phantom.books.finalProject.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.order.dto.OrderBookDto;

@Mapper
public interface AdminSalesMapper {

	// 매출 리스트 수
	int countSales(@Param("sort") String sort,
								 @Param("term") String term,
								 @Param("date") String date);

	// 매출 리스트 조회
	List<OrderBookDto> salesList(@Param("sort") String sort,
								 							 @Param("term") String term,
								 							 @Param("date") String date,
								 							 RowBounds bounds);

}
