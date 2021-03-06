package com.capstone.pathproject.config.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class KakaoConfig {

    @Value("${api.kakao}")
    private String apiKey;

    @Bean
    public WebClient kakaoWebClient() {
        return WebClient.builder()
                .baseUrl("https://dapi.kakao.com")
                .defaultHeader("Authorization", "KakaoAK " + apiKey)
                .build();
    }
}
