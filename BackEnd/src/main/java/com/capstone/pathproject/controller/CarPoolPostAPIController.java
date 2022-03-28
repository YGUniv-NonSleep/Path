package com.capstone.pathproject.controller;

import com.capstone.pathproject.dto.CarPoolPostDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.service.CarPoolPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carpoolpost")
@RequiredArgsConstructor
public class CarPoolPostAPIController {

    private final CarPoolPostService carPoolPostService;

    @PostMapping("/create")
    public ResponseEntity<Message<CarPoolPostDTO>> create(@RequestBody CarPoolPostDTO carPoolPostDTO){
        Message<CarPoolPostDTO> message = carPoolPostService.create(carPoolPostDTO);
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
    public ResponseEntity<Message<CarPoolPostDTO>> delete(@RequestParam("postId") Long postId){
        Message<CarPoolPostDTO> message = carPoolPostService.delete(postId);
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

    @PatchMapping("/update")
    public ResponseEntity<Message<CarPoolPostDTO>> update(@RequestBody CarPoolPostDTO carPoolPostDTO){
        Message<CarPoolPostDTO> message = carPoolPostService.update(carPoolPostDTO);
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
