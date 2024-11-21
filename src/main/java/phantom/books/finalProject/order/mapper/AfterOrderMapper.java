package phantom.books.finalProject.order.mapper;

import org.apache.ibatis.annotations.Mapper;
import phantom.books.finalProject.order.dto.OrderDto;

@Mapper
public interface AfterOrderMapper {
    OrderDto selectOrderDetails(int orderNo);
}
