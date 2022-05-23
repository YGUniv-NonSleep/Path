package com.capstone.pathproject.controller.post;


import com.capstone.pathproject.domain.community.PostType;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.community.*;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.community.PostService;
import com.capstone.pathproject.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostApiController {
    private final PostService postService;
    private final ResponseUtil responseUtil;


    ///Post Controller///
    @PostMapping("")
    public ResponseEntity<Message<?>> create(@Valid @RequestPart(value = "key", required = false) CreatePostDto postDto,
                                                  @RequestPart(value = "userfile", required = false) MultipartFile file,
                                                  HttpServletRequest request)
    {
        String fileName;
        if (file == null) {
            fileName = "";
        } else {
            fileName = file.getOriginalFilename();
            String filePath = request.getSession().getServletContext().getRealPath("") + "post\\";

            try {
                file.transferTo(new File(filePath + fileName));
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
        }
        Message<String> message = postService.create(postDto, fileName);
        return responseUtil.createResponseEntity(message);
    }


    @PatchMapping("/{postId}")
    public ResponseEntity<Message<?>> update(@PathVariable Long postId,
                                             @Valid @RequestPart(value = "key", required = false) UpdatePostDto postDto,
                                             @RequestPart(value = "userfile", required = false) MultipartFile file,
                                             HttpServletRequest request) {

        String fileName;
        if (file == null) {
            fileName = "";
        } else {
            fileName = file.getOriginalFilename();
            String filePath = request.getSession().getServletContext().getRealPath("") + "post\\";
            try {
                file.transferTo(new File(filePath + fileName));
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
        }

        Message<String> message = postService.update(postId, postDto, fileName);
        return responseUtil.createResponseEntity(message);
    }


    @DeleteMapping("/{postId}")
    public ResponseEntity<Message<?>> delete(@PathVariable("postId") Long postId) {
        Message<String> message = postService.delete(postId);
        return responseUtil.createResponseEntity(message);
    }


    @GetMapping("/view")
    public ResponseEntity<Message<?>> getPostList(@RequestParam("type") PostType type, @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Message<List<PostDto>> message = postService.getPostList(type, pageable);
        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("/reply/view")
    public ResponseEntity<Message<?>> getReplyList(@RequestParam("id") Long postId) {
        Message<PostDto> message = postService.getReplyList(postId);
        return responseUtil.createResponseEntity(message);
    }


    @GetMapping("/view/search")
    public ResponseEntity<Message<?>> search(String keyword, @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Message<List<PostDto>> message = postService.search(keyword, pageable);
        return responseUtil.createResponseEntity(message);
    }


    @GetMapping("/view/{postId}")
    public ResponseEntity<Message<?>> viewParams(@PathVariable("postId") Long id) {
        Message<List<PostDto>> message = postService.viewParams(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


    @PostMapping("/reply")
    public ResponseEntity<Message<?>> repcreate(@Valid @RequestPart(value = "key", required = false) ReplyCreatePostDto postDto,
                                                      @RequestPart(value = "userfile", required = false) MultipartFile file,
                                                      HttpServletRequest request) {
        String fileName;
        if (file == null) {
            fileName = "";
        } else {
            fileName = file.getOriginalFilename();
            String filePath = request.getSession().getServletContext().getRealPath("") + "post\\";
            try {
                file.transferTo(new File(filePath + fileName));
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
        }
        Message<String> message = postService.repcreate(postDto, fileName);
        return responseUtil.createResponseEntity(message);

    }


    @PatchMapping("/reply/{postId}")
    public ResponseEntity<Message<?>> repupdate(@PathVariable Long postId,
                                                @Valid@RequestPart(value = "key", required = false) ReplyUpdatePostDto postDto,
                                                @RequestPart(value = "userfile", required = false) MultipartFile file,
                                                      HttpServletRequest request) {
        String fileName;
        if (file == null) {
            fileName = "";
        } else {
            fileName = file.getOriginalFilename();
            String filePath = request.getSession().getServletContext().getRealPath("") + "post\\";
            try {
                file.transferTo(new File(filePath + fileName));
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
        }
        Message<String> message = postService.repupdate(postId,postDto,fileName);
        return responseUtil.createResponseEntity(message);

    }


    @DeleteMapping("/reply/{postId}")
    public ResponseEntity<Message<?>> repdelete(@PathVariable("postId") Long postId) {
        Message<String> message = postService.repdelete(postId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
