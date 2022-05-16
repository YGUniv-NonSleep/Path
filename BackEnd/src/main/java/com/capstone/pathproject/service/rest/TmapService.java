package com.capstone.pathproject.service.rest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class TmapService {

    private final WebClient tmapWebClient;
    private final WebClient tmapWebClient2;

    public static int count = 0;

    public String walkPath(String sx, String sy, String ex, String ey) {
        Map<String, String> map = new HashMap<>();
        map.put("startX", sx);
        map.put("startY", sy);
        map.put("endX", ex);
        map.put("endY", ey);
        map.put("startName", "출발지");
        map.put("endName", "목적지");
        map.put("speed", "4");

        if (count < 3) {
            count++;
            return getWalkPath(map).block();
        }
        count = 0;
        return getWalkPath2(map).block();
    }

    private Mono<String> getWalkPath(Map<String, String> map) {
        return tmapWebClient.post()
                .uri(uriBuilder -> uriBuilder.path("/tmap/routes/pedestrian")
                        .queryParam("version", 1)
                        .build())
                .bodyValue(map)
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(String.class));
    }

    private Mono<String> getWalkPath2(Map<String, String> map) {
        return tmapWebClient2.post()
                .uri(uriBuilder -> uriBuilder.path("/tmap/routes/pedestrian")
                        .queryParam("version", 1)
                        .build())
                .bodyValue(map)
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(String.class));
    }
}
