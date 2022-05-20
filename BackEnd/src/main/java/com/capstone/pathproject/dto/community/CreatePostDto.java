package com.capstone.pathproject.dto.community;

import com.capstone.pathproject.domain.BaseEntity;
import com.capstone.pathproject.domain.community.PostType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class CreatePostDto {
    private PostType type;
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    private String photoName;
    @NotNull
    private Long memberId;
}
