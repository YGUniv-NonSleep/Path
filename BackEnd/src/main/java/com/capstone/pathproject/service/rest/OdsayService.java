package com.capstone.pathproject.service.rest;

import com.capstone.pathproject.dto.rest.odsay.graph.RouteGraphicDTO;
import com.capstone.pathproject.dto.rest.odsay.path.*;
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

    public List<Map<String, Object>> transPaths(double sx, double sy, double ex, double ey, int searchPathType) throws JsonProcessingException {
        ObjectMapper mapper = getObjectMapper();
        String jsonTransPath = findTransPath(sx, sy, ex, ey, searchPathType);
        TransPathDto transPathDto = mapper.readValue(jsonTransPath, TransPathDto.class);
        List<Path> paths = transPathDto.getResult().getPath();
        Collections.sort(paths);
        List<Map<String, Object>> results = new ArrayList<>();
        for (Path path : paths) {
            String firstStartStation = path.getInfo().getFirstStartStation();
            String lastEndStation = path.getInfo().getLastEndStation();
            double startX = 0;
            double startY = 0;
            double endX = 0;
            double endY = 0;
            List<List<String>> stationNames = new ArrayList<>();
            List<Map<String, Object>> routeSection = new ArrayList<>();
            List<SubPath> subPaths = path.getSubPath();
            for (SubPath subPath : subPaths) {
                Map<String, Object> sectionInfo = new LinkedHashMap<>();
                String startStation = subPath.getStartName();
                if (startStation != null) {
                    if (startStation.equals(firstStartStation)) {
                        startX = subPath.getStartX();
                        startY = subPath.getStartY();
                    }
                }
                String endStation = subPath.getEndName();
                if (endStation != null) {
                    if (endStation.equals(lastEndStation)) {
                        endX = subPath.getEndX();
                        endY = subPath.getEndY();
                    }
                }
                int trafficType = subPath.getTrafficType();
                int sectionTime = subPath.getSectionTime();
                sectionInfo.put("type", trafficType);
                sectionInfo.put("sectionTime", sectionTime);
                List<String> stationName = new ArrayList<>();
                if (trafficType == 2) {
                    List<Lane> lanes = subPath.getLane();
                    for (Lane lane : lanes) {
                        stationName.add(lane.getBusNo());
                    }
                    sectionInfo.put("busNo", stationName);
                    List<String> busStationNames = new ArrayList<>();
                    List<Stations> stations = subPath.getPassStopList().getStations();
                    for (Stations station : stations) {
                        busStationNames.add(station.getStationName());
                    }
                    stationNames.add(busStationNames);
                } else if (trafficType == 1) {
                    List<Lane> lanes = subPath.getLane();
                    for (Lane lane : lanes) {
                        stationName.add(lane.getName());
                    }
                    sectionInfo.put("subwayName", stationName);
                    List<String> subwayStationNames = new ArrayList<>();
                    List<Stations> stations = subPath.getPassStopList().getStations();
                    for (Stations station : stations) {
                        subwayStationNames.add(station.getStationName());
                    }
                    stationNames.add(subwayStationNames);
                }
                routeSection.add(sectionInfo);
            }
            Map<String, Object> map = new LinkedHashMap<>();
            String jsonRouteGraphic = routeGraphicData(path.getInfo().getMapObj());
            RouteGraphicDTO routeGraphicDTO = mapper.readValue(jsonRouteGraphic, RouteGraphicDTO.class);
            Map<String, Object> startPos = new LinkedHashMap<>();
            startPos.put("x", sx);
            startPos.put("y", sy);
            Map<String, Object> endPos = new LinkedHashMap<>();
            endPos.put("x", ex);
            endPos.put("y", ey);
            Map<String, Object> startStation = new LinkedHashMap<>();
            startStation.put("firstStartStation", firstStartStation);
            startStation.put("x", startX);
            startStation.put("y", startY);
            Map<String, Object> endStation = new LinkedHashMap<>();
            endStation.put("lastEndStation", lastEndStation);
            endStation.put("x", endX);
            endStation.put("y", endY);
            map.put("pathType", path.getPathType());
            map.put("totalTime", path.getInfo().getTotalTime());
            map.put("payment", path.getInfo().getPayment());
            map.put("startPos", startPos);
            map.put("endPos", endPos);
            map.put("startStation", startStation);
            map.put("endStation", endStation);
            map.put("stationNames", stationNames);
            map.put("busTransitCount", path.getInfo().getBusTransitCount());
            map.put("subwayTransitCount", path.getInfo().getSubwayTransitCount());
            map.put("routeSection", routeSection);
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

    public String findTransPath(double sx, double sy, double ex, double ey, int searchPathType) {
        Mono<String> mono = odsayWebClient.get()
                .uri(uriBuilder -> uriBuilder.path("/v1/api/searchPubTransPathT")
                        .queryParam("apiKey", apiKey)
                        .queryParam("SX", sx)
                        .queryParam("SY", sy)
                        .queryParam("EX", ex)
                        .queryParam("EY", ey)
                        .queryParam("SearchPathType", searchPathType)
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
