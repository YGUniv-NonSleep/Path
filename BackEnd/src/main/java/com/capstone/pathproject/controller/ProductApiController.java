package com.capstone.pathproject.controller;

import com.capstone.pathproject.domain.company.Product;
import com.capstone.pathproject.dto.ProdBasicDTO;
import com.capstone.pathproject.dto.ProductDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductApiController {

    private final ProductService productService;

    @PostMapping("/createBasic")
    public ResponseEntity<Message<ProdBasicDTO>> createBasic(@RequestBody ProdBasicDTO prodBasicDTO){
        Message<ProdBasicDTO> message = productService.createBasic(prodBasicDTO);

        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        if (message.getHeader() == StatusEnum.BAD_REQUEST) status = HttpStatus.BAD_REQUEST;
        else if (message.getHeader() == StatusEnum.NOT_FOUND) status = HttpStatus.NOT_FOUND;
        else if (message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR) status = HttpStatus.INTERNAL_SERVER_ERROR;


        return new ResponseEntity<>(message, headers, status);
    }

    @DeleteMapping("/deleteBasic")
    public ResponseEntity<Message> deleteBasic(@RequestParam("basicId") Long basicId){
        Message message = productService.deleteBasic(basicId);

        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        if (message.getHeader() == StatusEnum.BAD_REQUEST) status = HttpStatus.BAD_REQUEST;
        else if (message.getHeader() == StatusEnum.NOT_FOUND) status = HttpStatus.NOT_FOUND;
        else if (message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR) status = HttpStatus.INTERNAL_SERVER_ERROR;

        return new ResponseEntity<>(message, headers, status);
    }

    @PatchMapping("/updateBasic")
    public ResponseEntity<Message<ProdBasicDTO>> updateBasic(@RequestBody ProdBasicDTO prodBasicDTO){

        Message message = productService.updateBasic(prodBasicDTO);

        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        if (message.getHeader() == StatusEnum.BAD_REQUEST) status = HttpStatus.BAD_REQUEST;
        else if (message.getHeader() == StatusEnum.NOT_FOUND) status = HttpStatus.NOT_FOUND;
        else if (message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR) status = HttpStatus.INTERNAL_SERVER_ERROR;


        return new ResponseEntity<>(message, headers, status);
    }

    @GetMapping("/basic/{basicId}")
    public ResponseEntity<Message<ProdBasicDTO>> basicDetail(@PathVariable("basicId") Long basicId){

        Message<ProdBasicDTO> message = productService.basicDetail(basicId);

        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        if (message.getHeader() == StatusEnum.BAD_REQUEST) status = HttpStatus.BAD_REQUEST;
        else if (message.getHeader() == StatusEnum.NOT_FOUND) status = HttpStatus.NOT_FOUND;
        else if (message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR) status = HttpStatus.INTERNAL_SERVER_ERROR;

        return new ResponseEntity<>(message, headers, status);
    }


    @PostMapping("/createProduct")
    public ResponseEntity<Message<ProductDTO>> createProduct(){
        //Message message = productService.

        return null;
    }

    @DeleteMapping("/deleteProduct")
    public ResponseEntity<Message> deleteProduct(){
        return null;
    }

    @PatchMapping("/updateProduct")
    public ResponseEntity<Message<ProductDTO>> updateProduct(){
        return null;
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<Message<Product>> productDetail(@PathVariable("productId") long productId){
        return null;
    }





}
