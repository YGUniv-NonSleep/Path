package com.capstone.pathproject;

import com.capstone.pathproject.security.auth.PrincipalDetails;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@EnableJpaAuditing
@SpringBootApplication
public class PathProjectApplication {
    public static void main(String[] args) {
        SpringApplication.run(PathProjectApplication.class, args);
    }
}
