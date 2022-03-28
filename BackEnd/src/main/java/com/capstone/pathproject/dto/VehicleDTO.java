package com.capstone.pathproject.dto;


import com.capstone.pathproject.domain.carpool.Vehicle;
import com.capstone.pathproject.domain.member.Member;
import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VehicleDTO {
    private Long id;
    private Member member;
    private String carKind;
    private String carNum;

    @Builder(builderMethodName = "checkVehicleDTO")
    public VehicleDTO(Long id, Member member, String carKind, String carNum){
        this.id = id;
        this.member = member;
        this.carKind = carKind;
        this.carNum = carNum;
    }

    public Vehicle toEntity(){
        return Vehicle.checkVehicle()
                .id(id)
                .member(member)
                .carKind(carKind)
                .carNum(carNum)
                .build();
    }
}
