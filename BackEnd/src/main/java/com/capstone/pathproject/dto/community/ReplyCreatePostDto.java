package com.capstone.pathproject.dto.community;

import com.capstone.pathproject.domain.community.PostType;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ReplyCreatePostDto {
    @NotNull
    private PostType type;
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    private String photoName;
    @NotNull
    private Long postId; // Parent
}
