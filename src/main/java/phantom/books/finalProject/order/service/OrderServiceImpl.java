package phantom.books.finalProject.order.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.order.dto.OrderDto;
import phantom.books.finalProject.order.mapper.OrderMapper;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderMapper mapper;

    @Override
    public OrderDto findOrderByOrderId(String orderId) {
        OrderDto order = mapper.findOrderByOrderId(orderId); 
        return order;
    }
}
