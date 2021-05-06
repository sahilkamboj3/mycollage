package com.java_server.projects.util;

public class ProjectNotFoundException extends RuntimeException {
    public ProjectNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ProjectNotFoundException(String message) {
        super(message);
    }
}
