package phantom.books.finalProject.customer.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.customer.dto.Notice;

@Mapper
public interface CustomerMapper {
    List<FAQ> selectFAQList();
    List<FAQ> searchFAQ(@Param("query") String query);
    List<Notice> selectNoticeList();
}
