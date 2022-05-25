package com.capstone.pathproject.domain.carpool;


import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.carpool.CarPostRequestDTO;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@SequenceGenerator(
        name = "REQUEST_SEQ_GENERATOR",
        sequenceName = "REQUEST_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CarPostRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "REQUEST_SEQ_GENERATOR")
    @Column(name = "REQ_ID")
    private Long id; //신청에 대한 PK

    @ManyToOne
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "CARPOST_ID")
    private CarPost carPost;

    @Column(name = "REQ_CONT")
    private String content;

    @Column(name = "REQ_PRICE")
    private int price;

    @Column(name = "REQ_START_LGT")
    private String startLongitude;

    @Column(name = "REQ_START_LTD")
    private String startLatitude;

    @Column(name = "REQ_ARR_LGT")
    private String arriveLongitude;

    @Column(name = "REQ_ARR_LTD")
    private String arriveLatitude;

    @Column(name = "REQ_PASSENGER")
    private int passenger;

    @Column(name = "REQ_APPROVAL")
    private String approval;

    @Builder(builderMethodName = "createRequest")
    public CarPostRequest(Long id, Member member, CarPost carPost, String content, int price,
                          String startLongitude, String startLatitude, String arriveLongitude,
                          String arriveLatitude, int passenger, String approval){
        this.id = id;
        this.member = member;
        this.carPost = carPost;
        this.content = content;
        this.price = price;
        this.startLongitude = startLongitude;
        this.startLatitude = startLatitude;
        this.arriveLongitude = arriveLongitude;
        this.arriveLatitude = arriveLatitude;
        this.passenger = passenger;
        this.approval = approval;

    }

    public CarPostRequestDTO toDTO(){
        return CarPostRequestDTO.createRequestDTO()
                .id(this.id)
                .member(this.member)
                .carPost(this.carPost)
                .content(this.content)
                .price(this.price)
                .startLongitude(this.startLongitude)
                .startLatitude(this.startLatitude)
                .arriveLongitude(this.arriveLongitude)
                .arriveLatitude(this.arriveLatitude)
                .passenger(this.passenger)
                .approval(this.approval)
                .build();
    }
}
