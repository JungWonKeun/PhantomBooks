package phantom.books.finalProject.chatting.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.chatting.dto.ChattingRoom;
import phantom.books.finalProject.chatting.dto.Message;
import phantom.books.finalProject.chatting.service.ChattingService;
import phantom.books.finalProject.member.dto.Member;

@Controller
@RequestMapping("admin/chatting")
@RequiredArgsConstructor
public class ChattingController {
	
	private final ChattingService service;
	
	@GetMapping("")
	public String chattingPage(
			@SessionAttribute("loginMember") Member loginMember,
			Model model
			) {
		
		List<ChattingRoom> roomList
			= service.selectRoomList(loginMember.getMemberNo());
		
		model.addAttribute("roomList", roomList);
		
		return "admin/adminChatting";
	}
	
	
	/** 채팅 상태 검색
	 * @param query : 상대 닉네임 또는 이메일
	 * @param loginMember : 로그인한 회원 정보
	 * @return 검색 결과(list)
	 */
	@GetMapping("selectTarget")
	@ResponseBody
	public List<Member> selectTarget(
			@RequestParam("query") String query,
			@SessionAttribute("loginMember") Member loginMember
			) {
		return service.selectTarget(query, loginMember.getMemberNo());
	}
		
	/** 채팅방 입장(처음 채팅이면 채팅방 생성(insert))
	 * @param targetNo
	 * @param loginMember
	 * @return 두 회원이 포함된 채팅방 번호
	 */
	@PostMapping("enter")
	@ResponseBody
	public int chattingEnter(
			@RequestBody int targetNo,
			@SessionAttribute("loginMember") Member loginMember
			) {
		
		int chattingNo = service.chattingEnter(targetNo, loginMember.getMemberNo());
		
		
		return chattingNo;
	}
	
	/**  로그인한 회원과 채팅방이 생성된 리스트 조회
	 * @param loginMember
	 * @return
	 */
	@ResponseBody
	@GetMapping("roomList")
	public List<ChattingRoom> selectRoomList(
			@SessionAttribute("loginMember") Member loginMember
			){
		return service.selectRoomList(loginMember.getMemberNo());
	}
	
	/** 로그인한 멤버와 채팅 내역 조회
	 * @param chattingNo
	 * @param loginMember
	 * @return
	 */
	@ResponseBody
	@GetMapping("selectMessage")
	public List<Message> selectMessage(
			@RequestParam("chattingNo") int chattingNo,
			@SessionAttribute("loginMember") Member loginMember){
		return service.selectMessage(chattingNo, loginMember.getMemberNo());
	}
	
	/** 채팅 읽음 표시 기능
	 * @param selectChattingNo
	 * @param loginMember
	 * @return
	 */
	@PutMapping("updateReadFlag")
	@ResponseBody
	public int updateReadFlag(
			@RequestBody int chattingNo,
			@SessionAttribute("loginMember") Member loginMember){
		
		return service.updateReadFlag(chattingNo, loginMember.getMemberNo());
	}
}
