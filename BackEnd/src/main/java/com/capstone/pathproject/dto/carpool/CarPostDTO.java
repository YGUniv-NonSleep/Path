package com.capstone.pathproject.dto.carpool;


import com.capstone.pathproject.domain.carpool.CarPost;
import com.capstone.pathproject.domain.carpool.Cars;
import com.capstone.pathproject.domain.member.Member;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

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
    private LocalDateTime stime;
    private String photoName;

    @Builder(builderMethodName = "createCarPostDTO")
    public CarPostDTO(Long id, Member member, Cars cars ,String title, String content, LocalDate sdate, LocalDate edate, int recruit,
                      String startLongitude, String startLatitude, String arriveLongitude, String arriveLatitude, LocalDateTime stime, String photoName){

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
                .build();

    }
}

