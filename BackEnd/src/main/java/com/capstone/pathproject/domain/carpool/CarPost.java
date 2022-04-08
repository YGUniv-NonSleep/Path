package com.capstone.pathproject.domain.carpool;


import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.carpool.CarPostDTO;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@SequenceGenerator(
        name = "CARPOST_SEQ_GENERATOR",
        sequenceName = "CARPOST_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CarPost {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "CARPOST_SEQ_GENERATOR")
    @Column(name = "CARPOST_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "CARS_ID")
    private Cars cars;

    @Column(name = "CARPOST_TITLE")
    private String title;

    @Column(name = "CARPOST_CONT")
    private String content;

    @Column(name = "CARPOST_SDATE")
    private LocalDate sdate;

    @Column(name = "CARPOSt_EDATE")
    private LocalDate edate;

    @Column(name = "CARPOST_REC")
    private int recruit;

    @Column(name = "CARPOST_START_LGT")
    private String startLongitude;

    @Column(name = "CARPOST_START_LTD")
    private String startLatitude;

    @Column(name = "CARPOST_ARR_LGT")
    private String arriveLongitude;

    @Column(name = "CARPOST_ARR_LTD")
    private String arriveLatitude;

    @Column(name = "CARPOST_STIME")
    private LocalDateTime stime;

    @Column(name = "CARPOST_PHOTO_NAME")
    private String photoName;


    @Builder(builderMethodName = "createCarPost")
    public CarPost(Long id, Member member,Cars cars ,String title, String content, LocalDate sdate, LocalDate edate,
                   int recruit, String startLongitude, String startLatitude, String arriveLongitude, String arriveLatitude, LocalDateTime stime, String photoName){

        this.id = id;
        this.member = member;
        this.cars = cars;
        this.title = title;
        this.content = content;
        this.sdate = sdate;
        this.edate = edate;
        this.recruit = recruit;
        this.startLongitude = startLongitude;
        this.startLatitude = startLatitude;
        this.arriveLongitude = arriveLongitude;
        this.arriveLatitude = arriveLatitude;
        this.stime = LocalDateTime.now();
        this.photoName = photoName;
    }

    public CarPostDTO toDTO(){
        return CarPostDTO.createCarPostDTO()
                .id(this.id)
                .member(this.member)
                .cars(this.cars)
                .title(this.title)
                .content(this.content)
                .sdate(this.sdate)
                .edate(this.edate)
                .recruit(this.recruit)
                .startLongitude(this.startLongitude)
                .startLatitude(this.startLatitude)
                .arriveLongitude(this.arriveLongitude)
                .arriveLatitude(this.arriveLatitude)
                .stime(this.stime)
                .photoName(this.photoName)
                .build();
    }

}
