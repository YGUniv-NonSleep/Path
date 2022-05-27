package com.capstone.pathproject.dto.company;

import com.capstone.pathproject.domain.company.CompCategory;
import com.capstone.pathproject.domain.company.Company;
import com.capstone.pathproject.dto.member.MemberDto;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CompanyDTO {
    private Long id;

    @NotBlank(message = "이름을 입력해 주세요")
    private String name;

    @NotBlank(message = "사업자 등록번호를 입력해 주세요")
    private String companyNumber;

    private LocalDate openDate;

    @NotNull(message = "카테고리를 설정해 주세요")
    private CompCategory category;

    private String mail;

    @NotBlank(message = "전화번호를 입력해 주세요")
    private String phone;

    private MemberDto member;

    private double latitude;

    private double longitude;

    private String addr;
    private String addrDetail;

    private LocalTime open;
    private LocalTime close;

    private String thumbnail;



    @Builder(builderMethodName = "createCompanyDTD")
    public CompanyDTO(Long id,LocalTime open, LocalTime close,String addr,String addrDetail, String name, String companyNumber, LocalDate openDate, CompCategory category, String mail, String phone, Double latitude, Double longitude, MemberDto member, String thumbnail) {
        this.id = id;
        this.name = name;
        this.companyNumber = companyNumber;
        this.openDate = openDate;
        this.category = category;
        this.mail = mail;
        this.phone = phone;
        this.longitude = longitude;
        this.latitude = latitude;
        this.member = member;
        this.thumbnail = thumbnail;
        this.addr = addr;
        this.addrDetail = addrDetail;
        this.open = open;
        this.close = close;
    }


    public Company toEntity() {
        return Company.createCompany()
                .id(id)
                .companyNumber(companyNumber)
                .mail(mail)
                .category(category)
                .name(name)
                .openDate(openDate)
                .phone(phone)
                .member(member.toEntity())
                .thumbnail(thumbnail)
                .latitude(latitude)
                .longitude(longitude)
                .addr(addr)
                .addrDetail(addrDetail)
                .build();
    }

    public void addMember(MemberDto member){
        this.member = member;
    }

}
