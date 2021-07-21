/*
 * package com.java_server.projects.websockets;
 * 
 * import org.springframework.context.annotation.Bean; import
 * org.springframework.context.annotation.Configuration; import
 * org.springframework.web.socket.WebSocketHandler; import
 * org.springframework.web.socket.config.annotation.EnableWebSocket; import
 * org.springframework.web.socket.config.annotation.WebSocketConfigurer; import
 * org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
 * 
 * @Configuration
 * 
 * @EnableWebSocket public class WebSocketConfig implements WebSocketConfigurer
 * {
 * 
 * @Override public void registerWebSocketHandlers(WebSocketHandlerRegistry
 * registry) { registry.addHandler(myHandler(),
 * "/myHandler").setAllowedOrigins("http://localhost:3000").withSockJS(); }
 * 
 * @Bean public WebSocketHandler myHandler() { return new MyHandler(); } }
 */

/*
 * package com.java_server.projects.websockets;
 * 
 * import org.springframework.web.socket.config.annotation.
 * EnableWebSocketMessageBroker; import
 * org.springframework.web.socket.config.annotation.StompEndpointRegistry;
 * import org.springframework.web.socket.config.annotation.
 * WebSocketMessageBrokerConfigurer; import
 * org.springframework.context.annotation.Configuration; import
 * org.springframework.messaging.simp.config.MessageBrokerRegistry;
 * 
 * @Configuration
 * 
 * @EnableWebSocketMessageBroker public class WebSocketConfig implements
 * WebSocketMessageBrokerConfigurer {
 * 
 * @Override public void registerStompEndpoints(StompEndpointRegistry registry)
 * { // endpoint for client to connect to server
 * registry.addEndpoint("/connect").setAllowedOrigins("http://localhost:3000").
 * withSockJS(); }
 * 
 * @Override public void configureMessageBroker(MessageBrokerRegistry config) {
 * config.setApplicationDestinationPrefixes("/app");
 * config.enableSimpleBroker("/topic", "/queue"); } }
 */
