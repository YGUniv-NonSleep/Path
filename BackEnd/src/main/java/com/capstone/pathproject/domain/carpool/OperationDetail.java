package com.capstone.pathproject.domain.carpool;


import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.carpool.OperationDetailDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@SequenceGenerator(
        name="OPERATION_SEQ_GENERATOR",
        sequenceName = "OPERATION_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OperationDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "OPERATION_SEQ_GENERATOR")
    @Column(name ="OPERATION_ID")
    private Long operationId;

    @ManyToOne
    @JoinColumn(name="CARPOST_ID")
    private CarPost carPost;

    @ManyToOne
    @JoinColumn(name="MEM_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "CARS_ID")
    private Cars cars;

    @Column(name = "OPERATION_STATUS")
    private String status;

    @Column(name = "OPERATION_COST")
    private String cost;

    @Builder(builderMethodName = "createOperation")
    public OperationDetail(Long operationId, CarPost carPost, Cars cars, String status, String cost,Member member){
        this.operationId = operationId;
        this.carPost = carPost;
        this.cars = cars;
        this.status = status;
        this.cost = cost;
        this.member = member;
    }

    public OperationDetailDto toDto(){
        return OperationDetailDto.createOperationDto()
                .carPost(this.carPost)
                .operationId(this.operationId)
                .cars(this.cars)
                .cost(this.cost)
                .status(this.status)
                .member(this.member)
                .build();
    }

}
