package phantom.books.finalProject.order.service;

import phantom.books.finalProject.order.dto.OrderDto;

public interface AfterOrderService {
    OrderDto findOrderByOrderId(String orderId);
}
