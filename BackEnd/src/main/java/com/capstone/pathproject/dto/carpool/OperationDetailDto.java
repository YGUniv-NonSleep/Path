package com.capstone.pathproject.dto.carpool;


import com.capstone.pathproject.domain.carpool.CarPost;
import com.capstone.pathproject.domain.carpool.Cars;
import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OperationDetailDto {
    private Long operationId;
    private CarPost carPost;
    private Cars cars;
    private String status;
    private String cost;

    @Builder(builderMethodName = "createOperationDto")
    public OperationDetailDto(Long operationId, CarPost carPost, Cars cars, String status, String cost){
        this.operationId = operationId;
        this.carPost = carPost;
        this.cars = cars;
        this.status = status;
        this.cost = cost;
    }
}
