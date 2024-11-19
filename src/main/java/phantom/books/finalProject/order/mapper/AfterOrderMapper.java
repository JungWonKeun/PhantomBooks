package phantom.books.finalProject.order.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.order.dto.OrderDto;

@Mapper
public interface AfterOrderMapper {
    OrderDto selectOrderByOrderId(@Param("orderId") String orderId);

	List<OrderBookDto> selectBooksByOrderId(String orderId);
}
