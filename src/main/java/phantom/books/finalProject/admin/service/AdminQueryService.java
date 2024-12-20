package phantom.books.finalProject.admin.service;

import java.util.Map;

public interface AdminQueryService {

	// 문의 목록 받아오기
	Map<String, Object> queryList(int cp, String sort);

	// 답변 등록
	int insertReply( int queryNo, String inputReply);

	// 문의 삭제
	int deleteQuery(int queryNo);

	// 답변 상태 변경
	int updateStatus(int queryNo);
	
}
