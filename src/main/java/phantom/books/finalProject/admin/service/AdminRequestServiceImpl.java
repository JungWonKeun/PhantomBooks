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
import phantom.books.finalProject.admin.dto.Request;
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
				
				mapper.updateEmail(email, book.getCompanyName());
				
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
	
	// 기존 책 발주 시 이메일 보내는 내용
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
	
	/**
	 * 신간 요청 및 요청 이메일 발송
	 */
	@Override
	public int newBookRequest(String htmlName, Request request) {
		
		int result = mapper.insertNewBookList(request);
		
		if(result > 0) {
			
			result = mapper.insertNewBookRequest(request);
			
			if(result > 0) {
				try {
					mapper.updateCompany(request);
					
					String emailTitle = "[PhantomBooks] "+request.getBookTitle()+" 발주 요청 이메일 입니다."; // 발송되는 이메일 제목
					
					/*---- 메일 발송 ----*/
					MimeMessage mimeMessage = mailSender.createMimeMessage();
					
					MimeMessageHelper helper 
						= new MimeMessageHelper(mimeMessage, true, "UTF-8");
					
					String email = request.getEmail();
					
					helper.setTo(email); // 받는 사람 이메일 세팅
					helper.setSubject(emailTitle); // 이메일 제목 세팅
					
					
					helper.setText(loadHtml(htmlName, request),true); // 이메일 내용
					
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
		}
		return result; 
	}
	
	// 신간 책 발주 시 이메일 보내는 내용
	private String loadHtml(String htmlName, Request request)  {
		
		Context context = new Context();
		
		String bookTitle 		= request.getBookTitle();
		String bookWriter  	= request.getBookWriter();
		String bookPrice 	 	= request.getRequestPrice();
		int		 currentCount = request.getRequestCount();
		String companyName 	= request.getCompanyName();
		String today     	 	= request.getInsertDate();
		
		context.setVariable("bookTitle", bookTitle);
		context.setVariable("companyName", companyName);
		context.setVariable("bookPrice", bookPrice);
		context.setVariable("currentCount", currentCount);
		context.setVariable("bookWriter", bookWriter);
		context.setVariable("today", today);
		
		return templateEngine.process("email/" + htmlName, context);
	}
	
	
}
