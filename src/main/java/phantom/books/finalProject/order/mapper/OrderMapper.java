package phantom.books.finalProject.order.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import phantom.books.finalProject.order.dto.AddressDto;
import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.order.dto.OrderDto;

@Mapper
public interface OrderMapper {

    // 기본 배송지 가져오기
    AddressDto getDefaultAddress(@Param("memberNo") int memberNo);

    // 주문 정보 저장
    int insertOrder(OrderDto order);

    // 책 재고 업데이트
    int updateBookStock(@Param("bookNo") int bookNo, @Param("bookCount") int bookCount);

    // 주문 상세 저장
    void insertOrderList(OrderBookDto book);

    // 특정 주문의 주문서 조회 (선택적으로 사용할 수 있음)
    List<OrderBookDto> selectOrderBooks(@Param("orderNo") int orderNo);
}
