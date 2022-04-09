package com.capstone.pathproject.dto.carpool;


import com.capstone.pathproject.domain.carpool.Cars;
import com.capstone.pathproject.domain.member.Member;
import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CarsDTO {
    private Long id;
    private Member member;
    private String carKind;
    private String carNum;
    private String photoName;


    @Builder(builderMethodName = "createCarsDTO")
    public CarsDTO(Long id, Member member, String carKind, String carNum, String photoName){
        this.id = id;
        this.member = member;
        this.carKind = carKind;
        this.carNum = carNum;
        this.photoName = photoName;
    }

    public Cars toEntity(){
        return Cars.createCars()
                .id(id)
                .member(member)
                .carKind(carKind)
                .carNum(carNum)
                .photoName(photoName)
                .build();
    }
}
