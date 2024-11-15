package phantom.books.finalProject.order.service;

import java.util.List;

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
        return mapper.findOrderByOrderId(orderId);
    }

    @Override
    public List<OrderDto> getOrderItemsByIds(int memberNo, List<Integer> selectedItems) {
        return mapper.getOrderItemsByIds(memberNo, selectedItems);
    }

    @Override
    public void saveOrder(OrderDto orderDto) {
        mapper.saveOrder(orderDto);
    }

    @Override
    public OrderDto getOrderItemByBookNoAndQuantity(int bookNo, int quantity) {
        return mapper.findOrderItemByBookNoAndQuantity(bookNo, quantity);
    }
}

