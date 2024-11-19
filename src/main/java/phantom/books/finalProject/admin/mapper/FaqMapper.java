package phantom.books.finalProject.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.query.dto.Query;

@Mapper
public interface FaqMapper {
	
	// FAQ 리스트 카운트 하기
	int countFaqList(@Param("cp") int cp, @Param("key") String key);

	// FAQ 리스트 조회하기
	List<FAQ> faqList(@Param("cp") int cp, @Param("key") String key, RowBounds bounds);

}
