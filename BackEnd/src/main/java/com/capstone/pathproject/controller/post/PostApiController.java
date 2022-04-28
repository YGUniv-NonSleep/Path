package com.capstone.pathproject.controller.post;


import com.capstone.pathproject.domain.community.Post;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.community.PostDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.community.PostService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
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



    ///Post Controller///
    @PostMapping("/create")
    public ResponseEntity<Message<PostDTO>> create(@Valid @RequestPart(value = "key", required = false) PostDTO postDTO,
                                                   @RequestPart(value = "userfile",required = false) MultipartFile file,
                                                   HttpServletRequest request,
                                                   @AuthenticationPrincipal PrincipalDetails principalDetails) {
        String fileName;
        if(file == null){
            fileName = "";
        }else{
        fileName = file.getOriginalFilename();
        String filePath = request.getSession().getServletContext().getRealPath("") +"post\\";

        try{
            file.transferTo(new File(filePath + fileName));
        }catch (IllegalStateException | IOException e){
            e.printStackTrace();
        }
        }
        Message<PostDTO> message = postService.create(postDTO,fileName,principalDetails);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }


    @PatchMapping("/update")
    public ResponseEntity<Message<PostDTO>> update(@RequestPart(value = "key" , required = false) PostDTO postDTO,
                                                   @RequestPart(value = "userfile",required = false) MultipartFile file,
                                                   HttpServletRequest request,
                                                   @AuthenticationPrincipal PrincipalDetails principalDetails){

        String fileName;
        if(file == null){
            fileName = "";
        }else{
            fileName = file.getOriginalFilename();
            String filePath = request.getSession().getServletContext().getRealPath("") + "post\\";
            try{
                file.transferTo(new File(filePath + fileName));
            }catch (IllegalStateException | IOException e){
                e.printStackTrace();
            }
        }

        Message<PostDTO> message = postService.update(postDTO,fileName,principalDetails);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }



    @DeleteMapping("/delete")
    public ResponseEntity<Message<PostDTO>> delete(@RequestParam("postId") Long postId,@AuthenticationPrincipal PrincipalDetails principalDetails){
        Message<PostDTO> message = postService.delete(postId,principalDetails);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }


    @GetMapping("/view")
    public ResponseEntity getPostList(@PageableDefault(size=10,sort = "id",direction = Sort.Direction.DESC)Pageable pageable){
        Message<List<PostDTO>> message = postService.getPostList(pageable);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }

    //수정해야함
    @GetMapping("/view/search")
    public ResponseEntity search(String keyword, @PageableDefault(size=10,sort = "id",direction = Sort.Direction.DESC)Pageable pageable){
        Message<List<PostDTO>> message = postService.search(keyword,pageable);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }


    @GetMapping("/view/{postId}")
    public ResponseEntity viewParams(@PathVariable("postId") Long id){
        Message<List<PostDTO>> message = postService.viewParams(id);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }





    @PostMapping("/reply/create")
    public ResponseEntity<Message<PostDTO>> repcreate(@Valid @RequestPart(value = "key", required = false) PostDTO postDTO,
                                                      @RequestPart(value = "userfile", required = false) MultipartFile file,
                                                      HttpServletRequest request,
                                                      @AuthenticationPrincipal PrincipalDetails principalDetails){
        String fileName;
        if(file == null){
            fileName = "";
        }else{
            fileName = file.getOriginalFilename();
            String filePath = request.getSession().getServletContext().getRealPath("") + "post\\";
            try{
                file.transferTo(new File(filePath + fileName));
            }catch (IllegalStateException | IOException e){
                e.printStackTrace();
            }
        }
        Message<PostDTO> message = postService.repcreate(postDTO,fileName,principalDetails);
        return new ResponseEntity<>(message,HttpStatus.OK);

    }



    @PatchMapping("/reply/update")
    public ResponseEntity<Message<PostDTO>> repupdate(@RequestPart(value = "key", required = false) PostDTO postDTO,
                                                      @RequestPart(value = "userfile", required = false) MultipartFile file,
                                                      HttpServletRequest request,
                                                      @AuthenticationPrincipal PrincipalDetails principalDetails){
        String fileName;
        if(file == null){
            fileName = "";
        }else{
            fileName = file.getOriginalFilename();
            String filePath = request.getSession().getServletContext().getRealPath("") + "post\\";
            try{
                file.transferTo(new File(filePath + fileName));
            }catch (IllegalStateException | IOException e){
                e.printStackTrace();
            }
        }
        Message<PostDTO> message = postService.repupdate(postDTO,fileName,principalDetails);
        return new ResponseEntity<>(message,HttpStatus.OK);

    }


    @DeleteMapping("/reply/delete")
    public ResponseEntity<Message<PostDTO>> repdelete(@RequestParam("postId") Long postId, @AuthenticationPrincipal PrincipalDetails principalDetails){
        Message<PostDTO> message = postService.repdelete(postId,principalDetails);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }
}
