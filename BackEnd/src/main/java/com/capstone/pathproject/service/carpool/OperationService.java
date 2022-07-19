package com.capstone.pathproject.service.carpool;


import com.capstone.pathproject.domain.carpool.OperationDetail;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.carpool.CarPostDTO;
import com.capstone.pathproject.dto.carpool.OperationDetailDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.carpool.OperationRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class OperationService {
    private final OperationRepository operationRepository;
    private final MemberRepository memberRepository;

    public Message<String> create(OperationDetailDto operationDetailDto){
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        Optional<Member> findMember = memberRepository.findById(member.getId());

        if(findMember == null){
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("사용자 없음")
                    .body("").build();
        }
        OperationDetail operationDetail = OperationDetail.createOperation()
                .carPost(operationDetailDto.getCarPost())
                .cars(operationDetailDto.getCars())
                .cost(operationDetailDto.getCost())
                .status(operationDetailDto.getStatus())
                .member(operationDetailDto.getMember())
                .build();
        operationRepository.save(operationDetail);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("운행내역저장성공")
                .body("").build();
    }

    public Message<OperationDetailDto> listDetail(Long operId){
        Optional<OperationDetail> findOperation = operationRepository.findById(operId);
        OperationDetail operationDetail = findOperation.orElse(null);

        if(operationDetail == null){
            return Message.<OperationDetailDto>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("운행내역이 없습니다.")
                    .build();
        }

        OperationDetailDto operationDetailDto = OperationDetailDto.createOperationDto()
                .operationId(operationDetail.getOperationId())
                .carPost(operationDetail.getCarPost())
                .cars(operationDetail.getCars())
                .cost(operationDetail.getCost())
                .status(operationDetail.getStatus())
                .member(operationDetail.getMember())
                .build();
        return Message.<OperationDetailDto>builder()
                .header(StatusEnum.OK)
                .message("운행내역")
                .body(operationDetailDto).build();
    }
    public Message<OperationDetailDto> getListDetail(Long carPostId){
       Optional<OperationDetail> findOperation = operationRepository.findByCarPostId(carPostId);
       OperationDetail operationDetail = findOperation.orElse(null);

       if(operationDetail == null){
           return Message.<OperationDetailDto>builder()
                   .header(StatusEnum.BAD_REQUEST)
                   .message("운행내역이 없습니다.")
                   .build();
       }
       OperationDetailDto operationDetailDto = OperationDetailDto.createOperationDto()
               .operationId(operationDetail.getOperationId())
               .carPost(operationDetail.getCarPost())
               .cars(operationDetail.getCars())
               .cost(operationDetail.getCost())
               .status(operationDetail.getStatus())
               .member(operationDetail.getMember())
               .build();
       return Message.<OperationDetailDto>builder()
               .header(StatusEnum.OK)
               .message("운행내역")
               .body(operationDetailDto).build();
    }

    public Message<List<OperationDetailDto>> getList(Long memberId){
        List<OperationDetail> operationDetails = operationRepository.findByMemberId(memberId);
        ArrayList<OperationDetailDto> arrayList = new ArrayList<OperationDetailDto>();
        operationDetails.stream().map(list -> new OperationDetailDto(list)).forEach(operationDetailDto -> arrayList.add(operationDetailDto));
        return Message.<List<OperationDetailDto>>builder()
                .header(StatusEnum.OK)
                .message("운행내역 리스트")
                .body(arrayList).build();
    }
}
