package com.capstone.pathproject.dto.member;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CardDTO {

    private Long id;
    private MemberDTO memberDTO;
    private LocalDateTime createTime;
    private String cardCompany;
    private String number;
    private String billingKey;

    @Builder
    public CardDTO(Long id, MemberDTO memberDTO, LocalDateTime createTime, String cardCompany, String number, String billingKey) {
        this.id = id;
        this.memberDTO = memberDTO;
        this.createTime = createTime;
        this.cardCompany = cardCompany;
        this.number = number;
        this.billingKey = billingKey;
    }

    public CardDTO(Long id, String cardCompany, String number) {
        this.id = id;
        this.cardCompany = cardCompany;
        this. number = number;
    }

    @Override
    public String toString() {
        return "CardDTO{" +
                "id=" + id +
                ", memberDTO=" + memberDTO +
                ", createTime=" + createTime +
                ", cardCompany='" + cardCompany + '\'' +
                ", number='" + number + '\'' +
                ", billingKey='" + billingKey + '\'' +
                '}';
    }
}
