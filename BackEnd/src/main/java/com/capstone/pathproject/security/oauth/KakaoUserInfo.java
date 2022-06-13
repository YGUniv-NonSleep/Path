package com.capstone.pathproject.security.oauth;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo {

    private Map<String, Object> attributes;

    public KakaoUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getProviderId() {
        return String.valueOf(attributes.get("id"));
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getEmail() {
        return (String) ((Map<String, Object>) attributes.get("kakao_account")).get("email");
    }

    @Override
    public String getName() {
        return (String) ((Map<String, Object>) attributes.get("properties")).get("nickname");

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
