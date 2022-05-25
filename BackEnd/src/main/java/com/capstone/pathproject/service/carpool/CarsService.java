package com.capstone.pathproject.service.carpool;


import com.capstone.pathproject.domain.carpool.Cars;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.carpool.CarsDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.carpool.CarsRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CarsService {
    private final CarsRepository carsRepository;
    private final MemberRepository memberRepository;


    //CRUD
    @Transactional
    public Message<Object> create(CarsDto carsDto, String fileName) {
        Optional<Member> findMember = memberRepository.findById(carsDto.getMemberDto().getId());
        Member member = findMember.orElse(null);
        if (member == null) {
            return Message.builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 존재하지 않습니다.")
                    .body("").build();
        }
        Cars car = Cars.createCars()
                .member(member)
                .carKind(carsDto.getCarKind())
                .carNum(carsDto.getCarKind())
                .photoName(fileName)
                .build();
        carsRepository.save(car);
        CarsDto result = new CarsDto(car);
        return Message.<Object>builder()
                .header(StatusEnum.OK)
                .message("등록완료")
                .body(result).build();
    }

    @Transactional
    public Message<Object> update(CarsDto carsDto, String fileName) {
        Optional<Cars> findCars = carsRepository.findById(carsDto.getId());
        Cars car = findCars.orElse(null);
        if (car == null) {
            return Message.builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("차량이 존재하지 않습니다.")
                    .body("").build();
        }
        Optional<Member> findMember = memberRepository.findById(carsDto.getMemberDto().getId());
        Member member = findMember.orElse(null);
        if (member == null) {
            return Message.builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 존재하지 않습니다.")
                    .body("").build();
        }
        car.updateMember(member);
        car.updateCarKind(carsDto.getCarKind());
        car.updateCarNum(carsDto.getCarNum());
        car.updatePhotoName(carsDto.getPhotoName());
        return Message.<Object>builder()
                .header(StatusEnum.OK)
                .message("업데이트 완료")
                .body(carsDto).build();
    }

    @Transactional
    public Message<CarsDto> delete(Long carsId) {
        Optional<Cars> result = carsRepository.findById(carsId);
        Long rs = result.get().getId();
        if (result.isPresent()) {
            carsRepository.deleteById(rs);
        }
        return Message.<CarsDto>builder()
                .header(StatusEnum.OK)
                .message("삭제완료")
                .build();
    }


    //조회
    @Transactional
    public Message<List<CarsDto>> findView(Pageable pageable) {
        List<Cars> cars = carsRepository.findAll(pageable).getContent();
        ArrayList<CarsDto> listDto = new ArrayList<>();
        cars.stream().map(CarsDto::new).forEach(listDto::add);
        return Message.<List<CarsDto>>builder()
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