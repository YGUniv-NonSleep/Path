package com.capstone.pathproject.dto.community;

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
public class ReplyCreatePostDto {

    @NotBlank
    private PostType type;
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    @NotBlank
    private String photoName;
    @NotNull
    private Long postId;
}
