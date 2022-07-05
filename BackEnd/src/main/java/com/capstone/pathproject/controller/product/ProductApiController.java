package com.capstone.pathproject.controller.product;

import com.capstone.pathproject.dto.company.FindCompanyDto;
import com.capstone.pathproject.dto.product.*;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.product.ProductService;
import com.capstone.pathproject.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductApiController {

    private final ProductService productService;
    private final ResponseUtil responseUtil;

    @PostMapping("/basic")
    public ResponseEntity<Message<ProdBasicDTO>> createBasic(@RequestBody ProdBasicDTO prodBasicDTO){

        Message<ProdBasicDTO> message = productService.createBasic(prodBasicDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/basic/{basicId}")
    public ResponseEntity<Message> deleteBasic(@PathVariable("basicId") Long basicId){
        Message message = productService.deleteBasic(basicId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PatchMapping("/basic")
    public ResponseEntity<Message<ProdBasicDTO>> updateBasic(@RequestBody ProdBasicDTO prodBasicDTO){

        Message message = productService.updateBasic(prodBasicDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/basic/{basicId}")
    public ResponseEntity<Message<ProdBasicDTO>> basicDetail(@PathVariable("basicId") Long basicId){

        Message<ProdBasicDTO> message = productService.basicDetail(basicId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/basic")
    public ResponseEntity findBasic(@RequestParam(value = "name" , required = false,defaultValue = "")String name,
                                    @RequestParam(value = "brand", required = false,defaultValue = "")String brand) {

        Message message = productService.findBasicByName(name, brand);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Message<ProductDTO>> createProduct(@RequestBody ProductDTO productDTO){
        System.out.println(productDTO.toString());
        Message<ProductDTO> message = productService.createProduct(productDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/{prodId}")
    public ResponseEntity<Message> deleteProduct(@PathVariable("prodId")Long prodId){

        System.out.println("prodId = " + prodId);
        Message message = productService.deleteProduct(prodId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PatchMapping("/")
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

    //업체 별 상품 조회
    @GetMapping("/comp/{companyId}")
    public ResponseEntity<Message<List<ProductDTO>>> productListByCompany(@PathVariable("companyId")Long companyId ){
         Message<List<ProductDTO>> message = productService.productListByCompany(companyId);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/option")
    public ResponseEntity<Message<OptionDTO>> createOption(@RequestBody OptionDTO optionDTO){
        Message message = productService.createOption(optionDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/option/{optionId}")
    public ResponseEntity<Message> deleteOption(@PathVariable("optionId") Long optionId){
        Message message = productService.deleteOption(optionId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PatchMapping("/option")
    public ResponseEntity<Message<OptionDTO>>  updateOption(@RequestBody OptionDTO optionDTO){
        Message message = productService.updateOption(optionDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/option/{optionId}")
    public ResponseEntity<Message<OptionDTO>> optionDetail(@PathVariable("optionId") Long optionId){
        Message message = productService.selectOption(optionId);
        return new ResponseEntity<>(message, HttpStatus.OK);

    }

    @PostMapping("/detailOption")
    public ResponseEntity<Message<DetailOptionDTO>> createDetailOption(@RequestBody DetailOptionDTO detailOptionDTO){
        Message message = productService.createDetailOption(detailOptionDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/detailOption/{detailOptionId}")
    public ResponseEntity<Message<DetailOptionDTO>> deleteDetailOption(@PathVariable("detailOptionId")Long detailOptionId){
        Message message = productService.deleteDetailOption(detailOptionId);
        System.out.println(message);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PatchMapping("/detailOption")
    public ResponseEntity<Message<DetailOptionDTO>> updatDetailOption(@RequestBody DetailOptionDTO detailOptionDTO){
        Message message = productService.updateDetailOption(detailOptionDTO);
        System.out.println(message);
        return null;
    }

    @PostMapping("/search")
    public ResponseEntity<?> findProduct(@RequestBody(required = false) FindProductDto findProductDto ) {
        System.out.println("데이터: "+findProductDto);
        Message<?> message = productService.findProduct(findProductDto);
        return responseUtil.createResponseEntity(message);
    }








}
