/*
 * 
 * package com.java_server.projects.websockets;
 * 
 * import java.io.IOException;
 * 
 * import javax.servlet.annotation.WebServlet; import
 * javax.servlet.http.HttpServlet; import javax.servlet.http.HttpServletRequest;
 * import javax.servlet.http.HttpServletResponse;
 * 
 * import io.socket.engineio.server.EngineIoServer; import
 * io.socket.socketio.server.SocketIoNamespace; import
 * io.socket.socketio.server.SocketIoServer; import
 * io.socket.socketio.server.SocketIoSocket;
 * 
 * @WebServlet("/socket.io/*") public class SocketIOServlet extends HttpServlet
 * { private final EngineIoServer engineIoServer = new EngineIoServer(); private
 * final SocketIoServer socketIoServer = new SocketIoServer(engineIoServer);
 * private SocketIoNamespace namespace = socketIoServer.namespace("/");
 * 
 * namespace.on("connection", new Emitter.Listener() { // @Override public void
 * call(Object... args) { SocketIoSocket socket = (SocketIoSocket) args[0]; //
 * Do something with socket } });
 * 
 * @Override protected void service(HttpServletRequest request,
 * HttpServletResponse response) throws IOException {
 * engineIoServer.handleRequest(request, response); }
 * 
 * }
 *
 */
