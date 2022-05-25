package com.capstone.pathproject.dto.carpool;


import com.capstone.pathproject.domain.carpool.Cars;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.member.MemberDto;
import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CarsDto {
    private Long id;
    private MemberDto memberDto;
    private String carKind;
    private String carNum;
    private String photoName;

    @Builder(builderMethodName = "createCarsDTO")
    public CarsDto(Long id, MemberDto memberDto, String carKind, String carNum, String photoName){
        this.id = id;
        this.memberDto = memberDto;
        this.carKind = carKind;
        this.carNum = carNum;
        this.photoName = photoName;
    }

    public CarsDto(Cars cars) {
        this.id = cars.getId();
        this.memberDto = new MemberDto(cars.getMember());
        this.carKind = cars.getCarKind();
        this.carNum = cars.getCarNum();
        this.photoName = cars.getPhotoName();
    }
}
