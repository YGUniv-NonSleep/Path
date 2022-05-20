package com.capstone.pathproject.dto.community;

import com.capstone.pathproject.domain.community.PostType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ReplyUpdatePostDto {
    @NotNull
    private PostType type;
    private String title;
    private String content;
    private String photoName;
}
