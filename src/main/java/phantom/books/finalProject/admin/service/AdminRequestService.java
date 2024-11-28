package phantom.books.finalProject.admin.service;

import phantom.books.finalProject.admin.dto.Request;
import phantom.books.finalProject.searchBookPage.dto.Book;

public interface AdminRequestService {

	// 이메일 발송
	int requestEmail(String htmlName, Book book);

	// 신간 신청 이메일 발송 및 신간 등록
	int newBookRequest(String string, Request request);
}
