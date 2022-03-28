package com.capstone.pathproject.repository;

import com.capstone.pathproject.domain.community.Post;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


import java.util.List;


public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findByTitleContaining(String keyword,Pageable pageable);

    @Modifying
    @Query("update Post p set p.view = p.view + 1 where p.id = :id")
    int updateView(Long id);
}
