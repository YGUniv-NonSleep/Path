package com.capstone.pathproject.service.rest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class TmapService {

    private final WebClient tmapWebClient;

    public String walkPath(String sx, String sy, String ex, String ey) {
        System.out.println("sk api 요청");
        Map<String, String> map = new HashMap<>();
        map.put("startX", sx);
        map.put("startY", sy);
        map.put("endX", ex);
        map.put("endY", ey);
        map.put("startName", "출발지");
        map.put("endName", "목적지");
        map.put("speed", "4");
        Mono<String> mono = tmapWebClient.post()
                .uri(uriBuilder -> uriBuilder.path("/tmap/routes/pedestrian")
                        .queryParam("version", 1)
                        .build())
                .bodyValue(map)
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(String.class))
                .delaySubscription(Duration.ofMillis(100));
        return mono.block();
    }
}
