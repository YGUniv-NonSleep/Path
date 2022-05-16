package com.capstone.pathproject.controller.carpool;


import com.capstone.pathproject.dto.carpool.CarPostDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.carpool.CarPostService;
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

    //CRUD
    @PostMapping("/create")
    public ResponseEntity<Message<CarPostDTO>> create(@Valid @RequestPart(value="key",required = false)CarPostDTO carPostDTO,
                                                      @RequestPart(value="userfile",required = false) MultipartFile file,
                                                      HttpServletRequest request,
                                                      @AuthenticationPrincipal PrincipalDetails principalDetails){
        String fileName;
        if(file == null){
            fileName = "";
        }else{
            fileName = file.getOriginalFilename();
            String filePath = request.getSession().getServletContext().getRealPath("") + "carpost\\";

            try {
                file.transferTo(new File(filePath + fileName));
                System.out.println("업로드 완료");
            }catch (IllegalStateException | IOException e){
                System.out.println("업로드 실패");
                e.printStackTrace();
            }
        }
        Message<CarPostDTO> message = carPostService.create(carPostDTO, fileName,principalDetails);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PatchMapping("/update")
    public ResponseEntity<Message<CarPostDTO>> update(@RequestPart(value = "key",required = false)CarPostDTO carPostDTO,
                                                      @RequestPart(value = "userfile",required = false)MultipartFile file,
                                                      HttpServletRequest request,
                                                      @AuthenticationPrincipal PrincipalDetails principalDetails){
        String fileName;
        if(file == null){
            fileName = "";
        }else{
            fileName = file.getOriginalFilename();
            String filePath = request.getSession().getServletContext().getRealPath("") + "carpost\\";

            try {
                file.transferTo(new File(filePath + fileName));
            }catch(IllegalStateException | IOException e){
                e.printStackTrace();
            }
        }
        Message<CarPostDTO> message = carPostService.update(carPostDTO,fileName,principalDetails);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Message<CarPostDTO>> delete(@RequestParam("postId")Long postId){
        Message<CarPostDTO> message = carPostService.delete(postId);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }


    //조회
    @GetMapping("/view")
    public ResponseEntity getPostList(@PageableDefault(size = 10,sort = "id", direction = Sort.Direction.DESC) Pageable pageable){
        Message<List<CarPostDTO>> message = carPostService.getPostList(pageable);
        return new ResponseEntity<>(message,HttpStatus.OK);

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
