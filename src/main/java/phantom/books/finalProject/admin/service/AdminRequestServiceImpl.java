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
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.service.AdminRequestService;
import phantom.books.finalProject.common.util.RedisUtil;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.admin.mapper.AdminRequestMapper;


@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AdminRequestServiceImpl implements AdminRequestService {
	
	private final AdminRequestMapper mapper;
	
	private final JavaMailSender mailSender; 
	
	private final RedisUtil redisUtil; 
	
	private final SpringTemplateEngine templateEngine;
	
	// 이메일 발송
	@Override
	public int requestEmail(String htmlName, Book book) {
		
		int result = mapper.insertRequestList(book);
		
		if(result > 0) {
			try {
				
				String emailTitle = "[PhantomBooks] "+book.getBookTitle()+" 발주 요청 이메일 입니다."; // 발송되는 이메일 제목
				
				/*---- 메일 발송 ----*/
				MimeMessage mimeMessage = mailSender.createMimeMessage();
				
				MimeMessageHelper helper 
					= new MimeMessageHelper(mimeMessage, true, "UTF-8");
				
				String email = book.getEmail();
				
				helper.setTo(email); // 받는 사람 이메일 세팅
				helper.setSubject(emailTitle); // 이메일 제목 세팅
				
				
				helper.setText(loadHtml(htmlName, book),true); // 이메일 내용
				
				helper.addInline("logo", 
						new ClassPathResource("static/images/logo.png"));
				
				// 메일 발송하기
				mailSender.send(mimeMessage);
				
				
				log.debug("result : {}", result);
				
			}catch (Exception e) {
				e.printStackTrace();
				return 0; // 예외 발생 == 실패 == 0 반환
			}
			
		}
		return result; 
	}
	
	
	private String loadHtml(String htmlName, Book book)  {
		
		Context context = new Context();
		
		String bookTitle 		= book.getBookTitle();
		String bookWriter  	= book.getBookWriter();
		String bookPrice 	 	= book.getBookPrice();
		int		 currentCount = book.getCurrentCount();
		String companyName 	= book.getCompanyName();
		String today     	 	= book.getInsertDate();
		
		context.setVariable("bookTitle", bookTitle);
		context.setVariable("companyName", companyName);
		context.setVariable("bookPrice", bookPrice);
		context.setVariable("currentCount", currentCount);
		context.setVariable("bookWriter", bookWriter);
		context.setVariable("today", today);
		
		return templateEngine.process("email/" + htmlName, context);
	}
	
	
}
