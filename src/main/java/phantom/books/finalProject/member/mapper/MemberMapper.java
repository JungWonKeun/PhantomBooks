package phantom.books.finalProject.member.mapper;

import org.apache.ibatis.annotations.Mapper;

import phantom.books.finalProject.member.dto.Member;

@Mapper
public interface MemberMapper {

	Member login(String memberId);
}
