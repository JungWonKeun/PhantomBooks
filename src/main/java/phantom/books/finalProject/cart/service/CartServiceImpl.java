package phantom.books.finalProject.cart.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.cart.mapper.CartMapper;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService{

	private final CartMapper mapper;
}
