package phantom.books.finalProject.customer.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Notice {
    private int noticeId;       // 공지사항 ID
    private String title;       // 공지사항 제목
    private String content;     // 공지사항 내용
    private Date createdDate;   // 작성일
    private Date updatedDate;   // 수정일
    private int views;          // 조회수
    private int status;         // 상태 (1: 활성, 0: 비활성)
}
