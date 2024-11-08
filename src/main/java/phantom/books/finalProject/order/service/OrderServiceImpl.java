package phantom.books.finalProject.order.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.order.mapper.OrderMapper;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{

	private final OrderMapper mapper;
}
