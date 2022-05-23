package com.capstone.pathproject.controller;

import com.capstone.pathproject.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.MalformedURLException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UtilApiController {

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

        System.out.println(paymentKey);
        System.out.println(orderId);
        System.out.println(amount);

        //Base64.Encoder encoder = Base64.getEncoder();

        //        HttpURLConnection httpURLConnection = HttpURLConnection.
        WebClient tossWebClient = WebClient.builder()
                .baseUrl("https://api.tosspayments.com/")
                .defaultHeader("Authorization", "Basic dGVzdF9za19QMjR4TGVhNXpWQUU2Rzl2TGoyVlFBTVlOd1c2Og==")
                .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .build();

        Map<String, String> data = new HashMap<String, String>();
        data.put("amount", amount);
        data.put("orderId", orderId);

        Mono<String> mono = tossWebClient.post()
                .uri(uriBuilder -> uriBuilder.path("v1/payments/" + paymentKey)
                        .build())
                .bodyValue(data)
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(String.class));
        return mono.block();
    }


}
