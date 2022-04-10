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
    private String price;
    private String startLongitude;
    private String startLatitude;
    private String arriveLongitude;
    private String arriveLatitude;
    private String passenger;
    private String approval;


    @Builder(builderMethodName = "createRequestDTO")
    public CarPostRequestDTO(Long id, Member member, CarPost carPost, String content, String price,
                             String startLongitude, String startLatitude, String arriveLongitude, String arriveLatitude,
                             String passenger, String approval){
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