package phantom.books.finalProject.order.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import phantom.books.finalProject.order.dto.AddressDto;
import phantom.books.finalProject.order.dto.OrderDto;

@Mapper
public interface OrderMapper {

	// 기본 배송지 얻어오기
    AddressDto getDefaultAddress(@Param("memberNo") int memberNo);

    // 주문 정보 저장
    int insertOrder(OrderDto order);

    int updateBookStock(@Param("bookNo") int bookNo, @Param("bookCount") int bookCount);
  }