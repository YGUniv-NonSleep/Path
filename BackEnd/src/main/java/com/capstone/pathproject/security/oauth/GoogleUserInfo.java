package com.capstone.pathproject.security.oauth;

import java.util.Map;

public class GoogleUserInfo implements OAuth2UserInfo {

    private Map<String, Object> attributes;

    public GoogleUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getProviderId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getProvider() {
        return "google";
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getGender() {
        return null;
    }

    @Override
    public String getMobile() {
        return null;
    }

    @Override
    public String getBirthday() {
        return null;
    }

    @Override
    public String getBirthyear() {
        return null;
    }
}
