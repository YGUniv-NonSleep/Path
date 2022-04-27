package com.capstone.pathproject.domain.file;

import com.capstone.pathproject.domain.BaseTimeEntity;
import com.capstone.pathproject.domain.member.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "FILE")
@SequenceGenerator(
        name = "FILE_SEQ_GENERATOR",
        sequenceName = "FILE_SEQ",
        initialValue = 1, allocationSize = 1)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AttributeOverrides({
        @AttributeOverride(name = "createdDateTime", column = @Column(name = "FILE_CREATED_DATETIME")),
        @AttributeOverride(name = "updatedDateTime", column = @Column(name = "FILE_UPDATED_DATETIME"))
})
public class UploadFile extends BaseTimeEntity {

    @Id
    @Column(name = "FILE_ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "FILE_SEQ_GENERATOR")
    private Long id;

    @Column(name = "FILE_CATEGORY")
    private String category; // 사진 저장한 위치타입, ex)community, carpool, product

    @Column(name = "FILE_UPLOAD_NAME")
    private String uploadFileName; // 유저가 업로드한 파일명

    @Column(name = "FILE_STORE_NAME")
    private String storeFileName; // 서버 내부에서 관리하는 파일명

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEM_ID")
    private Member member;

    @Builder(builderMethodName = "createBuilder")
    public UploadFile(Long id, String category, String uploadFileName, String storeFileName, Member member) {
        this.id = id;
        this.category = category;
        this.uploadFileName = uploadFileName;
        this.storeFileName = storeFileName;
        this.member = member;
    }
}
