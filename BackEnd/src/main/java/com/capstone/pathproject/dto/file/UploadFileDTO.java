package com.capstone.pathproject.dto.file;

import com.capstone.pathproject.domain.file.UploadFile;
import lombok.Getter;

@Getter
public class UploadFileDTO {
    private Long id;
    private String uploadFileName; // 고객이 업로드한 파일명
    private String storeFileName; // 서버 내부에서 관리하는 파일명

    public UploadFileDTO(Long id, String uploadFileName, String storeFileName) {
        this.id = id;
        this.uploadFileName = uploadFileName;
        this.storeFileName = storeFileName;
    }

    public UploadFileDTO(UploadFile uploadFile) {
        this.id = uploadFile.getId();
        this.uploadFileName = uploadFile.getUploadFileName();
        this.storeFileName = uploadFile.getStoreFileName();
    }
}
