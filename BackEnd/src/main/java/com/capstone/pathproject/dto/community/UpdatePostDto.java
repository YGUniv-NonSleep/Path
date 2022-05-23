package com.capstone.pathproject.dto.community;

import com.capstone.pathproject.domain.community.PostType;
import com.capstone.pathproject.dto.member.MemberDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UpdatePostDto {
    @NotNull
    private PostType type;
    private String title;
    private String content;
    private String photoName;
}
