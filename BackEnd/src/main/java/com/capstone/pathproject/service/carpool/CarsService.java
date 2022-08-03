package com.capstone.pathproject.service.carpool;


import com.capstone.pathproject.domain.carpool.Cars;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.carpool.CarsDto;
import com.capstone.pathproject.dto.member.MemberDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.carpool.CarsRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CarsService {
    private final CarsRepository carsRepository;
    private final MemberRepository memberRepository;


    public Message<String> create(CarsDto carsDto) {
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        if (member == null) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 존재하지 않습니다.")
                    .body("").build();
        }
        Cars car = Cars.createCars()
                .member(member)
                .carKind(carsDto.getCarKind())
                .carNum(carsDto.getCarNum())
                .photoName(carsDto.getPhotoName())
                .build();
        carsRepository.save(car);
        CarsDto result = new CarsDto(car);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("등록완료")
                .body("").build();
    }

    public Message<String> update(CarsDto carsDto){
        Optional<Cars> findCars = carsRepository.findById(carsDto.getId());
        Cars cars = findCars.orElse(null);

        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();

        if(cars == null){
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("차량이 존재하지 않습니다.")
                    .body("").build();
        }

        Cars updateCars = Cars.createCars()
                .id(carsDto.getId())
                .carNum(carsDto.getCarNum())
                .carKind(carsDto.getCarKind())
                .member(member)
                .photoName(carsDto.getPhotoName())
                .build();

        carsRepository.save(updateCars);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("차량 수정완료")
                .body("").build();
    }

    @Transactional
    public Message<String> delete(Long carsId) {
        Optional<Cars> result = carsRepository.findById(carsId);
        Cars cars = result.orElse(null);
        if(cars == null){
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("차량이 존재하지 않습니다.")
                    .build();
        }

        carsRepository.deleteById(carsId);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("삭제완료")
                .body("")
                .build();
    }


    //조회
    @Transactional
    public Message<?> findView(Long Id) {
        Optional<Member> findMember = memberRepository.findById(Id);

        //로그인한 사용자의 차량정보 확인
        List<Cars> cars = carsRepository.findByMember_Id(findMember.get().getId());

        ArrayList<CarsDto> listDto = new ArrayList<>();
        cars.stream().map(CarsDto::new).forEach(listDto::add);
        return Message.<ArrayList<?>>builder()
                .header(StatusEnum.OK)
                .message("조회완료")
                .body(listDto).build();
    }

    //차량이름으로 검색
    @Transactional
    public Message<List<CarsDto>> search(String keyword, Pageable pageable) {
        List<Cars> cars = carsRepository.findByCarKindContaining(keyword, pageable);
        ArrayList<CarsDto> listDto = new ArrayList<>();
        cars.stream().map(CarsDto::new).forEach(listDto::add);
        return Message.<List<CarsDto>>builder()
                .header(StatusEnum.OK)
                .message("검색완료")
                .body(listDto).build();
    }
}