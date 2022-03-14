package com.capstone.pathproject.domain.community;

import com.capstone.pathproject.domain.member.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    @OneToOne
    @JoinColumn(name = "POST_PARENT_ID")
    private Post parent;

    @Column(name = "POST_TITLE")
    private String title;

    @Column(name = "POST_CONT")
    private String content;

    @Column(name = "POST_VIEW")
    private String view;

    @Column(name = "POST_WRITE_DATE")
    private String writeDate;

    @Column(name = "POST_PHOTO_PATH")
    private String photoPath;
}
