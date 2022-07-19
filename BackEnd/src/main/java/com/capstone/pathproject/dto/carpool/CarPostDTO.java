package com.capstone.pathproject.dto.carpool;


import com.capstone.pathproject.domain.carpool.CarPost;
import com.capstone.pathproject.domain.carpool.Cars;
import com.capstone.pathproject.domain.member.Member;
import lombok.*;

import java.sql.Time;
import java.time.LocalDate;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CarPostDTO{
    private Long id;
    private Member member;
    private Cars cars;
    private String title;
    private String content;
    private LocalDate sdate;
    private LocalDate edate;
    private int recruit;
    private String startLongitude;
    private String startLatitude;
    private String arriveLongitude;
    private String arriveLatitude;
    private String stime;
    private String photoName;
    private String startLocal1;
    private String startLocal2;
    private String arriveLocal1;
    private String arriveLocal2;
    private int price;

    @Builder(builderMethodName = "createCarPostDTO")
    public CarPostDTO(Long id, Member member, Cars cars ,String title, String content, LocalDate sdate, LocalDate edate, int recruit,
                      String startLongitude, String startLatitude, String arriveLongitude, String arriveLatitude, String stime, String photoName,
                      String startLocal1,String startLocal2,String arriveLocal1, String arriveLocal2, int price){

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
    public CarPost toEntity(){
        return CarPost.createCarPost()
                .id(id)
                .member(member)
                .cars(cars)
                .title(title)
                .content(content)
                .sdate(sdate)
                .edate(edate)
                .recruit(recruit)
                .startLongitude(startLongitude)
                .startLatitude(startLatitude)
                .arriveLongitude(arriveLongitude)
                .arriveLatitude(arriveLatitude)
                .stime(stime)
                .photoName(photoName)
                .startLocal1(startLocal1)
                .startLocal2(startLocal2)
                .arriveLocal1(arriveLocal1)
                .arriveLocal2(arriveLocal2)
                .price(price)
                .build();

    }
}

