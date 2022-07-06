package com.capstone.pathproject.service.carpool;


import com.capstone.pathproject.domain.carpool.BoardingDetail;
import com.capstone.pathproject.domain.carpool.CarPost;
import com.capstone.pathproject.domain.carpool.CarPostRequest;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.carpool.BoardingDetailDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.carpool.BoardingRepository;
import com.capstone.pathproject.repository.carpool.CarPostRepository;
import com.capstone.pathproject.repository.carpool.CarPostRequestRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardingService {
    private final BoardingRepository boardingRepository;
    private final MemberRepository memberRepository;
    private final CarPostRequestRepository carPostRequestRepository;

    public Message<String> create(BoardingDetailDto boardingDetailDto){
        System.out.println(boardingDetailDto);
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        Optional<Member> findMember = memberRepository.findById(member.getId());

        if(findMember == null){
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("사용자 없음")
                    .body("").build();
        }
        BoardingDetail boardingDetail = BoardingDetail.createBoardingDetail()
                .operationDetail(boardingDetailDto.getOperationDetail())
                .carPostRequest(boardingDetailDto.getCarPostRequest())
                .cost(boardingDetailDto.getCost())
                .member(member)
                .daccount(boardingDetailDto.getDaccount())
                .rname(boardingDetailDto.getRname())
                .status(boardingDetailDto.getStatus())
                .sname(boardingDetailDto.getSname())
                .waccount(boardingDetailDto.getWaccount())
                .tradeNum(boardingDetailDto.getTradeNum())
                .build();
        boardingRepository.save(boardingDetail);

        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("탑승내역 저장")
                .body("").build();

    }
}
