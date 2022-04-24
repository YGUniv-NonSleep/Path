package com.capstone.pathproject.domain.member;

import lombok.AccessLevel;
import lombok.Builder;
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

    public Card(String number) {
        this.number = number;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CARD_SEQ_GENERATOR")
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

    @Column(name = "CARD_BILLING_KEY")
    private String billingKey;

    @Builder
    public Card(Long id, Member member, LocalDateTime createTime, String cardCompany, String number, String billingKey) {
        this.id = id;
        this.member = member;
        this.createTime = createTime;
        this.cardCompany = cardCompany;
        this.number = number;
        this.billingKey = billingKey;
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "createTime = " + createTime + ", " +
                "cardCompany = " + cardCompany + ", " +
                "number = " + number + ", " +
                "billingKey = " + billingKey + ")";
    }
}
