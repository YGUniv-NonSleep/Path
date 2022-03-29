package com.capstone.pathproject.dto;


import com.capstone.pathproject.domain.carpool.CarPoolPost;
import com.capstone.pathproject.domain.carpool.Vehicle;
import com.capstone.pathproject.domain.member.Member;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CarPoolPostDTO {
    private Long id;
    private Member member;
    private Vehicle vehicle;
    private String title;
    private String content;
    private LocalDate start;
    private LocalDate end;
    private Integer recruit;
    private Long startLongitude;
    private Long startLatitude;
    private Long arrLongitude;
    private Long arrLatitude;
    private LocalDateTime startTime;
    private String picture;

    @Builder(builderMethodName = "createCarPoolDTO")
    public CarPoolPostDTO(Long id, Member member, Vehicle vehicle,String title, String content, LocalDate start, LocalDate end, Integer recruit,
                          Long startLongitude, Long startLatitude, Long arrLongitude, Long arrLatitude, LocalDateTime startTime, String picture){

        this.id = id;
        this.member = member;
        this.vehicle = vehicle;
        this.title = title;
        this.content = content;
        this.start = start;
        this. end = end;
        this.recruit = recruit;
        this.startLongitude = startLongitude;
        this.startLatitude = startLatitude;
        this.arrLongitude = arrLongitude;
        this.arrLatitude = arrLatitude;
        this.startTime = startTime;
        this.picture = picture;
    }


    public CarPoolPost toEntity(){
        return CarPoolPost.createContent()
                .id(id)
                .member(member)
                .vehicle(vehicle)
                .title(title)
                .content(content)
                .start(start)
                .end(end)
                .recruit(recruit)
                .startLongitude(startLongitude)
                .startLatitude(startLatitude)
                .arrLongitude(arrLongitude)
                .arrLatitude(arrLatitude)
                .startTime(startTime)
                .picture(picture)
                .build();
    }
}



