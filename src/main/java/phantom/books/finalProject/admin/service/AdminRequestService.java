package phantom.books.finalProject.admin.service;

import phantom.books.finalProject.searchBookPage.dto.Book;

public interface AdminRequestService {

	// 이메일 발송
	int requestEmail(String htmlName, Book book);
}
