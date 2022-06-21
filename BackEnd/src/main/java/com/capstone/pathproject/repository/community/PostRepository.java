package com.capstone.pathproject.repository.community;

import com.capstone.pathproject.domain.community.Post;
import com.capstone.pathproject.domain.community.PostType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;


public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findByTitleContaining(String keyword,Pageable pageable);
    List<Post> findByParentIsNullAndType(PostType type, Pageable pageable);
    Optional<Post> findByParentId(Long id);
    @Modifying
    @Query("update Post p set p.view = p.view + 1 where p.id = :id")
    int updateView(@Param("id") Long id);
}
