package com.capstone.pathproject.domain.member;

import com.capstone.pathproject.domain.BaseTimeEntity;
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
@AttributeOverrides({
        @AttributeOverride(name = "createdDateTime", column = @Column(name = "CARD_CREATED_DATETIME")),
        @AttributeOverride(name = "updatedDateTime", column = @Column(name = "CARD_UPDATED_DATETIME"))
})
public class Card extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CARD_SEQ_GENERATOR")
    @Column(name = "CARD_ID")
    private Long id;

    @Column(name = "CARD_NUM")
    private String number;

    @Column(name = "CARD_COMPANY")
    private String cardCompany;

    @Column(name = "CARD_TYPE")
    private String type;

    @Column(name = "CARD_BILLING_KEY")
    private String billingKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @Builder
    public Card(String number, String cardCompany, String type, String billingKey, Member member) {
        this.number = number;
        this.cardCompany = cardCompany;
        this.type = type;
        this.billingKey = billingKey;
        this.member = member;
    }

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", member=" + member +
                ", cardCompany='" + cardCompany + '\'' +
                ", number='" + number + '\'' +
                ", billingKey='" + billingKey + '\'' +
                '}';
    }
}
