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


    @PostMapping("")
    public ResponseEntity<Message<?>> create(@Valid @RequestBody CreatePostDto postDto){
        Message<String> message = postService.create(postDto);
        return responseUtil.createResponseEntity(message);
    }


    @PatchMapping("/{postId}")
    public ResponseEntity<Message<?>> update(@PathVariable("postId") Long postId,@Valid @RequestBody UpdatePostDto postDto){
        Message<String> message = postService.update(postId,postDto);
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

    @GetMapping("/reply/{postId}")
    public ResponseEntity<Message<?>> getReplyList(@PathVariable("postId") Long postId) {
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
    public ResponseEntity<Message<?>> repcreate(@Valid @RequestBody ReplyCreatePostDto postDto){
        Message<String> message = postService.repcreate(postDto);
        return responseUtil.createResponseEntity(message);
    }

    @PatchMapping("/reply/{postId}")
    public ResponseEntity<Message<?>> repupdate(@PathVariable("postId")Long postId,@RequestBody ReplyUpdatePostDto postDto){
        Message<String> message = postService.repupdate(postId,postDto);
        return responseUtil.createResponseEntity(message);
    }

    @DeleteMapping("/reply/{postId}")
    public ResponseEntity<Message<?>> repdelete(@PathVariable("postId") Long postId) {
        Message<String> message = postService.repdelete(postId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
