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
        Map<String, Object> map = new HashMap<>();
        map.put("startX", sx);
        map.put("startY", sy);
        map.put("endX", ex);
        map.put("endY", ey);
        map.put("startName", "출발지");
        map.put("endName", "목적지");
        map.put("speed", speed);

        if (count < 3) {
            count++;
            return getWalkPath(map).block();
        }
        count = 0;
        return getWalkPath2(map).block();
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

    public Map<String, Object> walkToMobilPath(double sx, double sy, double ex, double ey, Long mobilityId) throws JsonProcessingException {
        Map<String, Object> map = new LinkedHashMap<>();
        ObjectMapper mapper = getObjectMapper();
        // 퍼스널 모빌리티 정보 조회
        Optional<Mobility> findMobility = mobilityRepository.findMobility(mobilityId);
        Mobility mobility = findMobility.orElse(null);
        if (mobility == null) return null;
        double mobilX = mobility.getLongitude();
        double mobilY = mobility.getLatitude();
        // 출발지 -> 퍼스널 모빌리티 경로 조회
        String jsonFirstWalkPath = walkPath(sx, sy, mobilX, mobilY, 4);
        WalkPathDto firstWalkPathDto = mapper.readValue(jsonFirstWalkPath, WalkPathDto.class);
        int firstWalkTimeMin = changeTimeSecToMin(firstWalkPathDto.getFeatures().get(0).getProperties().getTotalTime());
        int totalTime = firstWalkTimeMin;
        int totalDistance = Integer.parseInt(firstWalkPathDto.getFeatures().get(0).getProperties().getTotalDistance());
        // 경로에 대한 노선 그래픽 데이터 저장
        List<Double[]> tmapGraphPos = new ArrayList<>();
        addGraphPos(mapper, tmapGraphPos, firstWalkPathDto);
        // 퍼스널 모빌리티 -> 목적지 경로 조회
        String jsonLastWalkPath = walkPath(mobilX, mobilY, ex, ey, 15);
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
        int walkTimeMin = (int) Math.round(walkTimeSec / 60.0);
        int walkDistance = Integer.parseInt(walkPathDto.getFeatures().get(0).getProperties().getTotalDistance());
        Map<String, Object> firstResult = getStringObjectMap(walkTimeMin, walkDistance, 0, firstGraphPos);

        // 퍼스널 모빌리티 -> 목적지 조회
        String jsonMobilPath = walkPath(mobilityDto.getLongitude(), mobilityDto.getLatitude(), ex, ey, 15);
        WalkPathDto mobilPathDto = mapper.readValue(jsonMobilPath, WalkPathDto.class);
        List<Double[]> lastGraphPos = new ArrayList<>();
        addGraphPos(mapper, lastGraphPos, walkPathDto);
        int mobilTimeSec = mobilPathDto.getFeatures().get(0).getProperties().getTotalTime();
        int mobilTimeMin = (int) Math.round(mobilTimeSec / 60.0);
        int payment = unlockFee + (mobilTimeMin * minuteFee);
        int mobilDistance = Integer.parseInt(mobilPathDto.getFeatures().get(0).getProperties().getTotalDistance());
        Map<String, Object> lastResult = getStringObjectMap(mobilTimeMin, mobilDistance, payment, lastGraphPos);

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

    private Map<String, Double> createPos(double x, double y) {
        Map<String, Double> map = new HashMap<>();
        map.put("x", x);
        map.put("y", y);
        return map;
    }

    private Map<String, Object> getStringObjectMap(int mobilTimeMin, int mobilDistance, int payment, List<Double[]> graphPos) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("totalTime", mobilTimeMin);
        result.put("totalDistance", mobilDistance);
        result.put("payment", payment);
        result.put("graphPos", graphPos);
        return result;
    }
}
