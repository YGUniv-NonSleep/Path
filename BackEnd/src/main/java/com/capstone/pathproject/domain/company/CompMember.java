package com.capstone.pathproject.domain.company;


import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.company.CompMemberDTO;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;

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
    @Column(name = "COM_MEMBER_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "COM_ID")
    private Company company;

    @Builder(builderMethodName = "createCompMember")
    public CompMember(Long id, Member member, Company company){
        this.id = id;
        this.company = company;
        this.member = member;
    }

    public CompMember() { }

    public CompMemberDTO toDTO() {
        return CompMemberDTO.createDTO()
                .company(this.company)
                .member(this.member)
                .build();


    }
}
