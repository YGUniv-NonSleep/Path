package com.capstone.pathproject.controller.carpool;


import com.capstone.pathproject.dto.carpool.CarsDto;
import com.capstone.pathproject.dto.member.MemberDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.carpool.CarsService;
import com.capstone.pathproject.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarsAPIController {
    private final CarsService carsService;
    private final ResponseUtil responseUtil;

    @PostMapping("")
    public ResponseEntity<Message<?>> create(@RequestBody CarsDto carsDto) {
        Message<?> message = carsService.create(carsDto);
        return responseUtil.createResponseEntity(message);
    }


//    @PatchMapping("/update")
//    public ResponseEntity<Message<Object>> update(@RequestPart(value = "key", required = false) CarsDto carsDTO,
//                                                  @RequestPart(value = "userfile", required = false) MultipartFile file,
//                                                  HttpServletRequest request) {
//        String fileName;
//        if (file == null) {
//            fileName = "";
//        } else {
//            fileName = file.getOriginalFilename();
//            String filePath = request.getSession().getServletContext().getRealPath("") + "cars\\";
//            try {
//                file.transferTo(new File(filePath + fileName));
//            } catch (IllegalStateException | IOException e) {
//                e.printStackTrace();
//            }
//        }
//        Message<Object> message = carsService.update(carsDTO, fileName);
//        return new ResponseEntity<>(message, HttpStatus.OK);
//    }

    @PatchMapping("/update")
    public ResponseEntity<Message<?>> update(@RequestBody CarsDto carsDto){
        Message<String> message = carsService.update(carsDto);
        return responseUtil.createResponseEntity(message);
    }

    @DeleteMapping("/{carsId}")
    public ResponseEntity<Message<?>> delete(@PathVariable("carsId") Long carsId) {
        Message<?> message = carsService.delete(carsId);
        return responseUtil.createResponseEntity(message);
    }


    //view
    @GetMapping("/view")
    public ResponseEntity<Message<?>> findview(@RequestParam("memberId") Long Id) {
        Message<?> message = carsService.findView(Id);
        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("/view/search")
    public ResponseEntity search(String keyword, @PageableDefault(size = 5, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Message<List<CarsDto>> message = carsService.search(keyword, pageable);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
