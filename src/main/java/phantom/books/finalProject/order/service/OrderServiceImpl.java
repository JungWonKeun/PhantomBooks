package phantom.books.finalProject.order.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.cart.service.CartServiceImpl;
import phantom.books.finalProject.order.dto.AddressDto;
import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.order.dto.OrderDto;
import phantom.books.finalProject.order.mapper.OrderMapper;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderMapper mapper;
    private final CartServiceImpl cartService; 

    // 기본 배송지
    @Override
    public AddressDto getDefaultAddress(int memberNo) {
        return mapper.getDefaultAddress(memberNo);
    }

    // 주문 정보 저장하기
    @Override
    public int saveOrder(OrderDto orderDto) {
        log.debug("OrderDto before insert: {}", orderDto);

        try {
            // 1. 주문 정보 저장
            mapper.insertOrder(orderDto);
            log.debug("OrderDto after insert: {}", orderDto);

            // 2. 장바구니 삭제
            List<Integer> bookNoList = orderDto.getOrderBooks().stream()
                                               .map(OrderBookDto::getBookNo)
                                               .toList();

            int deletedCount = cartService.deleteSelectedCartItems(orderDto.getMemberNo(), bookNoList);
            log.debug("Deleted cart items count: {}", deletedCount);

            // 3. 책 재고 차감
            for (OrderBookDto book : orderDto.getOrderBooks()) {
                int updatedRows = mapper.updateBookStock(book.getBookNo(), book.getBookCount());
                if (updatedRows == 0) {
                    log.warn("Failed to update stock for bookNo: {}", book.getBookNo());
                } else {
                    log.debug("Stock updated for bookNo: {}, orderCount: {}", book.getBookNo(), book.getBookCount());
                }
            }
        } catch (Exception e) {
            log.error("Error processing order: {}", e.getMessage(), e);
            throw e; // 트랜잭션 롤백
        }

        return orderDto.getOrderNo();
    }


}

