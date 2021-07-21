package com.java_server.projects.Image.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

// import org.hibernate.annotations.ColumnDefault;
// import org.springframework.beans.factory.annotation.Value;

@Entity
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int imageID;
    private String imageUUID;
    private String projectUUID; // reference to project
    private double rot;
    private double posX;
    private double posY;
    private double height;
    private double width;
    private int zIndex = 1;
    private String imageURL;

    public Image() {
    };

    public Image(int imageID, String imageUUID, String projectUUID, double rot, double posX, double posY, double height,
            double width, String imageURL) { // without zIndex
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

    public Image(int imageID, String imageUUID, String projectUUID, double rot, double posX, double posY, double height,
            double width, String imageURL, int zIndex) {
        this.imageID = imageID;
        this.imageUUID = imageUUID;
        this.projectUUID = projectUUID;
        this.rot = rot;
        this.posX = posX;
        this.posY = posY;
        this.height = height;
        this.width = width;
        this.imageURL = imageURL;
        this.zIndex = zIndex;
    }

    @Override
    public String toString() {
        return String.format("Image[imageID=%imageID, projectUUID=%projectUUID]", this.imageID, this.projectUUID);
    }

    public int getZIndex() {
        return zIndex;
    }

    public void setZIndex(int zIndex) {
        this.zIndex = zIndex;
    }

    public int getImageID() {
        return imageID;
    }

    public void setImageID(int imageID) {
        this.imageID = imageID;
    }

    public String getProjectUUID() {
        return projectUUID;
    }

    public void setProjectUUID(String projectUUID) {
        this.projectUUID = projectUUID;
    }

    public double getRot() {
        return rot;
    }

    public void setRot(double rot) {
        this.rot = rot;
    }

    public double getPosX() {
        return posX;
    }

    public void setPosX(double posX) {
        this.posX = posX;
    }

    public double getPosY() {
        return posY;
    }

    public void setPosY(double posY) {
        this.posY = posY;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getImageUUID() {
        return imageUUID;
    }

    public void setImageUUID(String imageUUID) {
        this.imageUUID = imageUUID;
    }

}
