package com.capstone.pathproject.controller.file;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.file.FileForm;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.file.UploadFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UploadFileApiController {

    private final UploadFileService uploadFileService;

    // 이미지 저장
    @PostMapping("/images")
    public ResponseEntity<Message<Object>> saveFile(@ModelAttribute FileForm form,
                                                    @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Member member = principalDetails.getMember();
        String category = form.getCategory();
        List<MultipartFile> imageFiles = form.getImageFiles();
        Message<Object> message = uploadFileService.storeFiles(member.getId(), category, imageFiles);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 이미지를 카테고리와 회원pk로 찾는다.
    @GetMapping("/images/{category}/{memberId}")
    public ResponseEntity<Message<Object>> items(@PathVariable String category,
                                                 @PathVariable Long memberId) {
        Message<Object> message = uploadFileService.findStoreFiles(memberId, category);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // <img> 태그로 이미지를 조회할 때 사용함. UrlResource로 이미지 파일 읽어서 @ResponseBody로 이미지 바이너리 반환
    // filename 에는 서버에 저장한 파일이름을 넣는다.
    @ResponseBody
    @GetMapping("/images/{filename}")
    public Resource downloadImage(@PathVariable String filename) throws MalformedURLException {
        return new UrlResource("file:" + uploadFileService.getFullPath(filename));
    }

    // 파일 다운로드
    @GetMapping("/attach/{fileId}")
    public ResponseEntity<Resource> downloadAttach(@PathVariable Long fileId) throws MalformedURLException {
        return uploadFileService.downloadFile(fileId);
    }
}
