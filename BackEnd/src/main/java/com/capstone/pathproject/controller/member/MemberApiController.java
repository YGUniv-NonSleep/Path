package com.capstone.pathproject.controller.member;

import com.capstone.pathproject.dto.member.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberApiController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity signup(@Valid @RequestBody MemberDTO memberDTO) {
        Message<MemberDTO> message = memberService.signup(memberDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/member/reissue")
    public ResponseEntity<Message<Object>> reissue(@AuthenticationPrincipal PrincipalDetails principalDetails, HttpServletResponse response) {
        String username = principalDetails.getUsername();
        Message<Object> message = Message.createMessage()
                .header(StatusEnum.OK)
                .message("회원이 존재함")
                .body(username).build();
        return new ResponseEntity<Message<Object>>(message, HttpStatus.OK);
    }

    @GetMapping("/user")
    public String user(Authentication authentication, HttpServletResponse response) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("principalDetails = " + principalDetails);
        Collection<String> headers = response.getHeaders(HttpHeaders.SET_COOKIE);
        System.out.println("headers = " + headers.isEmpty());
        System.out.println("headers = " + headers);
        for (String header : headers) {
            System.out.println(header);
        }
        return "user";
    }

    @GetMapping("/business")
    public String manager() {
        return "manager";
    }

    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }

}
