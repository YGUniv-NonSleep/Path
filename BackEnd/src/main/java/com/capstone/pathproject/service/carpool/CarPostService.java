package com.capstone.pathproject.service.carpool;


import com.capstone.pathproject.domain.carpool.CarPost;
import com.capstone.pathproject.domain.carpool.Cars;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.carpool.CarPostDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.carpool.CarPostRepository;
import com.capstone.pathproject.repository.carpool.CarsRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CarPostService {
    private final CarPostRepository carPostRepository;
    private final CarsRepository carsRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public Message<String> create(CarPostDTO carPostDTO){
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        Optional<Member> findMember = memberRepository.findById(member.getId());

        if(findMember == null){
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("사용자 없음")
                    .body("").build();
        }
        CarPost carPost = CarPost.createCarPost()
                .member(member)
                .cars(carPostDTO.getCars())
                .title(carPostDTO.getTitle())
                .content(carPostDTO.getContent())
                .photoName(carPostDTO.getPhotoName())
                .arriveLongitude(carPostDTO.getArriveLongitude())
                .arriveLatitude(carPostDTO.getArriveLatitude())
                .sdate(carPostDTO.getSdate())
                .edate(carPostDTO.getEdate())
                .recruit(carPostDTO.getRecruit())
                .stime(carPostDTO.getStime())
                .startLongitude(carPostDTO.getStartLongitude())
                .startLatitude(carPostDTO.getStartLatitude())
                .startLocal1(carPostDTO.getStartLocal1())
                .startLocal2(carPostDTO.getStartLocal2())
                .arriveLocal1(carPostDTO.getArriveLocal1())
                .arriveLocal2(carPostDTO.getArriveLocal2())
                .price(carPostDTO.getPrice())
                .build();
        carPostRepository.save(carPost);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("등록완료")
                .body("").build();
    }

    public Message<String> update(Long postId, CarPostDTO carPostDTO){
        Optional<CarPost> findCarPost = carPostRepository.findById(postId);
        CarPost carPost = findCarPost.orElse(null);

        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();

        if(carPost == null){
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("수정할 게시글이 없습니다.")
                    .body("").build();
        }
        if(!validatePostMember(carPost.getMember().getLoginId())){
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("작성자가 아닙니다.")
                    .body("").build();
        }

        CarPost carPost1 = CarPost.createCarPost()
                .id(carPostDTO.getId())
                .member(member)
                .cars(carPostDTO.getCars())
                .title(carPostDTO.getTitle())
                .content(carPostDTO.getContent())
                .recruit(carPostDTO.getRecruit())
                .startLocal1(carPostDTO.getStartLocal1())
                .startLocal2(carPostDTO.getStartLocal2())
                .arriveLocal1(carPostDTO.getArriveLocal1())
                .arriveLocal2(carPostDTO.getArriveLocal2())
                .startLatitude(carPostDTO.getStartLatitude())
                .startLongitude(carPostDTO.getStartLongitude())
                .arriveLatitude(carPostDTO.getArriveLatitude())
                .arriveLongitude(carPostDTO.getArriveLongitude())
                .stime(carPostDTO.getStime())
                .sdate(carPostDTO.getSdate())
                .edate(carPostDTO.getEdate())
                .photoName(carPostDTO.getPhotoName())
                .price(carPostDTO.getPrice())
                .build();

        carPostRepository.save(carPost1);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("업데이트 완료")
                .body("").build();

    }


    private boolean validatePostMember(String loginId) {
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();

        if (loginId.equals(member.getLoginId())) {
            return true;
        } else {
            return false;
        }
    }
    @Transactional
    public Message<String> delete(Long postId){
        Optional<CarPost> result = carPostRepository.findById(postId);
        CarPost carPost = result.orElse(null);

        if(carPost == null){
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("게시글이 존재하지 않습니다.")
                    .build();
        }
        if(!validatePostMember(carPost.getMember().getLoginId())){
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("현재 사용자가 게시글 작성자가 아닙니다.")
                    .body("").build();
        }
        carPostRepository.deleteById(postId);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("삭제완료")
                .body("").build();
    }

    //조회
    @Transactional
    public Message<List<CarPostDTO>> getPostList(Pageable pageable){
        List<CarPost> result = carPostRepository.findAll(pageable).getContent();
        ArrayList<CarPostDTO> listPDT = new ArrayList<CarPostDTO>();
        result.stream().map(carPost -> carPost.toDTO()).forEach(carPostDTO -> listPDT.add(carPostDTO));
        return Message.<List<CarPostDTO>>builder()
                .header(StatusEnum.OK)
                .message("조회완료")
                .body(listPDT).build();
    }

    @Transactional
    public Message viewParams(Long id){
        Optional<CarPost> carPost = carPostRepository.findById(id);
        CarPostDTO carPostDTO = carPost.get().toDTO();
        return Message.<CarPostDTO>builder()
                .header(StatusEnum.OK)
                .message("조회 완료")
                .body(carPostDTO).build();
    }

    @Transactional
    public Message<List<CarPostDTO>> search(String keyword,String option ,Pageable pageable){
        System.out.println(keyword);
        System.out.println(option.getClass());
        if(option.equals("1")){
            List<CarPost> carpostList = carPostRepository.findByStartLocal1Containing(keyword,pageable);

            ArrayList<CarPostDTO> listPDT = new ArrayList<CarPostDTO>();
            carpostList.stream().map(carPost -> carPost.toDTO()).forEach(carPostDTO -> listPDT.add(carPostDTO));
            return Message.<List<CarPostDTO>>builder()
                    .header(StatusEnum.OK)
                    .message("검색완료")
                    .body(listPDT).build();
        }else{
            List<CarPost> carpostList = carPostRepository.findByStartLocal2Containing(keyword,pageable);
            ArrayList<CarPostDTO> listPDT = new ArrayList<CarPostDTO>();
            carpostList.stream().map(carPost -> carPost.toDTO()).forEach(carPostDTO -> listPDT.add(carPostDTO));
            return Message.<List<CarPostDTO>>builder()
                    .header(StatusEnum.OK)
                    .message("검색완료")
                    .body(listPDT).build();
        }

    }

}
