package com.capstone.pathproject.domain.carpool;

import com.capstone.pathproject.domain.member.Member;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@SequenceGenerator(
        name = "VEHICLE_SEQ_GENERATOR",
        sequenceName = "VEHICLE_SEQ",
        initialValue = 1,allocationSize = 1
)
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "VEHICLE_SEQ_GENERATOR")
    @Column(name = "CAR_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @Column(name = "CAR_KIND")
    private String carKind;

    @Column(name = "CAR_NUM")
    private String carNum;

    public Vehicle(){}

    @Builder(builderMethodName = "checkVehicle")
    public Vehicle(Long id, Member member, String carKind, String carNum){
        this.id = id;
        this.member = member;
        this.carKind = carKind;
        this.carNum = carNum;
    }
}
