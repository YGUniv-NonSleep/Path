package com.capstone.pathproject.domain.community;

import com.capstone.pathproject.domain.BaseEntity;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.community.PostDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@DynamicUpdate
@SequenceGenerator(
        name = "POST_SEQ_GENERATOR",
        sequenceName = "POST_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "POST_SEQ_GENERATOR")
    @Column(name = "POST_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(name = "POST_TYPE")
    private PostType type;

    @OneToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "POST_PARENT_ID")
    private Post parent;

    @Column(name = "POST_TITLE")
    private String title;

    @Column(name = "POST_CONT")
    private String content;

    @Column(name = "POST_VIEW", columnDefinition = "integer default 0", nullable = false)
    private int view;

//    @Column(name = "POST_WRITE_DATE")
//    private LocalDate writeDate;

    @Column(name = "POST_PHOTO_NAME", nullable = true)
    private String photoName;


    @Builder(builderMethodName = "createPost")
    public Post(Long id, Member member, PostType type, Post parent, String title, String content, int view, String photoName) {
        this.id = id;
        this.member = member;
        this.type = type;
        this.parent = parent;
        this.title = title;
        this.content = content;
        this.view = view;
        this.photoName = photoName;
    }

    public PostDto toDTO() {
        return PostDto.createPostDto()
                .type(this.type)
                .view(this.view)
                .content(this.content)
                .title(this.title)
                .photoName(this.photoName)
                .id(this.id)
                .build();
    }

    public void updateTitle(String title) {
        this.title = title;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void updatePhotoName(String photoName) {
        this.photoName = photoName;
    }

    public void updateType(PostType type) {
        this.type = type;
    }

}
