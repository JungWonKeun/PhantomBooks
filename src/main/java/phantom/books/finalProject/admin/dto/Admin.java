package phantom.books.finalProject.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Admin {
	
	private String adminId;
	private String adminPw;
	private String adminName;
	private String adminEmail;
	
}
