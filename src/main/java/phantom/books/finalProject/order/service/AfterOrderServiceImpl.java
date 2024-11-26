package phantom.books.finalProject.order.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.order.dto.OrderDto;
import phantom.books.finalProject.order.mapper.AfterOrderMapper;
import phantom.books.finalProject.order.service.AfterOrderService;

@Service
@RequiredArgsConstructor
public class AfterOrderServiceImpl implements AfterOrderService {

    private final AfterOrderMapper mapper;

    @Override
    public OrderDto getOrderDetails(int orderNo) {
        OrderDto order = mapper.selectOrderDetails(orderNo);

        if (order == null) {
            throw new IllegalArgumentException("주문 번호 " + orderNo + "에 해당하는 주문이 존재하지 않습니다.");
        }

        return order;
    }
}

