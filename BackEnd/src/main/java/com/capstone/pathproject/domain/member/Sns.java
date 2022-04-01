package com.capstone.pathproject.domain.member;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@SequenceGenerator(
        name = "SNS_SEQ_GENERATOR",
        sequenceName = "SNS_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Sns {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SNS_SEQ_GENERATOR")
    @Column(name = "SNS_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @Column(name = "SNS_LOGIN_ID")
    private String loginId;

    @Column(name = "SNS_TYPE")
    private String type;
}
