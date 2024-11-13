package phantom.books.finalProject.cart.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.cart.dto.CartDto;
import phantom.books.finalProject.cart.mapper.CartMapper;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService{

	private final CartMapper mapper;
	
	@Override
	public List<CartDto> getCartItems(int memberNo) {
		return mapper.getCartItems(memberNo);
	}
}
