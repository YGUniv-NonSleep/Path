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
    private Time stime;
    private String photoName;
    private String local;

    @Builder(builderMethodName = "createCarPostDTO")
    public CarPostDTO(Long id, Member member, Cars cars ,String title, String content, LocalDate sdate, LocalDate edate, int recruit,
                      String startLongitude, String startLatitude, String arriveLongitude, String arriveLatitude, Time stime, String photoName, String local){

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
        this.local = local;
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
                .local(local)
                .build();

    }
}

