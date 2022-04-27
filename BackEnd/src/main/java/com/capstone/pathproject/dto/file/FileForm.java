package com.capstone.pathproject.dto.file;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
public class FileForm {
    private String category;
    private List<MultipartFile> imageFiles;

    public FileForm(String category, List<MultipartFile> imageFiles) {
        this.category = category;
        this.imageFiles = imageFiles;
    }

    @Override
    public String toString() {
        return "FileForm{" +
                "type='" + category + '\'' +
                ", imageFiles=" + imageFiles +
                '}';
    }
}
