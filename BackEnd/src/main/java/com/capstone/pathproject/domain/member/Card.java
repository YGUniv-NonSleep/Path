package com.capstone.pathproject.domain.member;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@SequenceGenerator(
        name = "CARD_SEQ_GENERATOR",
        sequenceName = "CARD_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Card {

    @Id
    @Column(name = "CARD_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @Column(name = "CARD_CRE_DATETIME")
    private LocalDateTime createTime;

    @Column(name = "CARD_CORP")
    private String cardCompany;

    @Column(name = "CARD_NUM")
    private String number;
    private String billingKey;
}
