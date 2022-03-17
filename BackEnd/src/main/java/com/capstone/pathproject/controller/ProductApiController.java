package com.capstone.pathproject.controller;

import com.capstone.pathproject.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductApiController {

    private final ProductService productService;

}
