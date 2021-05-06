package com.java_server.projects.Image.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int imageID;
    private long imageUUID;
    private long projectUUID; // reference to project
    private int rot;
    private int posX;
    private int posY;
    private int height;
    private int width;
    private String imageURL;

    public Image() {};

    public Image(int imageID, long imageUUID, long projectUUID, int rot, int posX, int posY, int height, int width, String imageURL) {
        this.imageID = imageID;
        this.imageUUID = imageUUID;
        this.projectUUID = projectUUID;
        this.rot = rot;
        this.posX = posX;
        this.posY = posY;
        this.height = height;
        this.width = width;
        this.imageURL = imageURL;
    }

    @Override
    public String toString() {
        return String.format("Image[imageID=%imageID, projectUUID=%projectUUID]", this.imageID,this.projectUUID);
    }

    public int getImageID() {
        return imageID;
    }

    public void setImageID(int imageID) {
        this.imageID = imageID;
    }

    public long getProjectUUID() {
        return projectUUID;
    }

    public void setProjectUUID(long projectUUID) {
        this.projectUUID = projectUUID;
    }

    public int getRot() {
        return rot;
    }

    public void setRot(int rot) {
        this.rot = rot;
    }

    public int getPosX() {
        return posX;
    }

    public void setPosX(int posX) {
        this.posX = posX;
    }

    public int getPosY() {
        return posY;
    }

    public void setPosY(int posY) {
        this.posY = posY;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public long getImageUUID() {
        return imageUUID;
    }

    public void setImageUUID(long imageUUID) {
        this.imageUUID = imageUUID;
    }
}
