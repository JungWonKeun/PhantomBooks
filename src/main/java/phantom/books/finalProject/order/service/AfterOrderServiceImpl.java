package phantom.books.finalProject.order.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.order.dto.OrderDto;
import phantom.books.finalProject.order.mapper.AfterOrderMapper;

@Service
@RequiredArgsConstructor
public class AfterOrderServiceImpl implements AfterOrderService {

    private final AfterOrderMapper mapper;

    @Override
    public OrderDto findOrderByOrderId(String orderId) {
        // 주문 기본 정보 조회
        OrderDto order = mapper.selectOrderByOrderId(orderId);

        if (order != null) {
            // 주문된 책 정보 조회 및 추가
            List<OrderBookDto> books = mapper.selectBooksByOrderId(orderId);
            order.setBooks(books);
        }

        return order;
    }
}
