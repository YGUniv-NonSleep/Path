package com.capstone.pathproject.dto.member;

import com.capstone.pathproject.domain.member.Card;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class CardDto {
    private Long id;
    private String number;
    private String cardCompany;
    private String type;
    private LocalDateTime createTime;

    public CardDto(Long id, String number, String cardCompany, String type, LocalDateTime createTime) {
        this.id = id;
        this.number = number;
        this.cardCompany = cardCompany;
        this.type = type;
        this.createTime = createTime;
    }

    public CardDto(Card card) {
        this.id = card.getId();
        this.number = card.getNumber();
        this.cardCompany = card.getCardCompany();
        this.type = card.getType();
        this.createTime = card.getCreatedDateTime();
    }
}
