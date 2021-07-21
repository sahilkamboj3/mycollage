package com.java_server.projects.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileStorageService {
    private final String absoluteDir = Paths.get("").toAbsolutePath().toString()
            + "/src/main/java/com/java_server/projects/Image/images/";
    private final Path fileStorageLocation;

    public FileStorageService() throws IOException {
        File absoluteDirFile = new File(this.absoluteDir);

        boolean folderExists = absoluteDirFile.exists();

        if (!folderExists) {
            System.out.println("Creating folder...");

            boolean folderCreated = absoluteDirFile.mkdir();

            if (folderCreated) {
                System.out.println("Directory created");
            } else {
                System.out.println("Directory not created"); // error handle here
            }
        } else {
            System.out.println("Directory already exists");
        }

        this.fileStorageLocation = Paths.get(this.absoluteDir).toAbsolutePath().normalize();
    }

    public void uploadFile(MultipartFile file) throws IOException {
        // byte[] fileBytes = file.getBytes();
        // InputStream stream = file.getInputStream();

        // Path path = this.fileStorageLocation.resolve(file.getOriginalFilename()); //
        // path for folder

        // Files.copy(file.getInputStream(), path);
        // handle S3 bucketing here

        // System.out.println("File copied");

        System.out.println(this.fileStorageLocation);
    }
}
