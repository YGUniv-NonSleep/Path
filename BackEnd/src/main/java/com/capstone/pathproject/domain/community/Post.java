package com.capstone.pathproject.domain.community;

import com.capstone.pathproject.domain.member.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@SequenceGenerator(
        name = "POST_SEQ_GENERATOR",
        sequenceName = "POST_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post {

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

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "POST_PARENT_ID")
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private Post parent;

    @Column(name = "POST_TITLE")
    private String title;

    @Column(name = "POST_CONT")
    private String content;

    @Column(name = "POST_VIEW",columnDefinition = "integer default 0",nullable = false)
    private int view;

    @Column(name = "POST_WRITE_DATE")
    private LocalDate writeDate;

    @Column(name = "POST_PHOTO_NAME",nullable = true)
    private String photoName;



    @Builder(builderMethodName = "createPost")
    public Post(Long id, Member member, PostType type, Post parent, String title, String content, int view, LocalDate writeDate, String photoName){
        this.id = id;
        this.member = member;
        this.type = type;
        this.parent = parent;
        this.title = title;
        this.content = content;
        this.view = view;
        this.writeDate = LocalDate.now();
        this.photoName = photoName;
    }

}
