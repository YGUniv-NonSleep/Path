package com.capstone.pathproject.controller;

import com.capstone.pathproject.dto.company.CompanyDTO;
import com.capstone.pathproject.dto.product.DetailOptionDTO;
import com.capstone.pathproject.dto.product.OptionDTO;
import com.capstone.pathproject.dto.product.ProdBasicDTO;
import com.capstone.pathproject.dto.product.ProductDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductApiController {

    private final ProductService productService;

    @PostMapping("/createBasic")
    public ResponseEntity<Message<ProdBasicDTO>> createBasic(@RequestBody ProdBasicDTO prodBasicDTO){
        Message<ProdBasicDTO> message = productService.createBasic(prodBasicDTO);

        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @DeleteMapping("/deleteBasic")
    public ResponseEntity<Message> deleteBasic(@RequestParam("basicId") Long basicId){
        Message message = productService.deleteBasic(basicId);

        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @PatchMapping("/updateBasic")
    public ResponseEntity<Message<ProdBasicDTO>> updateBasic(@RequestBody ProdBasicDTO prodBasicDTO){

        Message message = productService.updateBasic(prodBasicDTO);

        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @GetMapping("/basic/{basicId}")
    public ResponseEntity<Message<ProdBasicDTO>> basicDetail(@PathVariable("basicId") Long basicId){

        Message<ProdBasicDTO> message = productService.basicDetail(basicId);

        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }


    @PostMapping("/createProduct")
    public ResponseEntity<Message<ProductDTO>> createProduct(@RequestBody ProductDTO productDTO){
        Message<ProductDTO> message = productService.createProduct(productDTO);

        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @DeleteMapping("/deleteProduct/{prodId}")
    public ResponseEntity<Message> deleteProduct(@PathVariable("prodId")Long prodId){
        Message message = productService.deleteProduct(prodId);

        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @PatchMapping("/updateProduct")
    public ResponseEntity<Message<ProductDTO>> updateProduct(@RequestBody ProductDTO productDTO){
        Message<ProductDTO> message = productService.updateProduct(productDTO);

        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Message<ProductDTO>> productDetail(@PathVariable("productId") long prodId){
        System.out.println(prodId + "ASDASDAFSASF");
        Message<ProductDTO> message = productService.productDetail(prodId);

        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @GetMapping("/company")
    public ResponseEntity<Message<List<ProductDTO>>> productListByCompany(@RequestBody CompanyDTO companyDTO){
         productService.productListByCompany(companyDTO);

        return null;
    }

    @PostMapping("/createOption")
    public ResponseEntity<Message<OptionDTO>> createOption(@RequestBody OptionDTO optionDTO){
        Message message = productService.createOption(optionDTO);

        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @DeleteMapping("/deleteOption/{optionId}")
    public ResponseEntity<Message> deleteOption(@PathVariable("optionId") Long optionId){
        Message message = productService.deleteOption(optionId);

        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @PatchMapping("/updateOption")
    public ResponseEntity<Message<OptionDTO>>  updateOption(@RequestBody OptionDTO optionDTO){
        Message message = productService.updateOption(optionDTO);

        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @GetMapping("/option/{optionId}")
    public ResponseEntity<Message<OptionDTO>> optionDetail(@PathVariable("optionId") Long optionId){
        Message message = productService.selectOption(optionId);

        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);

    }

    @PostMapping("/createDetailOption")
    public ResponseEntity<Message<DetailOptionDTO>> createDetailOption(@RequestBody DetailOptionDTO detailOptionDTO){
        Message message = productService.createDetailOption(detailOptionDTO);

        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @DeleteMapping("/deleteDetailOption")
    public ResponseEntity<Message<DetailOptionDTO>> deleteDetailOption(@PathVariable("DetailOptionId")Long detailOptionId){
        Message message = productService.deleteDetailOption(detailOptionId);
        System.out.println(message);

        HttpStatus status = message.getHttpStatus();
        return new ResponseEntity<>(message, status);
    }

    @PatchMapping("/updateDetailOption")
    public ResponseEntity<Message<DetailOptionDTO>> updatDetailOption(@RequestBody DetailOptionDTO detailOptionDTO){
        Message message = productService.updateDetailOption(detailOptionDTO);
        System.out.println(message);
        return null;
    }








}
