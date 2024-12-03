package phantom.books.finalProject.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;

import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.order.dto.OrderBookDto;

public interface AdminService {

	/** 메인 페이지 회원 목록
	 * @param cp
	 * @return
	 */
	Map<String, Object> memberList(int cp, String term, String sort, String date);

	/** 회원 삭제
	 * @param memberNo
	 * @return
	 */
	int deleteMember(int memberNo);

	int countInactiveMember();

	/** 관리자 계정 자동 생성
	 * @return
	 */
	String adminSignUp();

	/** 계정 정보수정
	 * @param memberNo
	 * @param adminName
	 * @param adminEmail
	 * @return
	 */
	int updateAdmin(int memberNo, String adminName, String adminEmail);

	// 계정 삭제
	int deleteAdmin(int memberNo);

	// 회원 정보 조회
	Member memberInfo(int memberNo);

	// 회원 등급 변경
	int updateMemberRank(int memberNo, String rankName);

	// 구매목록 받아오기
	Map<String, Object> selectOrderList(int cp, int memberNo);

	// 리뷰 리스트
	Map<String, Object> selectReviewList(int cp, int memberNo);

	// 문의 내역
	Map<String, Object> selectQueryList(int cp, int memberNo);

	
	

}
