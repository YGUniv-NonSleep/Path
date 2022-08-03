package com.capstone.pathproject.dto.carpool;


import com.capstone.pathproject.domain.carpool.CarPost;
import com.capstone.pathproject.domain.carpool.Cars;
import com.capstone.pathproject.domain.carpool.OperationDetail;
import com.capstone.pathproject.domain.member.Member;
import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OperationDetailDto {
    private Long operationId;
    private CarPost carPost;

    private Member member;
    private Cars cars;
    private String status;
    private String cost;

    @Builder(builderMethodName = "createOperationDto")
    public OperationDetailDto(Long operationId, CarPost carPost, Cars cars, String status, String cost, Member member){
        this.operationId = operationId;
        this.carPost = carPost;
        this.cars = cars;
        this.status = status;
        this.cost = cost;
        this.member = member;
    }

    public OperationDetailDto(OperationDetail operationDetail){
        this.operationId = operationDetail.getOperationId();
        this.carPost = operationDetail.getCarPost();
        this.cars = operationDetail.getCars();
        this.status = operationDetail.getStatus();
        this.cost = operationDetail.getCost();
        this.member = operationDetail.getMember();
    }

}
