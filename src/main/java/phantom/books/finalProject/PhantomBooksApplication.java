package phantom.books.finalProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.demo.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class})
public class PhantomBooksApplication {

	public static void main(String[] args) {
		SpringApplication.run(PhantomBooksApplication.class, args);
	}

}
