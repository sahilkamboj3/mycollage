package com.java_server.projects.Image.lib;

import java.util.List;
import java.util.Optional;

import com.java_server.projects.Image.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    @Query(value = "SELECT * FROM images WHERE projectuuid = :collageUUID", nativeQuery = true)
    Optional<List<Image>> getAllOnCollageUUID(String collageUUID);
}
