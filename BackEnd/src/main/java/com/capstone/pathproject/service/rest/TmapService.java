package com.capstone.pathproject.service.rest;

import com.capstone.pathproject.domain.mobility.Mobility;
import com.capstone.pathproject.dto.mobility.LocationMobilityDto;
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

    public String walkPath(double sx, double sy, double ex, double ey, int speed) {
        Map<String, Object> data = new HashMap<>();
        data.put("startX", sx);
        data.put("startY", sy);
        data.put("endX", ex);
        data.put("endY", ey);
        data.put("startName", "출발지");
        data.put("endName", "목적지");
        data.put("speed", speed);

        if (count < 3) {
            count++;
            return getWalkPath(data).block();
        }
        count = 0;
        return getWalkPath2(data).block();
    }

    private Mono<String> getWalkPath(Map<String, Object> map) {
        return tmapWebClient.post()
                .uri(uriBuilder -> uriBuilder.path("/tmap/routes/pedestrian")
                        .queryParam("version", 1)
                        .build())
                .bodyValue(map)
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(String.class));
    }

    private Mono<String> getWalkPath2(Map<String, Object> map) {
        return tmapWebClient2.post()
                .uri(uriBuilder -> uriBuilder.path("/tmap/routes/pedestrian")
                        .queryParam("version", 1)
                        .build())
                .bodyValue(map)
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(String.class));
    }

    public Map<String, Object> mobilityPath(double sx, double sy, double ex, double ey, Long mobilityId) throws JsonProcessingException {
        ObjectMapper mapper = getObjectMapper();
        // 퍼스널 모빌리티 정보 조회
        Optional<Mobility> findMobility = mobilityRepository.findMobility(mobilityId);
        Mobility mobility = findMobility.orElse(null);
        if (mobility == null) return null;
        LocationMobilityDto mobilityDto = new LocationMobilityDto(mobility);
        int unlockFee = mobilityDto.getLocationMobilityCompanyDto().getUnlockFee();
        int minuteFee = mobilityDto.getLocationMobilityCompanyDto().getMinuteFee();

        // 출발지 -> 퍼스널 모빌리티 조회
        String jsonWalkPath = walkPath(sx, sy, mobilityDto.getLongitude(), mobilityDto.getLatitude(), 4);
        WalkPathDto walkPathDto = mapper.readValue(jsonWalkPath, WalkPathDto.class);
        List<Double[]> firstGraphPos = new ArrayList<>();
        addGraphPos(mapper, firstGraphPos, walkPathDto);
        int walkTimeSec = walkPathDto.getFeatures().get(0).getProperties().getTotalTime();
        int walkTimeMin = changeTimeSecToMin(walkTimeSec);
        int walkDistance = Integer.parseInt(walkPathDto.getFeatures().get(0).getProperties().getTotalDistance());
        Map<String, Object> firstResult = createPathInfo(walkTimeMin, walkDistance, 0, firstGraphPos);

        // 퍼스널 모빌리티 -> 목적지 조회
        String jsonMobilPath = walkPath(mobilityDto.getLongitude(), mobilityDto.getLatitude(), ex, ey, 15);
        WalkPathDto mobilPathDto = mapper.readValue(jsonMobilPath, WalkPathDto.class);
        List<Double[]> lastGraphPos = new ArrayList<>();
        addGraphPos(mapper, lastGraphPos, walkPathDto);
        int mobilTimeSec = mobilPathDto.getFeatures().get(0).getProperties().getTotalTime();
        int mobilTimeMin = changeTimeSecToMin(mobilTimeSec);
        int payment = unlockFee + (mobilTimeMin * minuteFee);
        int mobilDistance = Integer.parseInt(mobilPathDto.getFeatures().get(0).getProperties().getTotalDistance());
        Map<String, Object> lastResult = createPathInfo(mobilTimeMin, mobilDistance, payment, lastGraphPos);

        Map<String, Double> startPos = createPos(sx, sy);
        Map<String, Double> mobilPos = createPos(mobilityDto.getLongitude(), mobilityDto.getLatitude());
        Map<String, Double> endPos = createPos(ex, ey);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("totalTime", walkTimeMin + mobilTimeMin);
        result.put("totalDistance", walkDistance + mobilDistance);
        result.put("payment", payment);
        result.put("startPos", startPos);
        result.put("mobilPos", mobilPos);
        result.put("endPos", endPos);
        result.put("mobility", mobilityDto);
        result.put("firstPath", firstResult);
        result.put("lastPath", lastResult);
        return result;
    }

    public ObjectMapper getObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return mapper;
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

    private Map<String, Double> createPos(double x, double y) {
        Map<String, Double> map = new HashMap<>();
        map.put("x", x);
        map.put("y", y);
        return map;
    }

    private Map<String, Object> createPathInfo(int mobilTimeMin, int mobilDistance, int payment, List<Double[]> graphPos) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("totalTime", mobilTimeMin);
        result.put("totalDistance", mobilDistance);
        result.put("payment", payment);
        result.put("graphPos", graphPos);
        return result;
    }

    public String carPath(double sx, double sy, double ex, double ey) {
        Map<String, Object> data = new HashMap<>();
        data.put("startX", sx);
        data.put("startY", sy);
        data.put("endX", ex);
        data.put("endY", ey);
        data.put("speed", 50);

        Mono<String> mono = tmapWebClient.post()
                .uri(uriBuilder -> uriBuilder.path("/tmap/routes")
                        .queryParam("version", 1)
                        .build())
                .bodyValue(data)
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(String.class));
        return mono.block();
    }
}
