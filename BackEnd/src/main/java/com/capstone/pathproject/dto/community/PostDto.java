package com.capstone.pathproject.dto.community;


import com.capstone.pathproject.domain.BaseEntity;
import com.capstone.pathproject.domain.community.Post;
import com.capstone.pathproject.domain.community.PostType;
import com.capstone.pathproject.domain.member.Member;
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
    private String loginId;


    @Builder(builderMethodName = "createPostDto")
    public PostDto(Long id, PostType type, String title, String content, int view, String photoName,String loginId){
        this.id = id;
        this.type = type;
        this.title = title;
        this.content = content;
        this.view = view;
        this.photoName = photoName;
        this.loginId = loginId;
    }

    public PostDto(Post post) {
        this.id = post.getId();
        this.type = post.getType();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.view = post.getView();
        this.photoName = post.getPhotoName();
        this.loginId = post.getCreatedBy();
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
