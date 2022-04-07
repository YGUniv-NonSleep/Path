package com.capstone.pathproject.domain.carpool;


import com.capstone.pathproject.domain.member.Member;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@SequenceGenerator(
        name = "CARPOST_SEQ_GENERATOR",
        sequenceName = "CARPOST_SEQ",
        initialValue = 1,allocationSize = 1
)
public class CarPoolPost {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CARPOST_SEQ_GENERATOR")
    @Column(name="CPOST_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name="MEM_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "CAR_ID")
    private Vehicle vehicle;


    @Column(name = "CPOST_TITLE")
    private String title;

    @Column(name = "CPOST_CONT")
    private String content;

    @Column(name = "CPOST_SDATE")
    private LocalDate start;

    @Column(name = "CPOST_EDATE")
    private LocalDate end;

    @Column(name = "CPOST_REC")
    private Integer recruit;

    @Column(name = "CPOST_START_LGT")
    private Long startLongitude;

    @Column(name = "CPOST_START_LTD")
    private Long startLatitude;

    @Column(name = "CPOST_ARR_LGT")
    private Long arrLongitude;

    @Column(name = "CPOST_ARR_LTD")
    private Long arrLatitude;

    @Column(name = "CPOST_STIME")
    private LocalDateTime startTime;

    @Column(name = "CPOST_PICTURE")
    private String picture;

    public CarPoolPost(){}


    @Builder(builderMethodName = "createContent")
    public CarPoolPost(Long id, Member member, Vehicle vehicle, String title, String content, LocalDate start, LocalDate end, Integer recruit, Long startLongitude, Long startLatitude,
                       Long arrLongitude, Long arrLatitude, LocalDateTime startTime, String picture) {
        this.id = id;
        this.member = member;
        this.vehicle = vehicle;
        this.title = title;
        this.content = content;
        this.start = start;
        this.end = end;
        this.recruit = recruit;
        this.startLongitude = startLongitude;
        this.startLatitude = startLatitude;
        this.arrLongitude = arrLongitude;
        this.arrLatitude = arrLatitude;
        this.startTime = startTime;
        this.picture = picture;

    }


}
