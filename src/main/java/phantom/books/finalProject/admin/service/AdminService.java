package phantom.books.finalProject.admin.service;

import java.util.Map;

public interface AdminService {

	/** 메인 페이지 회원 목록
	 * @param cp
	 * @return
	 */
	Map<String, Object> memberList(int cp, String sort);

}
