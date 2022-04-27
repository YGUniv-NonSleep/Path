package com.capstone.pathproject.repository.file;

import com.capstone.pathproject.domain.file.UploadFile;
import com.capstone.pathproject.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UploadFileRepository extends JpaRepository<UploadFile, Long> {

    List<UploadFile> findByMemberAndCategory(Member member, String category);
}
