package phantom.books.finalProject.cart.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import phantom.books.finalProject.cart.dto.CartDto;

@Mapper
public interface CartMapper {

	List<CartDto> getCartItems(int memberNo);
	
}
