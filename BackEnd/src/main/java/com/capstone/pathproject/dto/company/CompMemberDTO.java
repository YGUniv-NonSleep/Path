package com.capstone.pathproject.dto.company;

import com.capstone.pathproject.domain.company.CompMember;
import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.domain.member.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CompMemberDTO {

    private Long id;
    private Member member;
    private Company company;


    @Builder(builderMethodName = "createDTO")
    public CompMemberDTO(Long id, Member member, Company company){
        this.id = id;
        this.member = member;
        this.company = company;
    }

    public CompMember toEntity(){
        return CompMember.createCompMember()
                .id(this.id)
                .company(this.company)
                .member(this.member)
                .build();
    }





}
