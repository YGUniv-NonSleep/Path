package com.capstone.pathproject.controller.carpool;


import com.capstone.pathproject.dto.carpool.CarPostDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.carpool.CarPostService;
import com.capstone.pathproject.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/carpost")
@RequiredArgsConstructor
public class CarPoolPostApiController {
    private final CarPostService carPostService;
    private final ResponseUtil responseUtil;

    @PostMapping("")
    public ResponseEntity<Message<?>> create(@Valid @RequestBody CarPostDTO carPostDTO){
        Message<String> message = carPostService.create(carPostDTO);
        return responseUtil.createResponseEntity(message);
    }


    @PatchMapping("/{postId}")
    public ResponseEntity<Message<?>> update(@PathVariable("postId")Long postId,@RequestBody CarPostDTO carPostDto){
        Message<String> message = carPostService.update(postId,carPostDto);
        return responseUtil.createResponseEntity(message);
    }
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<Message<?>> delete(@PathVariable("postId")Long postId){
        Message<String> message = carPostService.delete(postId);
        return responseUtil.createResponseEntity(message);
    }


    //조회
    @GetMapping("/view")
    public ResponseEntity getPostList(@PageableDefault(size = 10,sort = "id", direction = Sort.Direction.DESC) Pageable pageable){
        Message<List<CarPostDTO>> message = carPostService.getPostList(pageable);
        return responseUtil.createResponseEntity(message);

    }


    @GetMapping("/view/{postId}")
    public ResponseEntity viewParams(@PathVariable("postId") Long id){
        Message<List<CarPostDTO>> message = carPostService.viewParams(id);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }


    @GetMapping("/view/search")
    public ResponseEntity search(@RequestParam("keyword") String keyword,@RequestParam("option") String option ,@PageableDefault(size = 10,sort = "id",direction = Sort.Direction.DESC)Pageable pageable){
        Message<List<CarPostDTO>> message = carPostService.search(keyword,option,pageable);
        System.out.println(option+keyword);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }

}
