package phantom.books.finalProject.admin.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.admin.service.AdminRequestService;
import phantom.books.finalProject.common.util.RedisUtil;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.admin.mapper.AdminRequestMapper;


@Service
@RequiredArgsConstructor
@Transactional
public class AdminRequestServiceImpl implements AdminRequestService {
	
	private final AdminRequestMapper mapper;
	
	private final JavaMailSender mailSender; 
	
	private final RedisUtil redisUtil; 
	
	private final SpringTemplateEngine templateEngine;
	
	// 이메일 발송
	@Override
	public int requestEmail(String htmlName, Book book) {
		
		try {
			
			String emailTitle = "[PhantomBooks] "+book.getBookTitle()+" 발주 요청 이메일 입니다."; // 발송되는 이메일 제목
			
			/*---- 메일 발송 ----*/

			// MimeMessage : 메일 발송 객체
			MimeMessage mimeMessage = mailSender.createMimeMessage();
			
			// MimeMessageHelper :
			//  Spring에서 제공하는 메일 발송 도우미
			
			// 매개변수 1 : MimeMessage
			// 매개변수 2 : 이메일에 파일 첨부 여부(true : 첨부 O / false : 첨부 X)
			// 매개변수 3 : 발송되는 이메일의 문자 인코딩 지정
			MimeMessageHelper helper 
				= new MimeMessageHelper(mimeMessage, true, "UTF-8");
			
			
			helper.setTo(book.getEmail()); // 받는 사람 이메일 세팅
			helper.setSubject(emailTitle); // 이메일 제목 세팅
			
			helper.setText(loadHtml(htmlName, book),true); // 이메일 내용
			// 매개변수 1 : 이메일 내용
			// 매개변수 2 : HTML 코드 해석 여부 지정(true == 해석 O)
			
			// 지정된 HTML 파일에 authKey가 첨부된 후 
			// HTML 코드 전체가 하나의 String으로 변화되서 반환 받은 후
			// 변환된 String을 메일 내용으로 세팅
			
			
			// CID(Content-ID)를 이용해 메일에 이미지 첨부
			helper.addInline("logo", 
					new ClassPathResource("static/images/logo.png"));
			
			// 메일 발송하기
			mailSender.send(mimeMessage);
			
			
		}catch (Exception e) {
			e.printStackTrace();
			return 0; // 예외 발생 == 실패 == 0 반환
		}
		
		return 1; // 예외 발생 X == 성공 == 1 반환
	}
	
	
	public String loadHtml(Book book, String htmlName) {
		
		Context context = new Context();
		
		context.setVariable("book", book);
		
		return templateEngine.process("email/" + htmlName, context);
		
	}
}
