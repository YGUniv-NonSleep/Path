package com.capstone.pathproject.domain.member;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ROLE_USER, ROLE_BUSINESS, ROLE_ADMIN;

    @Override
    public String getAuthority() {
        return this.toString();
    }
}
