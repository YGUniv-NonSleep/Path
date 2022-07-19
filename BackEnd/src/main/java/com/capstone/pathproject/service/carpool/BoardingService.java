package com.capstone.pathproject.service.carpool;


import com.capstone.pathproject.domain.carpool.BoardingDetail;
import com.capstone.pathproject.domain.carpool.CarPost;
import com.capstone.pathproject.domain.carpool.CarPostRequest;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.carpool.BoardingDetailDto;
import com.capstone.pathproject.dto.carpool.CarPostRequestDTO;
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

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
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

    public Message<List<BoardingDetailDto>> getList(Long memberId){
        List<BoardingDetail> boardingDetails = boardingRepository.findByMemberId(memberId);
        ArrayList<BoardingDetailDto> arrayList = new ArrayList<BoardingDetailDto>();
        boardingDetails.stream().map(list -> new BoardingDetailDto(list)).forEach(boardingDetailDto -> arrayList.add(boardingDetailDto));
        return Message.<List<BoardingDetailDto>>builder()
                .header(StatusEnum.OK)
                .message("탑승내역 리스트")
                .body(arrayList).build();
    }

    public Message<BoardingDetail> getListDetail(Long boardId){
        Optional<BoardingDetail> findBoarding = boardingRepository.findById(boardId);
        BoardingDetail boardingDetail = findBoarding.orElse(null);

        if(boardingDetail == null){
            return Message.<BoardingDetail>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("탑승내역이 없습니다.")
                    .build();
        }
        BoardingDetail listBoarding = BoardingDetail.createBoardingDetail()
                .boardingId(boardingDetail.getBoardingId())
                .cost(boardingDetail.getCost())
                .carPostRequest(boardingDetail.getCarPostRequest())
                .member(boardingDetail.getMember())
                .operationDetail(boardingDetail.getOperationDetail())
                .status(boardingDetail.getStatus())
                .rname(boardingDetail.getRname())
                .sname(boardingDetail.getSname())
                .tradeNum(boardingDetail.getTradeNum())
                .waccount(boardingDetail.getWaccount())
                .daccount(boardingDetail.getDaccount())
                .build();

        return Message.<BoardingDetail>builder()
                .header(StatusEnum.OK)
                .message("탑승내역")
                .body(listBoarding).build();
    }
}
