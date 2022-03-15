package com.capstone.pathproject.controller;

import com.capstone.pathproject.dto.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberApiController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<Message<MemberDTO>> signup(@RequestBody MemberDTO memberDTO) {
        Message<MemberDTO> message = memberService.signup(memberDTO);
        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;
        if (message.getHeader() == StatusEnum.BAD_REQUEST) status = HttpStatus.BAD_REQUEST;
        else if (message.getHeader() == StatusEnum.NOT_FOUND) status = HttpStatus.NOT_FOUND;
        else if (message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR) status = HttpStatus.INTERNAL_SERVER_ERROR;

        return new ResponseEntity<>(message, headers, status);
    }
}
