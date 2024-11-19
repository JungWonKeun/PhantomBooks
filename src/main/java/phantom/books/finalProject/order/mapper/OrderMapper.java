package phantom.books.finalProject.order.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import phantom.books.finalProject.order.dto.AddressDto;
import phantom.books.finalProject.order.dto.OrderDto;

@Mapper
public interface OrderMapper {
	
    OrderDto findOrderByOrderId(String orderId);

    List<OrderDto> getOrderItemsByIds(
            @Param("memberNo") int memberNo,
            @Param("selectedItems") List<Integer> selectedItems);

    void saveOrder(OrderDto orderDto);

    OrderDto findOrderItemByBookNoAndQuantity(
            @Param("bookNo") int bookNo,
            @Param("quantity") int quantity);

    
	// 기본 배송지 조회
    AddressDto getDefaultAddress(@Param("memberNo") int memberNo);
}
