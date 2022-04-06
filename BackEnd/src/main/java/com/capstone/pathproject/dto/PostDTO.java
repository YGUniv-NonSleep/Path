package com.capstone.pathproject.dto;

import com.capstone.pathproject.domain.community.Post;
import com.capstone.pathproject.domain.community.PostType;
import com.capstone.pathproject.domain.member.Member;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostDTO {
    private Long id; //pk
    private Member member; //글쓴이
    @NotNull
    private PostType type;
    private Post parent; //부모
    @NotNull
    private String title;
    @NotNull
    private String content;
    private int view;
    private LocalDate writeDate;
    private String photoName;

    @Builder(builderMethodName = "createPostDTO")
    public PostDTO(Long id, Member member, PostType type, Post parent, String title, String content,
                   int view, LocalDate writeDate,  String photoName){
        this.id = id;
        this. member = member;
        this.type = type;
        this.parent = parent;
        this.title = title;
        this.content = content;
        this.view = view;
        this.writeDate = LocalDate.now();
        this.photoName = photoName;
    }

    public Post toEntity(){
        return Post.createPost()
                .id(id)
                .member(member)
                .type(type)
                .parent(parent)
                .title(title)
                .content(content)
                .view(view)
                .writeDate(writeDate)
                .photoName(photoName)
                .build();
    }
}
