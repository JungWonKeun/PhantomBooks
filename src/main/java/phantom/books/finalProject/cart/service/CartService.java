package phantom.books.finalProject.cart.service;

import java.util.List;


import phantom.books.finalProject.cart.dto.CartDto;

public interface CartService {

	// 장바구니에서 아이템 가져오기
	List<CartDto> getCartItems(int memberNo);

	// 체크된 책을 장바구니에서 삭제
	boolean deleteCartItem(int memberNo, int bookNo);

	// 선택해서 책을 장바구니에서 삭제
	int deleteSelectedCartItems(int memberNo, List<Integer> selectedItems);


}
