package com.capstone.pathproject.controller.carpool;


import com.capstone.pathproject.dto.CarPoolPostDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.CarPoolPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequiredArgsConstructor
public class CarPoolPostWebController {
    @Autowired
    CarPoolPostService carPoolPostService;

    @GetMapping("/carpost")
    public String carpost(){
        return "carpost";
    }

    @GetMapping("/carpost/{postId}")
    public String carpostVariable(@PathVariable("postId") Long postId, Model model){
        Message<CarPoolPostDTO> result =  carPoolPostService.variableGet(postId);
        model.addAttribute("result",result);
        return "carpost";
    }
}
