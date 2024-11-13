package phantom.books.finalProject.order.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.order.mapper.AfterOrderMapper;

@Service
@RequiredArgsConstructor
public class AfterOrderServiceImpl implements AfterOrderService{
	
	private final AfterOrderMapper mapper;
}
