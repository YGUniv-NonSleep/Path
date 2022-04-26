package com.capstone.pathproject.controller.member;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.member.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.security.auth.jwt.JwtProperties;
import com.capstone.pathproject.util.CookieUtil;
import com.capstone.pathproject.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberApiController {

    private final MemberService memberService;
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
        Cookie refreshTokenCookie = new Cookie(JwtProperties.REFRESH_HEADER_STRING, null);
        refreshTokenCookie.setMaxAge(0);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);
        cookieUtil.addSameSite(response, "None");
        Message<Object> message = Message.createMessage()
                .header(StatusEnum.OK)
                .message("로그아웃 성공")
                .build();
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/member")
    public ResponseEntity<Message<String>> signup(@Valid @RequestBody MemberDTO memberDTO) {
        System.out.println("memberDTO = " + memberDTO);
        Message<String> message = memberService.signup(memberDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<Message<MemberDTO>> getMember(@PathVariable("memberId") Long memberId) {
        Message<MemberDTO> message = memberService.getMemberInfo(memberId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PatchMapping("/member/{memberId}")
    public ResponseEntity<Message<MemberDTO>> updateMember(@PathVariable("memberId") Long id, @RequestBody MemberDTO memberDTO) {
        Message<MemberDTO> message = memberService.updateMember(id, memberDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/member/{memberId}")
    public ResponseEntity<Message<MemberDTO>> deleteMember(@PathVariable("memberId") Long id) {
        Message<MemberDTO> message = memberService.deleteMember(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/forgot/loginid")
    public ResponseEntity<Message<Object>> forgotLoginId(@RequestBody MemberDTO memberDTO) {
        Message<Object> message = memberService.forgotLoginId(memberDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/forgot/password")
    public ResponseEntity<Message<Object>> forgotPassword(@RequestBody MemberDTO memberDTO) {
        Message<Object> message = memberService.forgotPassword(memberDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PatchMapping("/forgot/password/{memberId}")
    public ResponseEntity<Message<Object>> resetPassword(@PathVariable("memberId") Long id, @RequestBody MemberDTO memberDTO) {
        Message<Object> message = memberService.resetPassword(id, memberDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
