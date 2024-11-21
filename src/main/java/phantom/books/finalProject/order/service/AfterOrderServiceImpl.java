package phantom.books.finalProject.order.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.order.dto.OrderDto;
import phantom.books.finalProject.order.mapper.AfterOrderMapper;
import phantom.books.finalProject.order.service.AfterOrderService;

@RequiredArgsConstructor
@Service
public class AfterOrderServiceImpl implements AfterOrderService {

    private final AfterOrderMapper mapper;

    @Override
    public OrderDto getOrderDetails(int orderNo) {
        return mapper.selectOrderDetails(orderNo);
    }
}
