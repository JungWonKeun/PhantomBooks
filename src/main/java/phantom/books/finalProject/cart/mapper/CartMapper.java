package phantom.books.finalProject.cart.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import phantom.books.finalProject.cart.dto.CartDto;

@Mapper
public interface CartMapper {

	// 장바구니에서 아이템 가져오기
	List<CartDto> getCartItems(int memberNo);

	// 장바구니에서 아이템 삭제하기
	int deleteCartItem(Map<String, Object> params);

	// 선택된 항목 장바구니에서 삭제하기
	int deleteSelectedCartItems(Map<String, Object> params);

	

	
}
