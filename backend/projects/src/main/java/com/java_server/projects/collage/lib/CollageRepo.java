package com.java_server.projects.collage.lib;

import java.util.List;
import java.util.Optional;

import com.java_server.projects.collage.models.Collage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CollageRepo extends JpaRepository<Collage, Integer> {
    @Query(value = "SELECT * FROM collages WHERE accountuuid = :userUUID", nativeQuery = true)
    Optional<List<Collage>> findCollagesByUserUUID(String userUUID);
}
