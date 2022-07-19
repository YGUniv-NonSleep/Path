package com.capstone.pathproject.dto.carpool;


import com.capstone.pathproject.domain.carpool.BoardingDetail;
import com.capstone.pathproject.domain.carpool.CarPostRequest;
import com.capstone.pathproject.domain.carpool.OperationDetail;
import com.capstone.pathproject.domain.member.Member;
import lombok.*;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BoardingDetailDto {

    private Long boardingId;
    private OperationDetail operationDetail;
    private Member member;
    private CarPostRequest carPostRequest;
    private String status;
    private String cost;
    private String tradeNum;
    private String daccount;
    private String rname;
    private String waccount;
    private String sname;

    @Builder(builderMethodName = "createBoardingDetialDto")
    public BoardingDetailDto(Long boardingId, OperationDetail operationDetail, Member member, CarPostRequest carPostRequest,
                             String status, String cost, String tradeNum, String daccount,
                             String rname, String waccount, String sname){
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

    public BoardingDetailDto(BoardingDetail boardingDetail){
        this.boardingId = boardingDetail.getBoardingId();
        this.operationDetail = boardingDetail.getOperationDetail();
        this.member = boardingDetail.getMember();
        this.carPostRequest = boardingDetail.getCarPostRequest();
        this.status = boardingDetail.getStatus();
        this.cost = boardingDetail.getCost();
        this.tradeNum = boardingDetail.getTradeNum();
        this.daccount =boardingDetail.getDaccount();
        this.rname = boardingDetail.getRname();
        this.waccount = boardingDetail.getWaccount();
        this.sname = boardingDetail.getSname();
    }
}
