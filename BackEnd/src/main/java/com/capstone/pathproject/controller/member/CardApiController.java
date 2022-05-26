package com.capstone.pathproject.controller.member;

import com.capstone.pathproject.dto.member.CardDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.member.CardService;
import com.capstone.pathproject.util.ResponseUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CardApiController {

    private final CardService cardService;
    private final ResponseUtil responseUtil;

    // 카드 조회
    @GetMapping("/cards")
    public ResponseEntity<Message<?>> getMemberCards(@RequestParam Long memberId) {
        Message<List<CardDto>> message = cardService.getMemberCards(memberId);
        return responseUtil.createResponseEntity(message);
    }

    // 카드 삭제
    @DeleteMapping("/cards/{cardId}")
    public ResponseEntity<Message<?>> deleteCard(@PathVariable Long cardId) {
        Message<String> message = cardService.deleteCard(cardId);
        return responseUtil.createResponseEntity(message);
    }

    // 카드 수정

    //토스 카드 등록 성공 url
    @GetMapping("/card/success")
    public ResponseEntity<Message<Object>> successBillingAuth(@RequestParam String customerKey,
                                                              @RequestParam String authKey
    ) throws JsonProcessingException, URISyntaxException {
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("toss card success : {}", principalDetails.getMember().getLoginId());
        Message<Object> message = cardService.addCard(customerKey, authKey);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(new URI("https://localhost:3000/"));
        return new ResponseEntity<>(message, headers, HttpStatus.MOVED_PERMANENTLY);

    }

    //토스 카드 등록 실패 url
    @GetMapping("/card/fail")
    public ResponseEntity<Message<Object>> failBillingAuth(@RequestParam String code,
                                                           @RequestParam String message) throws URISyntaxException {
        log.error("toss card fail code : {}", code);
        log.error("toss card fail message : {}", message);
        Map<String, String> body = new HashMap<>();
        body.put("code", code);
        body.put("message", message);
        Message<Object> responseMessage = Message.builder()
                .header(StatusEnum.BAD_REQUEST)
                .message(message)
                .body(body).build();
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(new URI("https://localhost:3000/"));
        return new ResponseEntity<>(responseMessage, headers, HttpStatus.MOVED_PERMANENTLY);
    }
}
