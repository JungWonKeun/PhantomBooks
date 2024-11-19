package phantom.books.finalProject.cart.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.cart.dto.CartDto;
import phantom.books.finalProject.cart.mapper.CartMapper;

@Service
@Transactional
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartMapper mapper;
    
    // 장바구니에서 아이템 가져오기
    @Override
    public List<CartDto> getCartItems(int memberNo) {
        List<CartDto> cartItems = mapper.getCartItems(memberNo);
        return cartItems != null ? cartItems : List.of();
    }
    
    // 체크된 책을 장바구니에서 삭제
    @Override
    public boolean deleteCartItem(int memberNo, int bookNo) {
        Map<String, Object> params = new HashMap<>();
        params.put("memberNo", memberNo);
        params.put("bookNo", bookNo);
        return mapper.deleteCartItem(params) > 0;
    }
    
    @Override
    public int deleteSelectedCartItems(int memberNo, List<Integer> selectedItems) {
        if (selectedItems == null || selectedItems.isEmpty()) {
            throw new IllegalArgumentException("삭제할 항목이 없습니다.");
        }

        Map<String, Object> params = new HashMap<>();
        params.put("memberNo", memberNo);
        params.put("bookNoList", selectedItems);

        return mapper.deleteSelectedCartItems(params);
    }

}

