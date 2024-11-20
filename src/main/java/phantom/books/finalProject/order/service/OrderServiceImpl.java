package phantom.books.finalProject.order.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.order.dto.AddressDto;
import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.order.dto.OrderDto;
import phantom.books.finalProject.order.mapper.OrderMapper;

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
    public void saveOrder(OrderDto orderDto) {
        orderDto.setDeliveryFee(3500);
        orderDto.setPaymentStatus("PENDING");
        mapper.insertOrder(orderDto);
    }

    
}