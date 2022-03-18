package com.capstone.pathproject.controller;

import com.capstone.pathproject.dto.ProdBasicDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductApiController {

    private final ProductService productService;

    @PostMapping("/BasicCreate")
    public ResponseEntity<Message<ProdBasicDTO>> createBasic(@RequestBody ProdBasicDTO prodBasicDTO){
        Message<ProdBasicDTO> message = productService.createBasic(prodBasicDTO);


        return null;
    }


}
