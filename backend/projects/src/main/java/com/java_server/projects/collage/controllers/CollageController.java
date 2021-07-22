package com.java_server.projects.collage.controllers;

import com.java_server.projects.collage.lib.CollageRepo;
import com.java_server.projects.collage.models.Collage;
import com.java_server.projects.util.ProjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
// import javax.servlet.http.HttpSession;
// import javax.servlet.http.Cookie;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = { "*" })
@RequestMapping("/collage/")
@Validated
public class CollageController {
    @Autowired
    private CollageRepo collageRepo;
    private final String collageNotFoundString = "Collage with id %s not found";

    // get mappings
    @GetMapping("getAll")
    public List<Collage> getAll() {
        return this.collageRepo.findAll();
    }

    // get specific collage
    @GetMapping("getOne/{id}")
    public Collage getOne(@PathVariable(value = "id") int id) throws ProjectNotFoundException {
        Collage collage = this.collageRepo.findById(id).orElseThrow(
                () -> new ProjectNotFoundException(String.format(collageNotFoundString, Integer.toString(id))));
        return collage;
    }

    // get specific collage name
    @GetMapping("collageName/{collageUUID}")
    public HashMap<String, String> getCollageName(@PathVariable(value = "collageUUID") String collageUUID)
            throws ProjectNotFoundException {
        String collageName = this.collageRepo.findCollageNameByCollageUUID(collageUUID);
        System.out.println(collageName);
        HashMap<String, String> res = new HashMap<String, String>();
        res.put("collageName", collageName);
        System.out.println(res);
        return res;
        // return ResponseEntity.ok().body(collageName);
    }

    // get collages based on userUUID
    @GetMapping("getAll/{id}")
    public Optional<List<Collage>> getAllOnUserUUID(@PathVariable(value = "id") String userUUID) {
        Optional<List<Collage>> collages = this.collageRepo.findCollagesByUserUUID(userUUID);
        return collages;
    }

    // post mappings
    @PostMapping("create")
    public ResponseEntity<Collage> createCollage(@Validated @RequestBody Collage collage, HttpServletRequest request) {
        // set collage uuid
        UUID uuid = UUID.randomUUID();
        collage.setProjectUUID(uuid.toString());

        Collage resCollage = this.collageRepo.save(collage);

        return ResponseEntity.ok().body(resCollage);
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
