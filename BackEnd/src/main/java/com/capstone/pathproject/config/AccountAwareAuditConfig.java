package com.capstone.pathproject.config;

import com.capstone.pathproject.security.auth.PrincipalDetails;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

@Configuration
public class AccountAwareAuditConfig implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) return Optional.empty();
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        return Optional.of(principalDetails.getMember().getLoginId());
    }
}
