package phantom.books.finalProject.cart.service;

import java.util.List;

import phantom.books.finalProject.cart.dto.CartDto;

public interface CartService {

	List<CartDto> getCartItems(int memberNo);

}
