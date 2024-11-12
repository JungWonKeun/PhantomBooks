package phantom.books.finalProject.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Member {
	private int 			memberNo;					// 회원 번호
	private String 		memberId;					// 회원 아이디
	private String 		memberPw;					// 회원 비밀번호
	private String 		zip;							// 우편번호
	private String 		address;					// 주소
	private String 		detailAddress;		// 상세 주소
	private String		addZip;						// 추가 우편번호
	private String		addAddress;				// 추가 주소
	private String		addDetailAddress;	// 추가 상세 주소
	private String		telNo;						// 회원 전화 번호
	private String		birthDate;				// 회원 생일
	private String		memberName;				// 회원 이름
	private String		rankName;					// 회원 등급 이름
}
