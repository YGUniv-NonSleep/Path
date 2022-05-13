package com.capstone.pathproject.service.rest;

import com.capstone.pathproject.domain.mobility.Mobility;
import com.capstone.pathproject.domain.mobility.MobilityCompany;
import com.capstone.pathproject.dto.rest.odsay.graph.RouteGraphicDTO;
import com.capstone.pathproject.dto.rest.odsay.path.Path;
import com.capstone.pathproject.dto.rest.odsay.path.SubPath;
import com.capstone.pathproject.dto.rest.odsay.path.TransPathDto;
import com.capstone.pathproject.dto.rest.tmap.path.WalkPathDto;
import com.capstone.pathproject.repository.mobility.MobilityRepository;
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
    private final MobilityRepository mobilityRepository;

    @Value("${api.odsay}")
    private String apiKey;

    public List<Map<String, Object>> transPaths(String sx, String sy, String ex, String ey) throws JsonProcessingException {
        ObjectMapper mapper = getObjectMapper();
        TransPathDto transPathDto = mapper.readValue(findTransPath(sx, sy, ex, ey), TransPathDto.class);
        List<Path> paths = transPathDto.getResult().getPath();
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

    public List<Map<String, Object>> transPathsWithMobility(String sx, String sy, String ex, String ey, Long firstMobilityId) throws JsonProcessingException {
        Optional<Mobility> findMobility = mobilityRepository.findById(firstMobilityId);
        Mobility mobility = findMobility.orElse(null);
        if (mobility == null) return null;
        String mx = String.valueOf(mobility.getLongitude());
        String my = String.valueOf(mobility.getLatitude());

        MobilityCompany mobilityCompany = mobility.getMobilityCompany();

        ObjectMapper mapper = getObjectMapper();
        String jsonWalkPath = tmapService.walkPath(sx, sy, mx, my);
        WalkPathDto walkPathDto = mapper.readValue(jsonWalkPath, WalkPathDto.class);
        int firstWalkTotalTimeSec = walkPathDto.getFeatures().get(0).getProperties().getTotalTime();
        // 출발지 -> 퍼스널 모빌리티 위치까지 도보 시간
        int firstWalkTotalTimeMin = (int) Math.round(firstWalkTotalTimeSec / 60.0);
        // 퍼스널 모빌리티 -> 목적지 경로 검색
        String jsonTransPath = findTransPath(mx, my, ex, ey);
        TransPathDto transPathDto = mapper.readValue(jsonTransPath, TransPathDto.class);
        List<Path> paths = transPathDto.getResult().getPath();
        List<Map<String, Object>> results = new ArrayList<>();
        for (Path path : paths) {
            Map<String, Object> map = new HashMap<>();
            int pathTotalTime = firstWalkTotalTimeMin;
            int payment = path.getInfo().getPayment();
            // 각 경로의 서브 경로
            List<SubPath> subPaths = path.getSubPath();
            for (int i = 0; i < subPaths.size(); i++) {
                SubPath subPath = subPaths.get(i);
                int mobilityPayment = 0;
                // 처음 경로이고 도보일 때 (퍼스널 모빌리티를 타므로 따로 시간계산)
                if (i == 0 && subPath.getTrafficType() == 3) {
                    int mobilDistance = (int) subPath.getDistance();
                    int mobilityTime = (int) Math.round(mobilDistance / 1.1 / 60);
                    pathTotalTime += mobilityTime;
                    mobilityPayment += mobilityCompany.getUnlockFee();
                    mobilityPayment += mobilityTime * mobilityCompany.getMinuteFee();
                    payment += mobilityPayment;
                }
                // 처음 경로가 아니거나 도보 경로가 아닐 때는 바로 시간 계산
                else {
                    pathTotalTime += subPath.getSectionTime();
                }
            }
            // 경로에 대한 노선그래픽데이터 검색
            String jsonRouteGraphic = routeGraphicData(path.getInfo().getMapObj());
            RouteGraphicDTO routeGraphicDTO = mapper.readValue(jsonRouteGraphic, RouteGraphicDTO.class);
            map.put("totalTime", pathTotalTime);
            map.put("payment", payment);
            map.put("pathType", 4); // pathType 1(지하철), 2(버스), 3(버스+지하철), 4(퍼모+버스+지하철)
            map.put("busTransitCount", path.getInfo().getBusTransitCount());
            map.put("subwayTransitCount", path.getInfo().getSubwayTransitCount());
            map.put("routeGraphic", routeGraphicDTO);
            results.add(map);
        }
        return results;
    }
}
