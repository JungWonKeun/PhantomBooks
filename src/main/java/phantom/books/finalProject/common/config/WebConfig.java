package phantom.books.finalProject.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    	
        registry.addResourceHandler("/css/**")
                .addResourceLocations("classpath:/static/css/");
        
        registry.addResourceHandler("/js/**")
        		.addResourceLocations("classpath:/static/js/");
        
        registry.addResourceHandler("/images/bookCover/**")
        		.addResourceLocations("file:///C:/images/bookCover/");
    }
    
    
    
   

   
}
