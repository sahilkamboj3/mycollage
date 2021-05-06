package com.java_server.projects.Image.controllers;

import com.java_server.projects.Image.lib.ImageRepository;
import com.java_server.projects.Image.models.Image;
import com.java_server.projects.util.ProjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/images")
public class ImageController {
    @Autowired
    private ImageRepository imageRepo;
    private final String imageNotFoundString = "Image with id %s not found";

    @GetMapping("/getAll")
    public List<Image> getAll() {
        return this.imageRepo.findAll();
    }

    @GetMapping("/getOne/{id}")
    public Image getOne(@PathVariable(value = "id") int id) throws ProjectNotFoundException {
        Image image = this.imageRepo.findById(id).orElseThrow(
                () -> new ProjectNotFoundException(String.format(imageNotFoundString, Integer.toString(id))));
        return image;
    }

    @PostMapping("create")
    public Image createImage(@Validated @RequestBody Image image) {
        // add code to add image to S3 bucket
        System.out.println(image);
        image.setImageURL("setImageUrl");
        return this.imageRepo.save(image);
    }

    @PutMapping("{id}")
    public Image updateImage(@PathVariable(value = "id") int id, @RequestBody Image newImageInfo)
            throws ProjectNotFoundException {
        Image image = this.imageRepo.findById(id).orElseThrow(
                () -> new ProjectNotFoundException(String.format(imageNotFoundString, Integer.toString(id))));

        image.setHeight(newImageInfo.getHeight());
        image.setWidth(newImageInfo.getWidth());
        image.setRot(newImageInfo.getRot());
        image.setPosX(newImageInfo.getPosX());
        image.setPosY(newImageInfo.getPosY());

        return this.imageRepo.save(image);
    }

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
