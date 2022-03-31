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
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/deleteBasic")
    public ResponseEntity<Message> deleteBasic(@RequestParam("basicId") Long basicId){
        Message message = productService.deleteBasic(basicId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PatchMapping("/updateBasic")
    public ResponseEntity<Message<ProdBasicDTO>> updateBasic(@RequestBody ProdBasicDTO prodBasicDTO){

        Message message = productService.updateBasic(prodBasicDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/basic/{basicId}")
    public ResponseEntity<Message<ProdBasicDTO>> basicDetail(@PathVariable("basicId") Long basicId){

        Message<ProdBasicDTO> message = productService.basicDetail(basicId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


    @PostMapping("/createProduct")
    public ResponseEntity<Message<ProductDTO>> createProduct(@RequestBody ProductDTO productDTO){
        Message<ProductDTO> message = productService.createProduct(productDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/deleteProduct/{prodId}")
    public ResponseEntity<Message> deleteProduct(@PathVariable("prodId")Long prodId){
        Message message = productService.deleteProduct(prodId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PatchMapping("/updateProduct")
    public ResponseEntity<Message<ProductDTO>> updateProduct(@RequestBody ProductDTO productDTO){
        Message<ProductDTO> message = productService.updateProduct(productDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Message<ProductDTO>> productDetail(@PathVariable("productId") long prodId){
        System.out.println(prodId + "ASDASDAFSASF");
        Message<ProductDTO> message = productService.productDetail(prodId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/company")
    public ResponseEntity<Message<List<ProductDTO>>> productListByCompany(@RequestBody CompanyDTO companyDTO){
         productService.productListByCompany(companyDTO);

        return null;
    }

    @PostMapping("/createOption")
    public ResponseEntity<Message<OptionDTO>> createOption(@RequestBody OptionDTO optionDTO){
        Message message = productService.createOption(optionDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/deleteOption/{optionId}")
    public ResponseEntity<Message> deleteOption(@PathVariable("optionId") Long optionId){
        Message message = productService.deleteOption(optionId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PatchMapping("/updateOption")
    public ResponseEntity<Message<OptionDTO>>  updateOption(@RequestBody OptionDTO optionDTO){
        Message message = productService.updateOption(optionDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/option/{optionId}")
    public ResponseEntity<Message<OptionDTO>> optionDetail(@PathVariable("optionId") Long optionId){
        Message message = productService.selectOption(optionId);
        return new ResponseEntity<>(message, HttpStatus.OK);

    }

    @PostMapping("/createDetailOption")
    public ResponseEntity<Message<DetailOptionDTO>> createDetailOption(@RequestBody DetailOptionDTO detailOptionDTO){
        Message message = productService.createDetailOption(detailOptionDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/deleteDetailOption")
    public ResponseEntity<Message<DetailOptionDTO>> deleteDetailOption(@PathVariable("DetailOptionId")Long detailOptionId){
        Message message = productService.deleteDetailOption(detailOptionId);
        System.out.println(message);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PatchMapping("/updateDetailOption")
    public ResponseEntity<Message<DetailOptionDTO>> updatDetailOption(@RequestBody DetailOptionDTO detailOptionDTO){
        Message message = productService.updateDetailOption(detailOptionDTO);
        System.out.println(message);
        return null;
    }








}
