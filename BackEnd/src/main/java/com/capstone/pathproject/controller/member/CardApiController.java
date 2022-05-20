package com.capstone.pathproject.controller.member;

import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.dto.rest.toss.billingKey.BillingKeyDto;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.service.member.CardService;
import com.capstone.pathproject.util.ResponseUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.netty.handler.logging.LogLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;
import reactor.netty.transport.logging.AdvancedByteBufFormat;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CardApiController {

    private final CardService cardService;
    private final ResponseUtil responseUtil;

    // 카드 등록
    // 카드 조회
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
