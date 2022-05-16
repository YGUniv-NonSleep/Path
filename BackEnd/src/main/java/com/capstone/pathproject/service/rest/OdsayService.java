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
            Map<String, Object> map = new LinkedHashMap<>();
            String jsonRouteGraphic = routeGraphicData(path.getInfo().getMapObj());
            RouteGraphicDTO routeGraphicDTO = mapper.readValue(jsonRouteGraphic, RouteGraphicDTO.class);
            map.put("pathType", path.getPathType());
            map.put("totalTime", path.getInfo().getTotalTime());
            map.put("payment", path.getInfo().getPayment());
            map.put("startPos", sx + ", " + sy);
            map.put("endPos", ex + ", " + ey);
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

    public List<Map<String, Object>> transPathsWithMobility(String sx, String sy, String ex, String ey, Long mobilityId) throws JsonProcessingException {
        List<Map<String, Object>> results = new ArrayList<>();
        Optional<Mobility> findMobility = mobilityRepository.findMobility(mobilityId);
        Mobility mobility = findMobility.orElse(null);
        if (mobility == null) return results;
        String mobilX = String.valueOf(mobility.getLongitude());
        String mobilY = String.valueOf(mobility.getLatitude());
        MobilityCompany mobilityCompany = mobility.getMobilityCompany();
        ObjectMapper mapper = getObjectMapper();
        String jsonFirstWalkPath = tmapService.walkPath(sx, sy, mobilX, mobilY, 15);
        WalkPathDto firstWalkPathDto = mapper.readValue(jsonFirstWalkPath, WalkPathDto.class);
        int firstWalkTimeSec = firstWalkPathDto.getFeatures().get(0).getProperties().getTotalTime();
        // 출발지 -> 퍼스널 모빌리티 위치까지 도보 시간
        int firstWalkTimeMin = (int) Math.round(firstWalkTimeSec / 60.0);
        String jsonTransPath = findTransPath(mobilX, mobilY, ex, ey);
        TransPathDto transPathDto = mapper.readValue(jsonTransPath, TransPathDto.class);
        List<Path> paths = transPathDto.getResult().getPath();
        String endStation = null;
        for (Path path : paths) {
            Map<String, Object> map = new LinkedHashMap<>();
            int pathTotalTime = firstWalkTimeMin;
            int predictPathTotalTime = 0;
            int payment = path.getInfo().getPayment();
            int predictPayment = 0;
            String lastEndStation = path.getInfo().getLastEndStation();
            // 각 경로의 서브 경로
            List<SubPath> subPaths = path.getSubPath();
            // 마지막 정류장 좌표값 선언
            double endX = 0;
            double endY = 0;
            int firstMobilPayment = 0;
            int lastMobilPayment = 0;
            for (int i = 0; i < subPaths.size(); i++) {
                SubPath subPath = subPaths.get(i);
                // 처음 상세 경로이고 도보일 때 (퍼스널 모빌리티를 타므로 따로 시간계산)
                if (i == 0 && subPath.getTrafficType() == 3) {
                    int mobilDistance = (int) subPath.getDistance();
                    int mobilityTime = (int) Math.round(mobilDistance / 4.16 / 60);
                    pathTotalTime += mobilityTime;
                    firstMobilPayment += mobilityCompany.getUnlockFee();
                    firstMobilPayment += mobilityTime * mobilityCompany.getMinuteFee();
                    payment += firstMobilPayment;
                    System.out.println("모빌리티를 타는 거리 = " + mobilDistance + "m");
                    System.out.println("모빌리티를 타는 시간 = " + mobilityTime + "분");
                }
                // 마지막 상세 경로이고 도보일 때 (마지막에 퍼스널 모빌리티를 타는 예상시간 구하기)
                else if (i == subPaths.size() - 1 && subPath.getTrafficType() == 3) {
                    // 퍼스널 모빌리티 탄 예상 시간 및 요금
                    int mobilDistance = (int) subPath.getDistance();
                    int mobilityTime = (int) Math.round(mobilDistance / 4.16 / 60) + 2; // 찾는시간 2분 더하기
                    predictPathTotalTime = mobilityTime + pathTotalTime;
                    lastMobilPayment += mobilityCompany.getUnlockFee();
                    lastMobilPayment += mobilityTime * mobilityCompany.getMinuteFee();
                    predictPayment = lastMobilPayment + payment;
                    // 퍼스널 모빌리티를 타지 않은 예상 시간
                    pathTotalTime += subPath.getSectionTime();
                }
                // 처음 또는 마지막 상세경로가 아니거나 도보 경로가 아닐 때는 바로 시간 계산
                else {
                    pathTotalTime += subPath.getSectionTime();
                }
                endStation = subPath.getEndName();
                if (endStation != null)
                    if (endStation.equals(lastEndStation)) {
                        endX = subPath.getEndX();
                        endY = subPath.getEndY();
                    }
            }
            // 경로에 대한 노선그래픽데이터 검색
            String jsonRouteGraphic = routeGraphicData(path.getInfo().getMapObj());
            RouteGraphicDTO routeGraphicDTO = mapper.readValue(jsonRouteGraphic, RouteGraphicDTO.class);
            map.put("pathType", 4); // pathType 1(지하철), 2(버스), 3(버스+지하철), 4(퍼모+버스+지하철)
            map.put("totalTime", pathTotalTime);
            map.put("payment", payment);
            map.put("predictTotalTime", predictPathTotalTime);
            map.put("predictPayment", predictPayment);
            map.put("startPos", sx + ", " + sy);
            map.put("endPos", ex + ", " + ey);
            map.put("lastEndStation", lastEndStation);
            map.put("lastEndStationX", endX);
            map.put("lastEndStationY", endY);
            map.put("busTransitCount", path.getInfo().getBusTransitCount());
            map.put("subwayTransitCount", path.getInfo().getSubwayTransitCount());
            map.put("routeGraphic", routeGraphicDTO);
            results.add(map);
            System.out.println("출발지에서 퍼스널모빌리티까지 도보시간(초) = " + firstWalkTimeSec + "초");
            System.out.println("출발지에서 퍼스널모빌리티까지 도보시간(분) = " + firstWalkTimeMin + "분");
            System.out.println("대중교통만 타고가는 시간 = " + (path.getInfo().getTotalTime() + firstWalkTimeMin) + "분");
            System.out.println("퍼스널모빌리티 활용한 시간 = " + pathTotalTime + "분");
            System.out.println("퍼스널모빌리티 활용한 총요금 = " + payment + "원");
            System.out.println("도착지에서 퍼스널모빌리티 활용한 경로 총시간 = " + predictPathTotalTime + "분");
            System.out.println("도착지에서 퍼스널모빌리티 활용한 경로 총요금 = " + predictPayment + "원");
        }
        return results;
    }
}
