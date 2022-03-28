package com.capstone.pathproject.controller;

import com.capstone.pathproject.domain.company.DetailOption;
import com.capstone.pathproject.domain.company.Option;
import com.capstone.pathproject.domain.company.Product;
import com.capstone.pathproject.dto.DetailOptionDTO;
import com.capstone.pathproject.dto.OptionDTO;
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
    public ResponseEntity<Message<ProductDTO>> createProduct(@RequestBody ProductDTO productDTO){
        Message<ProductDTO> message = productService.createProduct(productDTO);

        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        if (message.getHeader() == StatusEnum.BAD_REQUEST) status = HttpStatus.BAD_REQUEST;
        else if (message.getHeader() == StatusEnum.NOT_FOUND) status = HttpStatus.NOT_FOUND;
        else if (message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR) status = HttpStatus.INTERNAL_SERVER_ERROR;

        return new ResponseEntity<>(message, headers, status);
    }

    @DeleteMapping("/deleteProduct/{prodId}")
    public ResponseEntity<Message> deleteProduct(@PathVariable("prodId")Long prodId){
        Message message = productService.deleteProduct(prodId);

        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        if (message.getHeader() == StatusEnum.BAD_REQUEST) status = HttpStatus.BAD_REQUEST;
        else if (message.getHeader() == StatusEnum.NOT_FOUND) status = HttpStatus.NOT_FOUND;
        else if (message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR) status = HttpStatus.INTERNAL_SERVER_ERROR;

        return new ResponseEntity<>(message, headers, status);
    }

    @PatchMapping("/updateProduct")
    public ResponseEntity<Message<ProductDTO>> updateProduct(@RequestBody ProductDTO productDTO){
        Message<ProductDTO> message = productService.updateProduct(productDTO);

        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        if (message.getHeader() == StatusEnum.BAD_REQUEST) status = HttpStatus.BAD_REQUEST;
        else if (message.getHeader() == StatusEnum.NOT_FOUND) status = HttpStatus.NOT_FOUND;
        else if (message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR) status = HttpStatus.INTERNAL_SERVER_ERROR;

        return new ResponseEntity<>(message, headers, status);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Message<ProductDTO>> productDetail(@PathVariable("productId") long prodId){
        System.out.println(prodId + "ASDASDAFSASF");
        Message<ProductDTO> message = productService.productDetail(prodId);

        HttpHeaders headers = new HttpHeaders();
        HttpStatus status = HttpStatus.OK;

        if (message.getHeader() == StatusEnum.BAD_REQUEST) status = HttpStatus.BAD_REQUEST;
        else if (message.getHeader() == StatusEnum.NOT_FOUND) status = HttpStatus.NOT_FOUND;
        else if (message.getHeader() == StatusEnum.INTERNAL_SEVER_ERROR) status = HttpStatus.INTERNAL_SERVER_ERROR;

        return new ResponseEntity<>(message, headers, status);
    }

    @PostMapping("/createOption")
    public ResponseEntity<Message<OptionDTO>> createOption(@RequestBody OptionDTO optionDTO){
        Message message = productService.createOption(optionDTO);

        System.out.println(message);
        return null;
    }

    @DeleteMapping("/deleteOption/{optionId}")
    public ResponseEntity<Message> deleteOption(@PathVariable("optionId") Long optionId){
        Message message = productService.deleteOption(optionId);

        System.out.println(message);
        return null;
    }

    @PatchMapping("/updateOption")
    public ResponseEntity<Message<OptionDTO>>  updateOption(@RequestBody OptionDTO optionDTO){
        Message message = productService.updateOption(optionDTO);

        System.out.println(message);
        return null;
    }

    @GetMapping("/option/{optionId}")
    public ResponseEntity<Message<OptionDTO>> optionDetail(@PathVariable("optionId") Long optionId){
        Message message = productService.selectOption(optionId);

        System.out.println(message);
        return null;

    }

    @PostMapping("/createDetailOption")
    public ResponseEntity<Message<DetailOptionDTO>> createDetailOption(@RequestBody DetailOptionDTO detailOptionDTO){
        Message message = productService.createDetailOption(detailOptionDTO);

        System.out.println(message);
        return null;
    }

    @DeleteMapping("/deleteDetailOption")
    public ResponseEntity<Message<DetailOptionDTO>> deleteDetailOption(@PathVariable("DetailOptionId")Long detailOptionId){
        Message message = productService.deleteDetailOption(detailOptionId);
        System.out.println(message);
        return null;
    }

    @PatchMapping("/updateDetailOption")
    public ResponseEntity<Message<DetailOptionDTO>> updatDetailOption(@RequestBody DetailOptionDTO detailOptionDTO){
        Message message = productService.updateDetailOption(detailOptionDTO);
        System.out.println(message);
        return null;
    }








}
