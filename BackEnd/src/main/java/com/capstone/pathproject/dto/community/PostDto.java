package com.capstone.pathproject.dto.community;


import com.capstone.pathproject.domain.community.Post;
import com.capstone.pathproject.domain.community.PostType;
import com.capstone.pathproject.dto.member.MemberDto;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class PostDto {
    private Long id;
    private PostType type;
    private String title;
    private String content;
    private int view;
    private String photoName;


    @Builder(builderMethodName = "createPostDto")
    public PostDto(Long id, PostType type, String title,String content, int view, String photoName){
        this.id = id;
        this.type = type;
        this.title = title;
        this.content = content;
        this.view = view;
        this.photoName = photoName;
    }


    public Post toEntity(){
        return Post.createPost()
                .id(id)
                .type(type)
                .title(title)
                .content(content)
                .view(view)
                .photoName(photoName)
                .build();
    }
}
