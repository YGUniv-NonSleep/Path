package com.capstone.pathproject.service.carpool;


import com.capstone.pathproject.domain.carpool.CarPost;
import com.capstone.pathproject.domain.carpool.CarPostRequest;
import com.capstone.pathproject.domain.company.Option;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.carpool.CarPostRequestCreateDto;
import com.capstone.pathproject.dto.carpool.CarPostRequestDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.carpool.CarPostRepository;
import com.capstone.pathproject.repository.carpool.CarPostRequestRepository;
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
@Transactional(readOnly = true)
public class CarPostRequestService {
    private final CarPostRequestRepository carPostRequestRepository;
    private final MemberRepository memberRepository;
    private final CarPostRepository carPostRepository;


    @Transactional
    public Message<String> create(CarPostRequestCreateDto carPostRequestCreateDto){

        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        Optional<Member> findMember = memberRepository.findById(member.getId());
        Optional<CarPost> findPostId = carPostRepository.findById(carPostRequestCreateDto.getPostId());

        if(findMember == null){
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("사용자 없음")
                    .body("").build();
        }

        CarPostRequest carPostRequest = CarPostRequest.createRequest()
                .member(member)
                .carPost(findPostId.get())
                .price(carPostRequestCreateDto.getPrice())
                .content(carPostRequestCreateDto.getContent())
                .startLatitude(carPostRequestCreateDto.getStartLatitude())
                .startLongitude(carPostRequestCreateDto.getStartLongitude())
                .arriveLatitude(carPostRequestCreateDto.getArriveLatitude())
                .arriveLongitude(carPostRequestCreateDto.getArriveLongitude())
                .passenger(carPostRequestCreateDto.getPassenger())
                .build();

        carPostRequestRepository.save(carPostRequest);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("신청 완료")
                .body("").build();
    }

    public Message<List<CarPostRequestDTO>> requestFind(Long memberId) {
        //List<CarPostRequest> requests = carPostRequestRepository.findByCarPostId(postId);
        List<CarPostRequest> requests = carPostRequestRepository.findByCarPostMemberId(memberId);
        ArrayList<CarPostRequestDTO> arrayList = new ArrayList<CarPostRequestDTO>();
        requests.stream().map(request -> new CarPostRequestDTO(request)).forEach(carPostRequestDTO -> arrayList.add(carPostRequestDTO));
        System.out.println(arrayList.toString());
        return Message.<List<CarPostRequestDTO>>builder()
                .header(StatusEnum.OK)
                .message("신청서 확인")
                .body(arrayList).build();
    }

    public Message<CarPostRequestDTO> findList(Long requestId) {
        Optional<CarPostRequest> findRequest = carPostRequestRepository.findById(requestId);

        CarPostRequest carPostRequest = findRequest.orElse(null);

        if(carPostRequest == null){
            return Message.<CarPostRequestDTO>builder()
                    .header(StatusEnum.OK)
                    .message("신청이 없습니다.")
                    .build();
        }

        CarPostRequestDTO carPostRequestDTO = CarPostRequestDTO.createRequestDTO()
                .content(carPostRequest.getContent())
                .passenger(carPostRequest.getPassenger())
                .price(carPostRequest.getPrice())
                .build();
        return Message.<CarPostRequestDTO>builder()
                .header(StatusEnum.OK)
                .message("신청서 확인")
                .body(carPostRequestDTO).build();
    }
}
