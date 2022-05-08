package com.capstone.pathproject.controller.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/odsay")
public class OdsayApiController {

    private final WebClient odsayWebClient;

    @Value("${api.odsay}")
    private String apiKey;

    // 대중교통 길찾기
    @GetMapping("/path")
    public List<String> path(@RequestParam String sx,
                             @RequestParam String sy,
                             @RequestParam String ex,
                             @RequestParam String ey) {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode path = null;
        List<String> mapObjs = new ArrayList<>();

        Mono<String> mono = odsayWebClient.get()
                .uri(uriBuilder -> uriBuilder.path("/v1/api/searchPubTransPathT")
                        .queryParam("apiKey", apiKey)
                        .queryParam("SX", sx)
                        .queryParam("SY", sy)
                        .queryParam("EX", ex)
                        .queryParam("EY", ey)
                        .build())
                .exchangeToMono(clientResponse -> {
                    return clientResponse.bodyToMono(String.class);
                });
        String json = mono.block();

        try {
            path = mapper.readTree(json).get("result").get("path");
        } catch (JsonProcessingException e) {
            log.error("JsonProcessingException : json 읽기 실패", e);
        }
        if (path == null) return null;
        for (int i = 0; i < path.size(); i++) {
            String mapObj = path.get(i).get("info").get("mapObj").asText();
            System.out.println("mapObj = " + mapObj);
            mapObjs.add(mapObj);
        }
        return mapObjs;
    }
}
