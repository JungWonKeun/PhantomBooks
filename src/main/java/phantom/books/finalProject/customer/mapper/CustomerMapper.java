package phantom.books.finalProject.customer.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.customer.dto.Notice;
import phantom.books.finalProject.query.dto.Query;

@Mapper
public interface CustomerMapper {
	
    List<Notice> selectNoticeList();
    
	int submitQuery(Query query);

	List<FAQ> getFaqList();


	String getresultInquiry(Query queryNo);

	Query getResultInquiry(int queryNo);
	
	
	int countQueryList(@Param("cp") int cp, 
					@Param("memberNo") int memberNo,
					@Param("status") int status,
					@Param("startDate") String startDate,
					@Param("endDate") String endDate,
					@Param("project") int project
					);
	
	List<Query> queryList(
					@Param("cp") int cp, 
					@Param("memberNo") int memberNo,
					@Param("status") int status, 
					@Param("startDate") String startDate,
					@Param("endDate") String endDate,
					@Param("project") int project,
					RowBounds bounds);

	int updateInquiry(@Param("queryNo")  int queryNo,
					  @Param("memberNo") int memberNo);

	void updateInquiry(Query query);

	int deleteInquiry(@Param("queryNo") int queryNo,
					  @Param("memberNo") int memberNo);
}
