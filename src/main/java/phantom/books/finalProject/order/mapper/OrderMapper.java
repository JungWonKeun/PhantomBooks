package phantom.books.finalProject.order.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import phantom.books.finalProject.order.dto.AddressDto;
import phantom.books.finalProject.order.dto.OrderDto;

@Mapper
public interface OrderMapper {

	// 기본 배송지 얻어오기
    AddressDto getDefaultAddress(@Param("memberNo") int memberNo);

    
    int insertOrder(OrderDto order);

}
