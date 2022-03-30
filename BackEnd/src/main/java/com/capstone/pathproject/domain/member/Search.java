package com.capstone.pathproject.domain.member;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@SequenceGenerator(
        name = "SEARCH_SEQ_GENERATOR",
        sequenceName = "SEARCH_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Search {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEARCH_SEQ_GENERATOR")
    @Column(name = "SEAR_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @Column(name = "SEAR_START_ADDR")
    private String startAddr;

    @Column(name = "SEAR_END_ADDR")
    private String endAddr;

    @Column(name = "SEAR_TIME")
    private LocalDateTime time;
}
