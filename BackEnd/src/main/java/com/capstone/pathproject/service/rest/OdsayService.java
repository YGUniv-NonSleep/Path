package com.capstone.pathproject.service.rest;

import com.capstone.pathproject.dto.rest.odsay.graph.GraphPos;
import com.capstone.pathproject.dto.rest.odsay.graph.RouteGraphicDTO;
import com.capstone.pathproject.dto.rest.odsay.path.Path;
import com.capstone.pathproject.dto.rest.odsay.path.SubPath;
import com.capstone.pathproject.dto.rest.odsay.path.TransPathDTO;
import com.capstone.pathproject.dto.rest.tmap.path.WalkPathDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class OdsayService {

    private final WebClient odsayWebClient;
    private final TmapService tmapService;

    @Value("${api.odsay}")
    private String apiKey;

    //대중교통 길찾기
    public List<Map<String, Object>> TransPath(String sx, String sy, String ex, String ey) throws JsonProcessingException {
        ObjectMapper mapper = getObjectMapper();
        TransPathDTO transPathDTO = mapper.readValue(findTransPath(sx, sy, ex, ey), TransPathDTO.class);
        List<Path> paths = transPathDTO.getPath();
        Collections.sort(paths);
        List<Map<String, Object>> results = new ArrayList<>();
        for (Path path : paths) {
            Map<String, Object> map = new HashMap<>();
            String jsonRouteGraphic = routeGraphicData(path.getInfo().getMapObj());
            RouteGraphicDTO routeGraphicDTO = mapper.readValue(jsonRouteGraphic, RouteGraphicDTO.class);
            map.put("totalTime", path.getInfo().getTotalTime());
            map.put("payment", path.getInfo().getPayment());
            map.put("pathType", path.getPathType());
            map.put("busTransitCount", path.getInfo().getBusTransitCount());
            map.put("subwayTransitCount", path.getInfo().getSubwayTransitCount());
            map.put("routeGraphic", routeGraphicDTO);
            results.add(map);
        }
        return results;
    }

    public ObjectMapper getObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return mapper;
    }

    public String findTransPath(String sx, String sy, String ex, String ey) {
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
        return mono.block();
    }

    public String routeGraphicData(String mapObj) throws JsonProcessingException {
        Mono<String> mono = odsayWebClient.get()
                .uri(uriBuilder ->
                        uriBuilder.path("/v1/api/loadLane")
                                .queryParam("apiKey", apiKey)
                                .queryParam("mapObject", "0:0@" + mapObj)
                                .build())
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(String.class));
        return mono.block();
    }
}
