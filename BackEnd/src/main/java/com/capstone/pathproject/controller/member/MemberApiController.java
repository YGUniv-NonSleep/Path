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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
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
        return new ResponseEntity<Message<Object>>(message, HttpStatus.OK);
    }

    @DeleteMapping("/token")
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
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
        return new ResponseEntity(message, HttpStatus.OK);
    }

    // 회원 등록
    @PostMapping("/member")
    public ResponseEntity signup(@Valid @RequestBody MemberDTO memberDTO) {
        Message<String> message = memberService.signup(memberDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 회원 조회
    @GetMapping("/member/{memberId}")
    public ResponseEntity getMember(@PathVariable("memberId") Long memberId) {
        Message<MemberDTO> message = memberService.getMemberInfo(memberId);
        return new ResponseEntity(message, HttpStatus.OK);
    }

    // 회원 수정
    @PatchMapping("/member/{memberId}")
    public ResponseEntity updateMember(@PathVariable("memberId") Long id, @RequestBody MemberDTO memberDTO) {
        Message<MemberDTO> message = memberService.updateMember(id, memberDTO);
        return new ResponseEntity(message, HttpStatus.OK);
    }

    // 회원 탈퇴
    @DeleteMapping("/member/{memberId}")
    public ResponseEntity deleteMember(@PathVariable("memberId") Long id) {
        Message<MemberDTO> message = memberService.deleteMember(id);
        return new ResponseEntity(message, HttpStatus.OK);
    }

    // 회원 아이디 찾기
    @PostMapping("/forgot/loginid")
    public ResponseEntity forgotLoginId(@RequestBody MemberDTO memberDTO) {
        Message<String> message = memberService.forgotLoginId(memberDTO);
        return new ResponseEntity(message, HttpStatus.OK);
    }

    // 회원 비밀번호 찾기
    @PostMapping("/forget/password")
    public ResponseEntity forgotPassword(@RequestBody MemberDTO memberDTO) {
        memberService.forgotPassword(memberDTO);
    }



    // === 테스트 요청 === //
    @GetMapping("/member")
    public String user(Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        Member member = principalDetails.getMember();
        System.out.println("member = " + member.toString());
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
