package com.capstone.pathproject.repository;

import com.capstone.pathproject.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByLoginId(String loginId);
}
