package com.capstone.pathproject.domain.company;


import com.capstone.pathproject.domain.member.Member;

import javax.persistence.*;

@Entity
@SequenceGenerator(
        name = "COMP_MEMBER_SEQ_GENERATOR",
        sequenceName = "COMP_MEMBER_SEQ",
        initialValue = 1, allocationSize = 1
)
public class CompMember {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "COMP_MEMBER_SEQ_GENERATOR")
    @Column(name = "COMP_MEMBER_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member memberId;

    @ManyToOne
    @JoinColumn(name = "COMPANY_ID")
    private Company company;

}
