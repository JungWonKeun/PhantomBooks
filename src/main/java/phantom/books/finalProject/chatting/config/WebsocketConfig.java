package phantom.books.finalProject.chatting.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.HandshakeInterceptor;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.chatting.handler.ChattingWebsocketHandler;

@Configuration   // 서버실행시 메서드 모두 수행
@EnableWebSocket // 웹소켓을 사용하겠다!!는 설정(활성화)
@RequiredArgsConstructor
public class WebsocketConfig implements WebSocketConfigurer{	
	
	// SessionHandShakeInterceptor Bean 의존성 주입 받기
	private final HandshakeInterceptor handshakeInterceptor;
	
	// chattingWebsocketHandler Bean 의존성 주입받기
	private final ChattingWebsocketHandler chattingWebsocketHandler;
	
	
	
	// 웹소켓 핸들러 등록하는 메서드
	@Override
		public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
			registry
				// 핸들러 등록
				.addHandler(chattingWebsocketHandler, "/chattingSock")
				
				// 세션 가로채는 인터셉터 등록
				.addInterceptors(handshakeInterceptor)
				
				// 웹소켓 요청을 허용할 주소 패턴 작성
				.setAllowedOriginPatterns(
						"http://localhost/",
						"http://127.0.0.1/",
						"http://192.168.10.31/"
						)
				// SockJS 지원 + 브라우져 호환성 증
				.withSockJS();
		}
}
