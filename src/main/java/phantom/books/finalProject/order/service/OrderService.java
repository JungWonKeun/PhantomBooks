package phantom.books.finalProject.order.service;

import java.util.List;

import phantom.books.finalProject.order.dto.AddressDto;
import phantom.books.finalProject.order.dto.OrderDto;

public interface OrderService {

    // 기본 배송지 주소 불러오기
    AddressDto getDefaultAddress(int memberNo);

    // 주문 정보 저장하기
	int saveOrder(OrderDto orderDto);

   
}
