package com.java_server.projects.Image.lib;

import com.java_server.projects.Image.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Integer> {}

