package phantom.books.finalProject.order.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
            mapper.insertOrder(orderDto);
            log.debug("OrderDto after insert: {}", orderDto);
        } catch (Exception e) {
            log.error("Error inserting order: {}", e.getMessage(), e);
            throw e;
        }
        return orderDto.getOrderNo();
    }
    
    



    
}