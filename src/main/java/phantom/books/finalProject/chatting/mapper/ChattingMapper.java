package phantom.books.finalProject.chatting.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import phantom.books.finalProject.chatting.dto.ChattingRoom;
import phantom.books.finalProject.member.dto.Member;



@Mapper
public interface ChattingMapper {

	// 채팅 상태 검색
	List<Member> selectTarget(
			@Param("query") String query,
			@Param("memberNo") int memberNo);

	// 두회원이 참여한 채팅방 존재 확인
	int checkChattingRoom(
			@Param("targetNo") int targetNo,
			@Param("memberNo") int memberNo);

	// 채팅방 새로 만들기
	int createChattingRoom(Map<String, Integer> map);

	// 로그인한 회원과 채팅방이 생성된 리스트 조회
	List<ChattingRoom> selectRoomList(int memberNo);

	/** 특정 채팅방의 메시지 모두 조회
	 * @param chattingNo
	 * @return
	 */
	List<Message> selectMessage(int chattingNo);

	// 채팅방 접속시 모두 읽음 처리
	int updateReadFlag(
			@Param("chattingNo") int chattingNo,
			@Param("memberNo") int memberNo);

	// 메시지 삽입
	int insertMessage(Message msg);
	
	

}
