package com.capstone.pathproject.service.carpool;


import com.capstone.pathproject.domain.carpool.CarPost;
import com.capstone.pathproject.domain.carpool.CarPostRequest;
import com.capstone.pathproject.domain.community.Post;
import com.capstone.pathproject.domain.company.Option;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.carpool.CarPostDTO;
import com.capstone.pathproject.dto.carpool.CarPostRequestCreateDto;
import com.capstone.pathproject.dto.carpool.CarPostRequestDTO;
import com.capstone.pathproject.dto.community.PostDto;
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

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CarPostRequestService {
    private final CarPostRequestRepository carPostRequestRepository;
    private final MemberRepository memberRepository;
    private final CarPostRepository carPostRepository;

    public Message<String> create(CarPostRequestCreateDto carPostRequestCreateDto) {

        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        Optional<Member> findMember = memberRepository.findById(member.getId());
        Optional<CarPost> findPostId = carPostRepository.findById(carPostRequestCreateDto.getPostId());

        if (findMember == null) {
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

    public Message<String> approval(CarPostRequestCreateDto carPostRequestCreateDto){
        Optional<CarPostRequest> findRow = carPostRequestRepository.findById(carPostRequestCreateDto.getPostId());
        CarPostRequest carPostRequest = findRow.orElse(null);


        if(carPostRequest != null){
            if(carPostRequestCreateDto.getApproval().equals("accept")){
                CarPostRequest approval = CarPostRequest.createRequest()
                        .id(carPostRequestCreateDto.getPostId())
                        .approval(carPostRequestCreateDto.getApproval())
                        .member(carPostRequest.getMember())
                        .carPost(carPostRequest.getCarPost())
                        .price(carPostRequest.getPrice())
                        .content(carPostRequest.getContent())
                        .startLatitude(carPostRequest.getStartLatitude())
                        .startLongitude(carPostRequest.getStartLongitude())
                        .arriveLatitude(carPostRequest.getArriveLatitude())
                        .arriveLongitude(carPostRequest.getArriveLongitude())
                        .passenger(carPostRequest.getPassenger())
                        .build();
                carPostRequestRepository.save(approval);
                return  Message.<String>builder()
                        .header(StatusEnum.OK)
                        .message("승인")
                        .body("").build();
            }else {
                CarPostRequest approval = CarPostRequest.createRequest()
                        .id(carPostRequestCreateDto.getPostId())
                        .approval(carPostRequestCreateDto.getApproval())
                        .member(carPostRequest.getMember())
                        .carPost(carPostRequest.getCarPost())
                        .price(carPostRequest.getPrice())
                        .content(carPostRequest.getContent())
                        .startLatitude(carPostRequest.getStartLatitude())
                        .startLongitude(carPostRequest.getStartLongitude())
                        .arriveLatitude(carPostRequest.getArriveLatitude())
                        .arriveLongitude(carPostRequest.getArriveLongitude())
                        .passenger(carPostRequest.getPassenger())
                        .build();
                carPostRequestRepository.save(approval);
                return  Message.<String>builder()
                        .header(StatusEnum.OK)
                        .message("거절")
                        .body("").build();
            }
        }
                return Message.<String>builder()
                        .header(StatusEnum.BAD_REQUEST)
                        .message("신청이 없습니다")
                        .body("").build();
    }

    public Message<String> checkRequest(CarPostRequestCreateDto carPostRequestCreateDto){
        Optional<CarPostRequest> findRow = carPostRequestRepository.findById(carPostRequestCreateDto.getPostId());
        CarPostRequest carPostRequest = findRow.orElse(null);


        if(carPostRequest != null){
            CarPostRequest checkRequest = CarPostRequest.createRequest()
                    .id(carPostRequestCreateDto.getPostId())
                    .approval(carPostRequest.getApproval())
                    .carPost(carPostRequest.getCarPost())
                    .arriveLatitude(carPostRequest.getArriveLatitude())
                    .arriveLongitude(carPostRequest.getArriveLongitude())
                    .content(carPostRequest.getContent())
                    .member(carPostRequest.getMember())
                    .passenger(carPostRequest.getPassenger())
                    .startLatitude(carPostRequest.getStartLatitude())
                    .startLongitude(carPostRequest.getStartLongitude())
                    .price(carPostRequest.getPrice())
                    .state(carPostRequestCreateDto.getState())
                    .build();
                carPostRequestRepository.save(checkRequest);
                return  Message.<String>builder()
                        .header(StatusEnum.OK)
                        .message("확인완료")
                        .body("").build();
        }
        return  Message.<String>builder()
                .header(StatusEnum.BAD_REQUEST)
                .message("신청이 없습니다")
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

    public Message<List<CarPostRequestDTO>> sendingFind(Long memberId){
        List<CarPostRequest> list = carPostRequestRepository.findByMemberId(memberId);
        ArrayList<CarPostRequestDTO> arrayList = new ArrayList<CarPostRequestDTO>();
        list.stream().map(lists -> new CarPostRequestDTO(lists)).forEach(carPostRequestDTO -> arrayList.add(carPostRequestDTO));
        return Message.<List<CarPostRequestDTO>>builder()
                .header(StatusEnum.OK)
                .message("확인")
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
                .id(carPostRequest.getId())
                .approval(carPostRequest.getApproval())
                .content(carPostRequest.getContent())
                .passenger(carPostRequest.getPassenger())
                .price(carPostRequest.getPrice())
                .member(carPostRequest.getMember())
                .startLongitude(carPostRequest.getStartLongitude())
                .startLatitude(carPostRequest.getStartLatitude())
                .arriveLatitude(carPostRequest.getArriveLatitude())
                .arriveLongitude(carPostRequest.getArriveLongitude())
                .carPost(carPostRequest.getCarPost())
                .state(carPostRequest.getState())
                .build();
        return Message.<CarPostRequestDTO>builder()
                .header(StatusEnum.OK)
                .message("신청서 확인")
                .body(carPostRequestDTO).build();
    }
}
