package com.capstone.pathproject.dto.carpool;


import com.capstone.pathproject.domain.carpool.CarPost;
import com.capstone.pathproject.domain.carpool.CarPostRequest;
import com.capstone.pathproject.domain.member.Member;
import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CarPostRequestDTO {
    private Long id;
    private Member member;
    private CarPost carPost;
    private String content;
    private int price;
    private String startLongitude;
    private String startLatitude;
    private String arriveLongitude;
    private String arriveLatitude;
    private int passenger;
    private String approval;


    @Builder(builderMethodName = "createRequestDTO")
    public CarPostRequestDTO(Long id, Member member, CarPost carPost, String content, int price,
                             String startLongitude, String startLatitude, String arriveLongitude, String arriveLatitude,
                             int passenger, String approval){
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

    public CarPostRequestDTO(CarPostRequest carPostRequest){
        this.id = carPostRequest.getId();
        this.member = carPostRequest.getMember();
        this.carPost= carPostRequest.getCarPost();
        this.content = carPostRequest.getContent();
        this.price = carPostRequest.getPrice();
        this.startLongitude = carPostRequest.getStartLongitude();
        this.startLatitude = carPostRequest.getStartLatitude();
        this.arriveLongitude = carPostRequest.getArriveLongitude();
        this.arriveLatitude = carPostRequest.getArriveLatitude();
        this.passenger = carPostRequest.getPassenger();
        this.approval = carPostRequest.getApproval();
    }

    public CarPostRequest toEntity(){
        return CarPostRequest.createRequest()
                .id(id)
                .member(member)
                .carPost(carPost)
                .content(content)
                .price(price)
                .startLongitude(startLongitude)
                .startLatitude(startLatitude)
                .arriveLongitude(arriveLongitude)
                .arriveLatitude(arriveLatitude)
                .passenger(passenger)
                .approval(approval)
                .build();
    }

}
