package phantom.books.finalProject.chatting.service;

import java.util.List;

import edu.kh.project.chatting.dto.ChattingRoom;
import edu.kh.project.chatting.dto.Message;
import edu.kh.project.member.dto.Member;

public interface ChattingService {

	/** 채팅 상태 검색
	 * @param query
	 * @param memberNo
	 * @return
	 */
	List<Member> selectTarget(String query, int memberNo);

	/** 채팅방 입장(처음 채팅이면 채팅방 생성(insert))
	 * @param targetNo
	 * @param memberNo
	 * @return
	 */
	int chattingEnter(int targetNo, int memberNo);

	
	/** 로그인한 회원과 채팅방이 생성된 리스트 조회
	 * @param memberNo
	 * @return
	 */
	List<ChattingRoom> selectRoomList(int memberNo);

	
	// 채팅 내역 조회
	List<Message> selectMessage(int chattingNo, int memberNo);

	/** 채팅 읽음 표시 기능
	 * @param chattingNo
	 * @param memberNo
	 * @return
	 */
	int updateReadFlag(int chattingNo, int memberNo);

	/** 메세지 DB에 삽입
	 * @param msg 
	 * @return
	 */
	int insertMessage(Message msg);

}
