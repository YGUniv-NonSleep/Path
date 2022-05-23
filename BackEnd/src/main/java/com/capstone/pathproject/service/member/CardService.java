package com.capstone.pathproject.service.member;

import com.capstone.pathproject.domain.member.Card;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.member.CardDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.dto.rest.toss.billingKey.BillingKeyDto;
import com.capstone.pathproject.repository.member.CardRepository;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class CardService {

    private final WebClient tossWebClient;
    private final CardRepository cardRepository;

    public Message<Object> addCard(String customerKey, String authKey) throws JsonProcessingException {
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        System.out.println("loginId = " + member.getLoginId());
        if (!customerKey.equals(member.getLoginId())) {
            return Message.builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("customerKey가 동일하지 않습니다.")
                    .body("").build();
        }

        String jsonBillingKey = postTossBillingKey(customerKey, authKey);
        ObjectMapper mapper = getObjectMapper();
        BillingKeyDto billingKeyDto = mapper.readValue(jsonBillingKey, BillingKeyDto.class);
        Card card = Card.builder()
                .member(member)
                .number(billingKeyDto.getCard().getNumber())
                .cardCompany(billingKeyDto.getCard().getCompany())
                .type(billingKeyDto.getCard().getCardType())
                .billingKey(billingKeyDto.getBillingKey())
                .build();
        cardRepository.save(card);
        return Message.builder()
                .header(StatusEnum.OK)
                .message("카드 등록 완료")
                .body("").build();
    }

    public String postTossBillingKey(String customerKey, String authKey) {
        Map<String, String> body = new HashMap<>();
        body.put("customerKey", customerKey);

        return tossWebClient.post()
                .uri(uriBuilder -> uriBuilder.path("/billing/authorizations/" + authKey)
                        .build())
                .bodyValue(body)
                .exchangeToMono(clientResponse -> clientResponse.bodyToMono(String.class))
                .block();
    }

    public ObjectMapper getObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return mapper;
    }

    public Message<List<CardDto>> getAllMemberCards(Long memberId) {
        List<CardDto> cardDtos = cardRepository.findAllMemberCardDtos(memberId);
        return Message.<List<CardDto>>builder()
                .header(StatusEnum.OK)
                .message("카드가 전부 조회되었습니다.")
                .body(cardDtos).build();
    }
}
