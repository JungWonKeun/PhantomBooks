package phantom.books.finalProject.order.service;

import java.util.List;

import phantom.books.finalProject.order.dto.AddressDto;
import phantom.books.finalProject.order.dto.OrderDto;

public interface OrderService {
    OrderDto findOrderByOrderId(String orderId);

    List<OrderDto> getOrderItemsByIds(int memberNo, List<Integer> selectedItems);

    void saveOrder(OrderDto orderDto);

    OrderDto getOrderItemByBookNoAndQuantity(int bookNo, int quantity);

    // 기본 배송지 조회    
    AddressDto getDefaultAddress(int memberNo);
}
