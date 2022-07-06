package com.capstone.pathproject.domain.carpool;


import com.capstone.pathproject.domain.member.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@SequenceGenerator(
        name = "BOARDING_SEQ_GENERATOR",
        sequenceName = "BOARDING_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardingDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BOARDING_SEQ_GENERATOR")
    @Column(name = "BOARDING_ID")
    private Long boardingId;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "OPERATION_ID")
    private OperationDetail operationDetail;

    @ManyToOne
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @OneToOne
    @JoinColumn(name = "REQ_ID")
    private CarPostRequest carPostRequest;

    @Column(name = "BOARDING_STATUS")
    private String status;

    @Column(name = "BOARDING_COST")
    private String cost;

    @Column(name = "BOARDING_TRADE_NUM")
    private String tradeNum;

    @Column(name = "BOARDING_DACCOUNT_P")
    private String daccount;

    @Column(name = "BOARDING_RNAME")
    private String rname;

    @Column(name = "BOARDING_WACCOUNT_P")
    private String waccount;

    @Column(name = "BOARDING_SNAME")
    private String sname;


    @Builder(builderMethodName = "createBoardingDetail")
    public BoardingDetail(Long boardingId, OperationDetail operationDetail, Member member,CarPostRequest carPostRequest,
                          String status, String cost, String tradeNum, String daccount, String rname,
                          String waccount, String sname){
        this.boardingId = boardingId;
        this.operationDetail = operationDetail;
        this.member = member;
        this.carPostRequest = carPostRequest;
        this.status = status;
        this.cost = cost;
        this.tradeNum = tradeNum;
        this.daccount =daccount;
        this.rname = rname;
        this.waccount = waccount;
        this.sname = sname;

    }



}
