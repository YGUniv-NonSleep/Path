package com.capstone.pathproject.controller.member;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.member.*;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.security.auth.jwt.JwtProperties;
import com.capstone.pathproject.util.CookieUtil;
import com.capstone.pathproject.service.member.MemberService;
import com.capstone.pathproject.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberApiController {

    private final MemberService memberService;
    private final ResponseUtil responseUtil;
    private final CookieUtil cookieUtil;


    @PostMapping("/token")
    public ResponseEntity<Message<Object>> tokenReissue(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        Member member = principalDetails.getMember();
        System.out.println("member = " + member.toString());
        String username = member.getName();
        System.out.println("username = " + username);
        Message<Object> message = Message.createMessage()
                .header(StatusEnum.OK)
                .message("회원이 존재함")
                .body(username).build();
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/token")
    public ResponseEntity<Message<Object>> logout(HttpServletResponse response) {
        cookieUtil.deleteCookie(response, JwtProperties.REFRESH_HEADER_STRING);
        Message<Object> message = Message.createMessage()
                .header(StatusEnum.OK)
                .message("로그아웃 성공")
                .build();
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/member")
    public ResponseEntity<Message<?>> signup(@Valid @RequestBody SignupFormDto signupFormDto) {
        Message<String> message = memberService.signup(signupFormDto);
        return responseUtil.createResponseEntity(message);
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<Message<?>> getMember(@PathVariable("memberId") Long memberId) {
        Message<MemberDto> message = memberService.getMemberInfo(memberId);
        return responseUtil.createResponseEntity(message);
    }

    @PatchMapping("/member/{memberId}")
    public ResponseEntity<Message<?>> updateMember(@PathVariable("memberId") Long id, @RequestBody UpdateMemberDto updateMemberDto) {
        Message<String> message = memberService.updateMember(id, updateMemberDto);
        return responseUtil.createResponseEntity(message);
    }

    @DeleteMapping("/member/{memberId}")
    public ResponseEntity<Message<?>> deleteMember(@PathVariable("memberId") Long id) {
        Message<MemberDto> message = memberService.deleteMember(id);
        return responseUtil.createResponseEntity(message);
    }

    @PostMapping("/forgot/loginid")
    public ResponseEntity<Message<?>> forgotLoginId(@RequestBody @Valid ForgotLoginIdDto forgotLoginIdDto) {
        Message<Object> message = memberService.forgotLoginId(forgotLoginIdDto);
        return responseUtil.createResponseEntity(message);
    }

    @PostMapping("/forgot/password")
    public ResponseEntity<Message<?>> forgotPassword(@RequestBody @Valid ForgotPwDto forgotPwDto) {
        Message<Object> message = memberService.forgotPassword(forgotPwDto);
        return responseUtil.createResponseEntity(message);
    }

    @PatchMapping("/forgot/password/{memberId}")
    public ResponseEntity<Message<?>> resetPassword(@PathVariable("memberId") Long id, @RequestBody Map<String, String> body) {
        Message<Object> message = memberService.resetPassword(id, body);
        return responseUtil.createResponseEntity(message);
    }
}
