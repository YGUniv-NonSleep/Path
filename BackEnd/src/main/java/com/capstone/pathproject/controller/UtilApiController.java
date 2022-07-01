package com.capstone.pathproject.controller;

import com.capstone.pathproject.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Base64.Encoder;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UtilApiController {

    @Value("${api.toss.secret-key}")
    private String apiKey;

    private final FileUtil fileUtil;

    @ResponseBody
    @GetMapping("/image/{imageName}")
    public Resource downloadImage(@PathVariable String imageName) throws MalformedURLException {
        return new UrlResource("file:" + fileUtil.getFullPath(imageName));
    }

    @PostMapping("/image")
    public ResponseEntity<String> saveImage(@RequestParam("multipartFile") MultipartFile multipartFile) {
        String fileName = fileUtil.storeFile(multipartFile);
        return new ResponseEntity<>(fileName, HttpStatus.OK);
    }

    @GetMapping("/pay")
    public String tossPaymentsTest(@RequestParam("paymentKey") String paymentKey, @RequestParam("orderId") String orderId, @RequestParam("amount") String amount) {

        String headerKey = "Basic "+ apiKey + ":";
        Encoder encoder = Base64.getEncoder();

        byte[] apiByte = headerKey.getBytes(StandardCharsets.UTF_8);
        byte[] encodedByte = encoder.encode(apiByte);
        String encodedString = encoder.encodeToString(encodedByte);

        WebClient tossWebClient = WebClient.builder()
                .baseUrl("https://api.tosspayments.com/")
                .defaultHeader("Authorization", encodedString)
                .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .build();

        Map<String, String> data = new HashMap<String, String>();
        data.put("paymentKey", paymentKey);
        data.put("amount", amount); // 이거 number로 넘겨야 됨
        data.put("orderId", orderId);

        Mono<String> mono = tossWebClient.post()
                .uri(uriBuilder -> uriBuilder.path("v1/payments/confirm")
                        .build())
                .bodyValue(data)
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(String.class));

        System.out.println("mono: " + mono.block());
        // 결젯 승인에서 자꾸 막히네 아래 링크대로 만들어두긴했는데
        // https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8
        // {code: 'UNAUTHORIZED_KEY', message: '인증되지 않은 시크릿 키 혹은 클라이언트 키 입니다.'} 해결 좀 해줘라
        return mono.block();
    }
}
