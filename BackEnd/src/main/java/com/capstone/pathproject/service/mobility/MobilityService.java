package com.capstone.pathproject.service.mobility;


import com.capstone.pathproject.domain.mobility.Mobility;
import com.capstone.pathproject.dto.mobility.MobilityDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.mobility.MobilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MobilityService {

    private final MobilityRepository mobilityRepository;

    @Transactional(readOnly = true) // 경도, 위도
    public Message<List<MobilityDTO>> getLocationMobility(double x, double y) {
        List<MobilityDTO> mobilityDTOs = new ArrayList<>();
        List<Mobility> mobilities = mobilityRepository.getLocationMobility(x, y);
        String message;
        if (mobilities.size() == 0) {
            message = "근처에 퍼스널 모빌리티가 없습니다.";
        } else {
            message = "근처에 퍼스널 모빌리티가 있습니다.";
            mobilities.stream().map(MobilityDTO::new).forEach(mobilityDTOs::add);
        }
        return Message.<List<MobilityDTO>>createMessage()
                .header(StatusEnum.OK)
                .message(message)
                .body(mobilityDTOs).build();
    }
}
