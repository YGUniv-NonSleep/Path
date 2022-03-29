package com.capstone.pathproject.controller;

import java.util.Date;
import java.util.Map;

import com.capstone.pathproject.domain.company.Option;
import com.capstone.pathproject.dto.product.OptionDTO;
import com.capstone.pathproject.repository.product.OptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestApiController {

    private final OptionRepository optionRepository;

    @GetMapping("/test")
    public String time() {
        return "현재 서버의 시간은 " + new Date() + " 입니다!";
    }

    @PostMapping("/test")
    public String postTest(@RequestBody Map<String, Object> Id) {
		System.out.println(Id.values());
		// value 있는 그대로만 보내고 싶은데 어떻게하는지 모르겠네요 ㅠ
        return Id.values()+ " 아이디 잘 받음";
    }


    @PostMapping("/optiontest")
    public String postTest(@RequestBody OptionDTO optionDTO) {
        Option option = optionRepository.save(optionDTO.toEntity());
        System.out.println("option = " + option);
        return " 아이디 잘 받음";
    }

}
