package com.java_server.projects.collage.controllers;

import com.java_server.projects.collage.lib.CollageRepo;
import com.java_server.projects.collage.models.Collage;
import com.java_server.projects.util.ProjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/collage/")
public class CollageController {
    @Autowired
    private CollageRepo collageRepo;
    private final String collageNotFoundString = "Collage with id %s not found";

    // get mappings
    @GetMapping("getAll")
    public List<Collage> getAll() {
        return this.collageRepo.findAll();
    }

    @GetMapping("getOne/{id}")
    public Collage getOne(@PathVariable(value = "id") int id) throws ProjectNotFoundException {
        Collage collage = this.collageRepo.findById(id).orElseThrow(
                () -> new ProjectNotFoundException(String.format(collageNotFoundString, Integer.toString(id))));
        return collage;
    }

    @GetMapping("getAll/{id}")
    public Optional<List<Collage>> getAllOnUserUUID(@PathVariable(value = "id") String userUUID) {
        System.out.println("userUUID: " + userUUID);
        Optional<List<Collage>> collages = this.collageRepo.findCollageByUserUUID(userUUID);
        return collages;
    }

    // post mappings
    @PostMapping("create")
    public Collage createCollage(@Validated @RequestBody Collage collage) {
        return this.collageRepo.save(collage);
    }

    // put mappings
    @PutMapping("{id}")
    public Collage updateCollage(@PathVariable(value = "id") int id, @RequestBody Collage updatedCollageInfo) {
        Collage collage = this.collageRepo.findById(id).orElseThrow(
                () -> new ProjectNotFoundException(String.format(collageNotFoundString, Integer.toString(id))));

        String accountUUID = updatedCollageInfo.getAccountUUID();
        String projectName = updatedCollageInfo.getProjectName();

        if (accountUUID != "") {
            collage.setAccountUUID(accountUUID);
        }
        if (projectName != null) {
            collage.setProjectName(projectName);
        }

        collageRepo.save(collage);

        return collage;
    }

    // delete mappings
    @DeleteMapping("{id}")
    public Map<String, String> deleteOne(@PathVariable(value = "id") int id) throws ProjectNotFoundException {
        this.collageRepo.findById(id).orElseThrow(
                () -> new ProjectNotFoundException(String.format(collageNotFoundString, Integer.toString(id))));
        this.collageRepo.deleteById(id);

        Map<String, String> res = new HashMap<>();
        res.put("status", "200");
        res.put("response", "Account deleted");

        return res;
    }
}
