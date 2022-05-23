package com.capstone.pathproject.controller.member;

import com.capstone.pathproject.dto.member.CardDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.service.member.CardService;
import com.capstone.pathproject.util.ResponseUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    // 카드 수정

    //토스 카드 등록 성공 url
    @GetMapping("/card/success")
    public ResponseEntity<Message<?>> successBillingAuth(@RequestParam String customerKey,
                                                         @RequestParam String authKey
    ) throws JsonProcessingException {
        Message<Object> message = cardService.addCard(customerKey, authKey);
        return responseUtil.createResponseEntity(message);
    }

    //토스 카드 등록 실패 url
    @GetMapping("/card/fail")
    public ResponseEntity<Message<?>> failBillingAuth(@RequestParam String code,
                                                      @RequestParam String message,
                                                      @RequestParam String orderId) {
        Map<String, String> body = new HashMap<>();
        body.put("code", code);
        body.put("orderId", orderId);
        Message<Object> responseMessage = Message.builder()
                .header(StatusEnum.BAD_REQUEST)
                .message(message)
                .body(body).build();
        return responseUtil.createResponseEntity(responseMessage);
    }
}
