package com.capstone.pathproject.domain.carpool;


import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.carpool.CarPostDTO;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Time;
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
    private Time stime;

    @Column(name = "CARPOST_PHOTO_NAME")
    private String photoName;

    @Column(name = "CARPOST_STARTLOCAL1")
    private String startLocal1;

    @Column(name = "CARPOST_STARTLOCAL2")
    private String startLocal2;

    @Column(name = "CARPOST_ARRIVELOCAL1")
    private String arriveLocal1;

    @Column(name = "CARPOST_ARRIVELOCAL2")
    private String arriveLocal2;

    @Column(name = "CARPOST_PRICE")
    private int price;

    @Builder(builderMethodName = "createCarPost")
    public CarPost(Long id, Member member,Cars cars ,String title, String content, LocalDate sdate, LocalDate edate,
                   int recruit, String startLongitude, String startLatitude, String arriveLongitude, String arriveLatitude, Time stime, String photoName,
                   String startLocal1,String startLocal2,String arriveLocal1,String arriveLocal2, int price){

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
        this.stime = stime;
        this.photoName = photoName;
        this.startLocal1 = startLocal1;
        this.startLocal2 = startLocal2;
        this.arriveLocal1 = arriveLocal1;
        this.arriveLocal2 = arriveLocal2;
        this.price = price;
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
                .startLocal1(this.startLocal1)
                .startLocal2(this.startLocal2)
                .arriveLocal1(this.arriveLocal1)
                .arriveLocal2(this.arriveLocal2)
                .price(this.price)
                .build();
    }

    public void updateTitle(String title){this.title = title;}
    public void updateContent(String content){this.content = content;}
    public void updateRecruit(int recruit){this.recruit = recruit;}
    public void updateStime(Time stime){this.stime = stime;}
    public void updatestartLocal1(String startLocal1){this.startLocal1 = startLocal1;}
    public void updateStartLocal2(String startLocal2){this.startLocal2 = startLocal2;}
    public void updateArriveLocal1(String arriveLocal1){this.arriveLocal1 = arriveLocal1;}
    public void updateArriveLocal2(String arriveLocal2){this.arriveLocal2 = arriveLocal2;}
    public void updateSdate(LocalDate sdate){this.sdate = sdate;}
    public void updateEdate(LocalDate edate){this.edate =edate;}
    public void updatePhotoName(String photoName){this.photoName = photoName;}
    public void updatePrice(int price){this.price = price;}

}
