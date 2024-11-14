package phantom.books.finalProject.order.service;

import phantom.books.finalProject.order.dto.OrderDto;

public interface OrderService {

	OrderDto findOrderByOrderId(String orderId);

}
