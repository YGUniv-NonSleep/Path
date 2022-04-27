package com.capstone.pathproject.service.file;

import com.capstone.pathproject.domain.file.UploadFile;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.file.UploadFileDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.file.UploadFileRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;


@Service
@Transactional
@RequiredArgsConstructor
public class UploadFileService {

    @Value("${file.dir}")
    private String fileDir;

    private final UploadFileRepository uploadFileRepository;
    private final MemberRepository memberRepository;

    public String getFullPath(String fileName) {
        return fileDir + fileName;
    }

    // 파일 저장 시작
    public Message<Object> storeFiles(Long memberId, String category, List<MultipartFile> multipartFiles) {
        List<UploadFileDTO> storeFilesResult = new ArrayList<>();
        // 이미지 파일들을 하나씩 꺼내서 비어있지 않다면 서버와 DB에 저장 시작
        for (MultipartFile multipartFile : multipartFiles) {
            if (!multipartFiles.isEmpty()) {
                storeFilesResult.add(storeFile(memberId, category, multipartFile));
            }
        }
        // 저장했던 결과들을 리스트로 반환
        return Message.createMessage()
                .header(StatusEnum.OK)
                .message("이미지 파일 저장 완료")
                .body(storeFilesResult).build();
    }

    // 서버와 DB에 저장 시작
    private UploadFileDTO storeFile(Long memberId, String category, MultipartFile multipartFile) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        Member member = findMember.orElse(null);
        if (multipartFile.isEmpty() || member == null) return null;
        // 사용자가 업로드한 파일명
        String uploadFileName = multipartFile.getOriginalFilename();
        // 서버에 저장할 파일명
        String storeFileName = createStoreFileName(uploadFileName);
        try {
            // 서버에 파일 저장
            multipartFile.transferTo(new File(getFullPath(storeFileName)));
        } catch (IOException e) {
            e.printStackTrace();
        }
        // DB에 값 저장
        UploadFile uploadFile = UploadFile.createBuilder()
                .uploadFileName(uploadFileName)
                .storeFileName(storeFileName)
                .category(category)
                .member(member).build();
        UploadFile uploadFileEntity = uploadFileRepository.save(uploadFile);
        return new UploadFileDTO(uploadFileEntity);
    }

    // 서버에 저장할 랜덤한 이름 생성
    private String createStoreFileName(String uploadFileName) {
        String uuid = UUID.randomUUID().toString();
        String ext = extractExt(uploadFileName);
        return uuid + "." + ext;
    }

    // 파일 확장자 확인
    private String extractExt(String uploadFileName) {
        int pos = uploadFileName.lastIndexOf(".");
        return uploadFileName.substring(pos + 1);
    }

    public Message<Object> findStoreFiles(Long memberId, String category) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        Member member = findMember.orElse(null);
        if (member == null) return null;
        List<UploadFile> uploadFiles = uploadFileRepository.findByMemberAndCategory(member, category);
        Stream<UploadFileDTO> uploadFileDTOs = uploadFiles.stream()
                .map(UploadFileDTO::new);
        return Message.createMessage()
                .header(StatusEnum.OK)
                .message("이미지 파일 조회 완료")
                .body(uploadFileDTOs).build();
    }

    // 파일 다운로드
    public ResponseEntity<Resource> downloadFile(Long fileId) throws MalformedURLException {
        Optional<UploadFile> findUploadFile = uploadFileRepository.findById(fileId);
        UploadFile uploadFile = findUploadFile.orElse(null);
        if (uploadFile == null) return null;
        String storeFileName = uploadFile.getStoreFileName();
        String uploadFileName = uploadFile.getUploadFileName();
        String encodedUploadFileName = UriUtils.encode(uploadFileName, StandardCharsets.UTF_8);
        String contentDisposition = "attachment; filename=\"" + encodedUploadFileName + "\"";
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                .body(new UrlResource("file:" + getFullPath(storeFileName)));
    }
}
