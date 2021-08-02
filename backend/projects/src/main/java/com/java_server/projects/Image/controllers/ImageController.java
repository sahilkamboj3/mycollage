package com.java_server.projects.Image.controllers;

import com.java_server.projects.Image.lib.ImageRepository;
import com.java_server.projects.Image.models.Image;
import com.java_server.projects.Image.models.S3Image;
import com.java_server.projects.aws_services.S3StorageService;
import com.java_server.projects.util.ProjectNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Controller
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = { "*" })
@RequestMapping("/images/")
@Validated
public class ImageController {
    @Autowired
    private ImageRepository imageRepo;

    /*
     * See why didn't work
     * 
     * @Autowired private FileStorageService service;
     */

    private final S3StorageService s3Service = new S3StorageService();
    private final String imageNotFoundString = "Image with id %s not found";

    // get mappings
    @GetMapping("getAll")
    public List<Image> getAll() {
        return this.imageRepo.findAll();
    }

    @GetMapping("getOne/{id}")
    public Image getOne(@PathVariable(value = "id") int id) throws ProjectNotFoundException {
        Image image = this.imageRepo.findById(id).orElseThrow(
                () -> new ProjectNotFoundException(String.format(imageNotFoundString, Integer.toString(id))));
        return image;
    }

    // get images based on collage uuid
    @GetMapping("getAll/{id}")
    public Optional<List<Image>> getAllOnCollageUUID(@PathVariable(value = "id") String id) {
        Optional<List<Image>> images = this.imageRepo.getAllOnCollageUUID(id);
        return images;
    }

    // post mappings
    @PostMapping("create/{userUUID}/{collageUUID}")
    public ResponseEntity<Image> createImage(@RequestParam("file") MultipartFile file,
            @PathVariable("userUUID") String userUUID, @PathVariable("collageUUID") String collageUUID)
            throws IOException {

        String imageUrl = s3Service.uploadFileObject(file, userUUID, collageUUID);

        Image newImage = new Image();

        UUID uuid = UUID.randomUUID();
        newImage.setImageUUID(uuid.toString());
        newImage.setProjectUUID(collageUUID);
        newImage.setImageURL(imageUrl);
        newImage.setRot(1.0);
        newImage.setPosX(0.00000);
        newImage.setPosY(0.00000);
        newImage.setWidth(-1.0);
        newImage.setHeight(-1.0);

        Image dbResImage = this.imageRepo.save(newImage);

        return ResponseEntity.ok().body(dbResImage);
    }

    @PostMapping("getPresignedUrl")
    public HashMap<String, String> test(@RequestBody S3Image image) {
        String url = image.getUrl();
        int prefixIndex = url.lastIndexOf('=');
        String key = url.substring(prefixIndex + 1);
        key = key.replace('+', ' ');
        String presignedUrl = this.s3Service.getPresignedUrl(key);
        HashMap<String, String> res = new HashMap<String, String>();
        res.put("url", presignedUrl);
        return res;
    }

    // put mappings - TODO - convert to websockets
    @PutMapping("{id}")
    public Image updateImage(@PathVariable(value = "id") int id, @RequestBody Image newImageInfo)
            throws ProjectNotFoundException {
        Image image = this.imageRepo.findById(id).orElseThrow(
                () -> new ProjectNotFoundException(String.format(imageNotFoundString, Integer.toString(id))));

        System.out.println(newImageInfo.getZIndex());

        image.setZIndex(newImageInfo.getZIndex());
        image.setHeight(newImageInfo.getHeight());
        image.setWidth(newImageInfo.getWidth());
        image.setRot(newImageInfo.getRot());
        image.setPosX(newImageInfo.getPosX());
        image.setPosY(newImageInfo.getPosY());

        return this.imageRepo.save(image);
    }

    // delete mappings
    @DeleteMapping("{id}")
    public Map<String, String> deleteOne(@PathVariable(value = "id") int id) throws ProjectNotFoundException {
        Image image = this.imageRepo.findById(id).orElseThrow(
                () -> new ProjectNotFoundException(String.format(imageNotFoundString, Integer.toString(id))));
        // add code to remove URL from S3 bucket
        String imageURL = image.getImageURL();

        this.imageRepo.deleteById(id);

        Map<String, String> res = new HashMap<>();
        res.put("status", "200");
        res.put("response", "Image deleted");

        return res;
    }
}
