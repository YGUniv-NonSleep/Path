package com.capstone.pathproject.service.rest;

import com.capstone.pathproject.domain.mobility.Mobility;
import com.capstone.pathproject.dto.rest.tmap.path.Features;
import com.capstone.pathproject.dto.rest.tmap.path.WalkPathDto;
import com.capstone.pathproject.repository.mobility.MobilityRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class TmapService {

    private final WebClient tmapWebClient;
    private final WebClient tmapWebClient2;
    private final MobilityRepository mobilityRepository;

    public static int count = 0;

    public String walkPath(String sx, String sy, String ex, String ey, int speed) {
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

    public Map<String, Object> walkToMobilPath(String sx, String sy, String ex, String ey, Long mobilityId) throws JsonProcessingException {
        Map<String, Object> map = new LinkedHashMap<>();
        ObjectMapper mapper = getObjectMapper();
        // 퍼스널 모빌리티 정보 조회
        Optional<Mobility> findMobility = mobilityRepository.findMobility(mobilityId);
        Mobility mobility = findMobility.orElse(null);
        if (mobility == null) return null;
        double mobilX = mobility.getLongitude();
        double mobilY = mobility.getLatitude();
        // 출발지 -> 퍼스널 모빌리티 경로 조회
        String jsonFirstWalkPath = walkPath(sx, sy, String.valueOf(mobilX), String.valueOf(mobilY), 4);
        WalkPathDto firstWalkPathDto = mapper.readValue(jsonFirstWalkPath, WalkPathDto.class);
        int firstWalkTimeMin = changeTimeSecToMin(firstWalkPathDto.getFeatures().get(0).getProperties().getTotalTime());
        int totalTime = firstWalkTimeMin;
        int totalDistance = Integer.parseInt(firstWalkPathDto.getFeatures().get(0).getProperties().getTotalDistance());
        // 경로에 대한 노선 그래픽 데이터 저장
        List<Double[]> tmapGraphPos = new ArrayList<>();
        addGraphPos(mapper, tmapGraphPos, firstWalkPathDto);
        // 퍼스널 모빌리티 -> 목적지 경로 조회
        String jsonLastWalkPath = walkPath(String.valueOf(mobilX), String.valueOf(mobilY), ex, ey, 15);
        WalkPathDto lastWalkPathDto = mapper.readValue(jsonLastWalkPath, WalkPathDto.class);
        int lastWalkTimeMin = changeTimeSecToMin(lastWalkPathDto.getFeatures().get(0).getProperties().getTotalTime());
        int payment = mobility.getMobilityCompany().getUnlockFee() + (lastWalkTimeMin * mobility.getMobilityCompany().getMinuteFee());
        totalTime += lastWalkTimeMin;
        totalDistance += Integer.parseInt(lastWalkPathDto.getFeatures().get(0).getProperties().getTotalDistance());
        addGraphPos(mapper, tmapGraphPos, lastWalkPathDto);
        map.put("totalTime", totalTime);
        map.put("totalDistance", totalDistance);
        map.put("totalPayment", payment);
        map.put("graphPos", tmapGraphPos);
        return map;
    }

    private int changeTimeSecToMin(int timeSec) {
        return (int) Math.round(timeSec / 60.0);
    }

    private void addGraphPos(ObjectMapper mapper, List<Double[]> tmapGraphPos, WalkPathDto walkPathDto) throws JsonProcessingException {
        List<Features> lastFeautres = walkPathDto.getFeatures();
        for (Features feature : lastFeautres) {
            List<Object> coordinates = feature.getGeometry().getCoordinates();
            if (feature.getGeometry().getType().equals("Point")) {
                Double[] coordinatesPos = new Double[2];
                for (int i = 0; i < coordinates.size(); i++) {
                    coordinatesPos[i] = Double.parseDouble(coordinates.get(i).toString());
                }
                tmapGraphPos.add(coordinatesPos);
            } else {
                for (Object coordinate : coordinates) {
                    Double[] doubles = mapper.readValue(coordinate.toString(), Double[].class);
                    tmapGraphPos.add(doubles);
                }
            }
        }
    }

    public ObjectMapper getObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return mapper;
    }
}
