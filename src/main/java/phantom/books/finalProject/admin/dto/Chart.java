package phantom.books.finalProject.admin.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Chart {
	
	// 가입 일자별 회원 수
	private int countMember;
	private String signUpDate;
	
	// 로그인 6개월 이상 회원
	//  & 탈퇴 신청한 회원 마지막 로그인 일자
	private String loginDate;
}
