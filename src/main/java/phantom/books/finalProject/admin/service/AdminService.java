package phantom.books.finalProject.admin.service;

import java.util.Map;

public interface AdminService {

	/** 메인 페이지 회원 목록
	 * @param cp
	 * @return
	 */
	Map<String, Object> memberList(int cp, String term, String sort);

	/** 회원 삭제
	 * @param memberNo
	 * @return
	 */
	int deleteMember(int memberNo);

	int countInactiveMember();

}
