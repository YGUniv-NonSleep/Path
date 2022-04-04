package com.capstone.pathproject.controller.post;


import com.capstone.pathproject.domain.community.Post;
import com.capstone.pathproject.dto.PostDTO;
import com.capstone.pathproject.dto.member.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @PostMapping(value = "/create")
    public ResponseEntity<Message<PostDTO>> create(@Valid @RequestPart(value = "key", required = false) PostDTO postDTO, @RequestPart(value = "userfile",required = false) MultipartFile file, HttpServletRequest request) {
        String fileName;
        if(file == null){
            fileName = "";
        }else{
        fileName = file.getOriginalFilename(); //null 발생
        String filePath = request.getSession().getServletContext().getRealPath("") +"post\\"; //webapp/post

        try{
            file.transferTo(new File(filePath + fileName));
            System.out.println("업로드 완료");
        }catch (IllegalStateException | IOException e){
            System.out.println("실패");
            e.printStackTrace();
        }
        }
        Message<PostDTO> message = postService.create(postDTO,fileName);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }


    @PatchMapping("/update")
    public ResponseEntity<Message<PostDTO>> update(@RequestPart(value = "key" , required = false) PostDTO postDTO, @RequestPart(value = "userfile",required = false) MultipartFile file, HttpServletRequest request){
        String fileName;
        if(file == null){
            fileName = "";
        }else{
            fileName = file.getOriginalFilename();
            String filePath = request.getSession().getServletContext().getRealPath("") + "post\\";
            try{
                file.transferTo(new File(filePath + fileName));
                System.out.println("업데이트완료");
            }catch (IllegalStateException | IOException e){
                System.out.println("실패");
                e.printStackTrace();
            }
        }
        Message<PostDTO> message = postService.update(postDTO,fileName);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }



    @DeleteMapping("/delete")
    public ResponseEntity<Message<PostDTO>> delete(@RequestParam("postId") Long postId){
        Message<PostDTO> message = postService.delete(postId);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }


//view로 들어오면 post db내용 보여주는거 및 paging
    @GetMapping("/view")
    public ResponseEntity getPostList(@PageableDefault(size=10,sort = "id",direction = Sort.Direction.DESC)Pageable pageable){
        Message<List<PostDTO>> message = postService.getPostList(pageable);
        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    //수정해야함
    @GetMapping("/view/search")
    public ResponseEntity search(String keyword, @PageableDefault(size=10,sort = "id",direction = Sort.Direction.DESC)Pageable pageable){
        Message<List<PostDTO>> message = postService.search(keyword,pageable);
        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message,status);
    }


    @GetMapping("/view/{postId}")
    public ResponseEntity read(@PathVariable("postId") Long id, Model model){
        Message<List<PostDTO>> message = postService.updateView(id);
        HttpStatus status = message.getHttpStatus();
        //model.addAttribute("view",postService.updateView(id));

        return new ResponseEntity<>(message,status);
    }



    //////답글 Controller/////

    @PostMapping("/reply/create")
    public ResponseEntity<Message<PostDTO>> repcreate(@Valid @RequestPart(value = "key", required = false) PostDTO postDTO, @RequestPart(value = "userfile", required = false) MultipartFile file, HttpServletRequest request){
        String fileName;
        if(file == null){
            fileName = "";
        }else{
            fileName = file.getOriginalFilename();
            String filePath = request.getSession().getServletContext().getRealPath("") + "post\\";
            try{
                file.transferTo(new File(filePath + fileName));
                System.out.println("업로드 완료");
            }catch (IllegalStateException | IOException e){
                System.out.println("실패");
                e.printStackTrace();
            }
        }
        Message<PostDTO> message = postService.repcreate(postDTO,fileName);
        return new ResponseEntity<>(message,HttpStatus.OK);

    }



    @PatchMapping("/reply/update")
    public ResponseEntity<Message<PostDTO>> repupdate(@RequestPart(value = "key", required = false) PostDTO postDTO, @RequestPart(value = "userfile", required = false) MultipartFile file, HttpServletRequest request){
        String fileName;
        if(file == null){
            fileName = "";
        }else{
            fileName = file.getOriginalFilename();
            String filePath = request.getSession().getServletContext().getRealPath("") + "post\\";
            try{
                file.transferTo(new File(filePath + fileName));
                System.out.println("업로드 완료");
            }catch (IllegalStateException | IOException e){
                System.out.println("실패");
                e.printStackTrace();
            }
        }
        Message<PostDTO> message = postService.repupdate(postDTO,fileName);
        return new ResponseEntity<>(message,HttpStatus.OK);

    }


    @DeleteMapping("/reply/delete")
    public ResponseEntity<Message<PostDTO>> repdelete(@RequestParam("postId") Long postId){
        Message<PostDTO> message = postService.repdelete(postId);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }
}
