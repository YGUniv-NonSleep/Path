package com.capstone.pathproject.security.oauth;

public interface OAuth2UserInfo {
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();
    String getGender();
    String getMobile();
    String getBirthday();
    String getBirthyear();
}
