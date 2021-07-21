package com.java_server.projects.Image.models;

public class S3Image {
    private String url;

    public S3Image() {
    }

    @Override
    public String toString() {
        return this.url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public S3Image(String url) {
        this.setUrl(url);
    }

}
