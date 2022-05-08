package com.capstone.pathproject.controller.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.UnknownHostException;
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
    @GetMapping("/path/trans")
    public List<String> TransPath() {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode path = null;
        List<String> mapObjs = new ArrayList<>();

        Mono<String> mono = odsayWebClient.get()
                .uri(uriBuilder -> uriBuilder.path("/v1/api/searchPubTransPathT")
                        .queryParam("apiKey", apiKey)
                        .queryParam("lang", "0")
                        .queryParam("SX", "128.62269785225394")
                        .queryParam("SY", "35.89624784236353")
                        .queryParam("EX", "128.628393775388")
                        .queryParam("EY", "35.8793239931795")
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
