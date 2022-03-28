package com.capstone.pathproject.controller.post;


import com.capstone.pathproject.domain.community.Post;
import com.capstone.pathproject.dto.PostDTO;
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
    @PostMapping("/create")
    public ResponseEntity<Message<PostDTO>> create(@Valid @RequestPart PostDTO postDTO, @RequestPart("file") MultipartFile file, HttpServletRequest request) {
        String fileName = file.getOriginalFilename();
        String filePath = request.getSession().getServletContext().getRealPath("") +"post\\"; //webapp/post
        try{
            file.transferTo(new File(filePath + fileName));
            System.out.println("업로드 완료");
        }catch (IllegalStateException | IOException e){
            System.out.println("실패");
            e.printStackTrace();
        }
        Message<PostDTO> message = postService.create(postDTO,fileName);
        HttpStatus status = HttpStatus.OK;
        if(message.getHeader() == StatusEnum.BAD_REQUEST){
            status = HttpStatus.BAD_REQUEST;
        }else if(message.getHeader() == StatusEnum.NOT_FOUND){
            status = HttpStatus.NOT_FOUND;
        }else if(message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(message,status);
    }


    @PatchMapping("/update")
    public ResponseEntity<Message<PostDTO>> update(@RequestPart PostDTO postDTO, @RequestPart("file") MultipartFile file, HttpServletRequest request){
        String fileName = file.getOriginalFilename();
        String filePath = request.getSession().getServletContext().getRealPath("") + "post\\";
        try{
            file.transferTo(new File(filePath + fileName));
            System.out.println("업데이트완료");
        }catch (IllegalStateException | IOException e){
            System.out.println("실패");
            e.printStackTrace();
        }
        Message<PostDTO> message = postService.update(postDTO,fileName);
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;
        if(message.getHeader() == StatusEnum.BAD_REQUEST){
            status = HttpStatus.BAD_REQUEST;
        }else if(message.getHeader() == StatusEnum.NOT_FOUND){
            status = HttpStatus.NOT_FOUND;
        }else if(message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(message,headers,status);
    }



    @DeleteMapping("/delete")
    public ResponseEntity<Message<PostDTO>> delete(@RequestParam("postId") Long postId){
        Message<PostDTO> message = postService.delete(postId);
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;
        if(message.getHeader() == StatusEnum.BAD_REQUEST){
            status = HttpStatus.BAD_REQUEST;
        }else if(message.getHeader() == StatusEnum.NOT_FOUND){
            status = HttpStatus.NOT_FOUND;
        }else if(message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(message,headers,status);
    }


//view로 들어오면 post db내용 보여주는거 및 paging
    @GetMapping("/view")
    public String post(Model model, @PageableDefault(size=10,sort = "id",direction = Sort.Direction.DESC)Pageable pageable){
        model.addAttribute("postList",postService.getPostList(pageable));
        return "testFile";
    }

    @GetMapping("/view/search")
    public String search(String keyword, @PageableDefault(size=10,sort = "id",direction = Sort.Direction.DESC)Pageable pageable, Model model){
        List<Post> searchPost = postService.search(keyword,pageable);
        model.addAttribute("searchPost",searchPost);
        return "search";
    }


    @GetMapping("/view/{postId}")
    public String read(@PathVariable("postId") Long id, Model model){
        System.out.println(id);
        model.addAttribute("view",postService.updateView(id));
        return "ok";
    }



    //////답글 Controller/////

    @PostMapping("/reply/create")
    public ResponseEntity<Message<PostDTO>> repcreate(@Valid @RequestPart PostDTO postDTO, @RequestPart("file") MultipartFile file, HttpServletRequest request){
        String fileName = file.getOriginalFilename();
        String filePath = request.getSession().getServletContext().getRealPath("") + "post\\";
        System.out.println(fileName);
        System.out.println(filePath);
        try{
            file.transferTo(new File(filePath + fileName));
            System.out.println("업로드 완료");
        }catch (IllegalStateException | IOException e){
            System.out.println("실패");
            e.printStackTrace();
        }
        Message<PostDTO> message = postService.repcreate(postDTO,fileName);
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;
        if(message.getHeader() == StatusEnum.BAD_REQUEST){
            status = HttpStatus.BAD_REQUEST;
        }else if(message.getHeader() == StatusEnum.NOT_FOUND){
            status = HttpStatus.NOT_FOUND;
        }else if(message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(message,headers,status);

    }



    @PatchMapping("/reply/update")
    public ResponseEntity<Message<PostDTO>> repupdate(@RequestPart PostDTO postDTO, @RequestPart("file") MultipartFile file, HttpServletRequest request){
        String fileName = file.getOriginalFilename();
        String filePath = request.getSession().getServletContext().getRealPath("") + "post\\";
        try{
            file.transferTo(new File(filePath + fileName));
            System.out.println("업데이트완료");
        }catch (IllegalStateException | IOException e){
            System.out.println("실패");
            e.printStackTrace();
        }
        Message<PostDTO> message = postService.repupdate(postDTO,fileName);
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;
        if(message.getHeader() == StatusEnum.BAD_REQUEST){
            status = HttpStatus.BAD_REQUEST;
        }else if(message.getHeader() == StatusEnum.NOT_FOUND){
            status = HttpStatus.NOT_FOUND;
        }else if(message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(message,headers,status);

    }


    @DeleteMapping("/reply/delete")
    public ResponseEntity<Message<PostDTO>> repdelete(@RequestParam("postId") Long postId){
        Message<PostDTO> message = postService.repdelete(postId);
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;
        if(message.getHeader() == StatusEnum.BAD_REQUEST){
            status = HttpStatus.BAD_REQUEST;
        }else if(message.getHeader() == StatusEnum.NOT_FOUND){
            status = HttpStatus.NOT_FOUND;
        }else if(message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR){
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(message,headers,status);
    }
}
