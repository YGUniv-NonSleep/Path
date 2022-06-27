package com.capstone.pathproject.service.mobility;


import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.mobility.Mobility;
import com.capstone.pathproject.domain.mobility.MobilityReserve;
import com.capstone.pathproject.domain.mobility.MobilityType;
import com.capstone.pathproject.dto.mobility.LocationMobilityDto;
import com.capstone.pathproject.dto.mobility.ReserveMobilRequest;
import com.capstone.pathproject.dto.mobility.ReserveMobilResponse;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.repository.mobility.MobilityRepository;
import com.capstone.pathproject.repository.mobility.MobilityReserveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MobilityService {

    private final MemberRepository memberRepository;
    private final MobilityRepository mobilityRepository;
    private final MobilityReserveRepository mobilityReserveRepository;

    @Transactional(readOnly = true) // 경도, 위도
    public Message<List<LocationMobilityDto>> getLocationMobility(String type, double x, double y) {
        List<LocationMobilityDto> locationMobilityDtos = new ArrayList<>();
        List<Mobility> mobilities;
        if (type.equals("ALL"))
            mobilities = mobilityRepository.findLocationMobilities(x, y);
        else
            mobilities = mobilityRepository.findLocationMobilities(MobilityType.valueOf(type), x, y);
        String message;
        if (mobilities.size() == 0) {
            message = "근처에 퍼스널 모빌리티가 없습니다.";
        } else {
            message = "근처에 퍼스널 모빌리티가 있습니다.";
            mobilities.stream().map(LocationMobilityDto::new).forEach(locationMobilityDtos::add);
        }
        return Message.<List<LocationMobilityDto>>builder()
                .header(StatusEnum.OK)
                .message(message)
                .body(locationMobilityDtos).build();
    }

    public Message<String> reserveMobility(ReserveMobilRequest reserveRequest) {
        Optional<Member> findMember = memberRepository.findById(reserveRequest.getMemberId());
        Member member = findMember.orElse(null);
        if (member == null) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 존재하지 않습니다.")
                    .body("").build();
        }
        Optional<Mobility> findMobil = mobilityRepository.findById(reserveRequest.getMobilId());
        Mobility mobility = findMobil.orElse(null);
        if (mobility == null) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("퍼스널 모빌리티가 존재하지 않습니다.")
                    .body("").build();
        }
        Optional<MobilityReserve> reserveMobility = mobilityReserveRepository.findReserveMobility(member.getId());
        if (reserveMobility.isPresent()) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("예약중인 퍼스널 모빌리티가 있습니다.")
                    .body("").build();
        }
        MobilityReserve reserve = MobilityReserve.reserveMobility(mobility, member);
        mobilityReserveRepository.save(reserve);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("예약되었습니다.")
                .body("").build();
    }

    public Message<String> useReserveMobility(ReserveMobilRequest reserveRequest) {
        LocalDateTime time = LocalDateTime.now().minusMinutes(15);
        Optional<MobilityReserve> findMobilityReserve = mobilityReserveRepository.findReadyMobil(reserveRequest.getMobilId(), reserveRequest.getMemberId(), time);
        MobilityReserve mobilityReserve = findMobilityReserve.orElse(null);
        if (mobilityReserve == null) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("예약된 퍼스널 모빌리티가 존재하지 않습니다.")
                    .body("").build();
        }
        mobilityReserve.useMobility();
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("예약된 퍼스널모빌리티를 사용합니다.")
                .body("").build();
    }

    public void manageReserves() {
        LocalDateTime time = LocalDateTime.now().minusMinutes(15);
        List<MobilityReserve> mobilityReserves = mobilityReserveRepository.findReadyMobilities(time);
        if (mobilityReserves.size() != 0) {
            mobilityReserveRepository.updateToDisuseMobilities(toReserveMobilIds(mobilityReserves));
            memberRepository.penaltyMember(toMemberIds(mobilityReserves), -2);
        }
    }

    public List<Long> toReserveMobilIds(List<MobilityReserve> mobilityReserves) {
        return mobilityReserves.stream()
                .map(MobilityReserve::getId)
                .collect(Collectors.toList());
    }

    public List<Long> toMemberIds(List<MobilityReserve> mobilityReserves) {
        return mobilityReserves.stream()
                .map(mr -> mr.getMember().getId())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Message<Object> getReserveMobility(Long memberId) {
        Optional<MobilityReserve> findReserve = mobilityReserveRepository.findReserveMobility(memberId);
        MobilityReserve reserve = findReserve.orElse(null);
        if (reserve == null) {
            return Message.builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("예약중인 퍼스널 모빌리티가 존재하지 않습니다.")
                    .body("").build();
        }
        ReserveMobilResponse reserveResponse = new ReserveMobilResponse(reserve.getId(), reserve.getMobility(), reserve.getResult(), reserve.getCreatedDateTime());
        return Message.builder()
                .header(StatusEnum.OK)
                .message("예약중인 퍼스널 모빌리티가 존재합니다.")
                .body(reserveResponse).build();
    }
}
