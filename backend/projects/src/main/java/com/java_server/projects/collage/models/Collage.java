package com.java_server.projects.collage.models;

import javax.persistence.*;

@Entity
@Table(name = "collages")
public class Collage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int projectID;

    private String projectUUID;
    private String accountUUID;
    private String projectName;

    public Collage() {
    };

    public Collage(int projectID, String projectUUID, String accountUUID, String projectName) {
        this.projectID = projectID;
        this.projectUUID = projectUUID;
        this.accountUUID = accountUUID;
        this.projectName = projectName;
    }

    @Override
    public String toString() {
        return String.format("Collage[id=%id, projectName=%projectName, projectUUID=%projectUUID]", this.projectID,
                this.projectName, this.projectUUID);
    }

    public int getProjectID() {
        return projectID;
    }

    public void setProjectID(int projectID) {
        this.projectID = projectID;
    }

    public String getProjectUUID() {
        return projectUUID;
    }

    public void setProjectUUID(String projectUUID) {
        this.projectUUID = projectUUID;
    }

    public String getAccountUUID() {
        return accountUUID;
    }

    public void setAccountUUID(String accountUUID) {
        this.accountUUID = accountUUID;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }
}
