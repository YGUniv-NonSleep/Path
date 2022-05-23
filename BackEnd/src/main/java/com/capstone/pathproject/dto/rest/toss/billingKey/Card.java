package com.capstone.pathproject.dto.rest.toss.billingKey;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Card {
    private String company;
    private String number;
    private String cardType;
    private String ownerType;
}
