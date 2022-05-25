package com.capstone.pathproject.domain.carpool;


import com.capstone.pathproject.domain.member.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@SequenceGenerator(
        name = "CARS_SEQ_GENERATOR",
        sequenceName = "CARS_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Cars {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "CARS_SEQ_GENERATOR")
    @Column(name = "CARS_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @Column(name = "CARS_KIND")
    private String carKind;

    @Column(name = "CARS_NUM")
    private String carNum;

    @Column(name = "CARS_PHOTO_NAME")
    private String photoName;

    @Builder(builderMethodName = "createCars")
    public Cars(Long id, Member member, String carKind, String carNum, String photoName){
        this.id = id;
        this.member = member;
        this.carKind = carKind;
        this.carNum = carNum;
        this.photoName = photoName;
    }

    public void updateMember(Member member) {
        this.member = member;
    }

    public void updateCarKind(String carKind) {
        this.carKind = carKind;
    }

    public void updateCarNum(String carNum) {
        this.carNum = carNum;
    }

    public void updatePhotoName(String photoName) {
        this.photoName = photoName;
    }
}
