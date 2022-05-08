package com.capstone.pathproject.service.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OdsayService {

    private final WebClient odsayWebClient;

    @Value("${api.odsay}")
    private String apiKey;

    //대중교통 길찾기
    public List<JsonNode> TransPath(String sx, String sy, String ex, String ey) {
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
        String jsonPath = mono.block();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode path = null;
        try {
            path = mapper.readTree(jsonPath).get("result").get("path");
        } catch (JsonProcessingException e) {
            log.error("JsonProcessingException : json 읽기 실패", e);
        }
        if (path == null) return null;
        List<String> mapObjs = new ArrayList<>();
        for (int i = 0; i < path.size(); i++) {
            String mapObj = path.get(i).get("info").get("mapObj").asText();
            System.out.println("mapObj = " + mapObj);
            mapObjs.add(mapObj);
        }
        return routeGraphicData(mapObjs);
    }

    public List<JsonNode> routeGraphicData(List<String> mapObjs) {
        log.info("노선 그래픽 데이터 검색 시작 : ODsay API");
        List<JsonNode> loadLanes = new ArrayList<>();
        for (String mapObj : mapObjs) {
            Mono<String> mono = odsayWebClient.get()
                    .uri(uriBuilder ->
                            uriBuilder.path("/v1/api/loadLane")
                                    .queryParam("apiKey", apiKey)
                                    .queryParam("mapObject", "0:0@" + mapObj)
                                    .build())
                    .exchangeToMono(clientResponse -> clientResponse.bodyToMono(String.class));
            String json = mono.block();
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = null;
            try {
                jsonNode = mapper.readTree(json).get("result");
            } catch (JsonProcessingException e) {
                log.error("JsonProcessingException : json 변환 실패", e);
            }
            loadLanes.add(jsonNode);
        }
        return loadLanes;
    }

}
