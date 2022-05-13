package com.capstone.pathproject.controller.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/kakao")
public class KakaoApiController {

    private final WebClient kakaoWebClient;

    @Value("${api.kakao}")
    private String apiKey;

    // 주소검색하기
    @GetMapping("/search")
    public String search(@RequestParam String query) {
        Mono<String> mono = kakaoWebClient.get()
                .uri(uriBuilder -> uriBuilder.path("/v2/local/search/address.json")
                        .queryParam("query", query)
                        .build()
                )
                .exchangeToMono(clientResponse -> {
                    return clientResponse.bodyToMono(String.class);
                });
        return mono.block();
    }

    // 키워드로 장소 검색하기
    @GetMapping("/search/keyword")
    public String searchKeyword(@RequestParam String query) {
        Mono<String> mono = kakaoWebClient.get()
                .uri(uriBuilder -> uriBuilder.path("/v2/local/search/keyword.json")
                        .queryParam("query", query)
                        .build())
                .exchangeToMono(clientResponse -> {
                    return clientResponse.bodyToMono(String.class);
                });
        return mono.block();
    }

    // 좌표로 행정구역정보 받기
    @GetMapping("/coord2regioncode")
    public String coord2regioncode(@RequestParam String x, @RequestParam String y) {
        Mono<String> mono = kakaoWebClient.get()
                .uri(uriBuilder -> uriBuilder.path("/v2/local/geo/coord2regioncode.json")
                        .queryParam("x", x)
                        .queryParam("y", y)
                        .build()
                )
                .exchangeToMono(clientResponse -> {
                    return clientResponse.bodyToMono(String.class);
                });
        return mono.block();
    }
}
