package com.capstone.pathproject.controller.product;

import com.capstone.pathproject.dto.product.DetailOptionDTO;
import com.capstone.pathproject.dto.product.OptionDTO;
import com.capstone.pathproject.dto.product.ProdBasicDTO;
import com.capstone.pathproject.dto.product.ProductDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.product.ProductService;
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

    @PostMapping("/basic")
    public ResponseEntity<Message<ProdBasicDTO>> createBasic(@RequestPart(value="json") ProdBasicDTO prodBasicDTO,
                                                             @RequestPart(value = "picture", required = false) MultipartFile file ,
                                                             HttpServletRequest httpServletRequest){
        String fileName;
        if (file != null){
            fileName = file.getOriginalFilename();
            String filePath = httpServletRequest.getSession().getServletContext().getRealPath("")+ "product\\";
            try {
                file.transferTo(new File(filePath + fileName));

            }catch (Exception e){
                e.printStackTrace();
            }
        }else{
            fileName = "";
        }

        Message<ProdBasicDTO> message = productService.createBasic(prodBasicDTO, fileName);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/basic/{basicId}")
    public ResponseEntity<Message> deleteBasic(@PathVariable("basicId") Long basicId){
        Message message = productService.deleteBasic(basicId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PatchMapping("/basic")
    public ResponseEntity<Message<ProdBasicDTO>> updateBasic(@RequestPart(value="json") ProdBasicDTO prodBasicDTO,
                                                             @RequestPart(value = "picture", required = false) MultipartFile file ,
                                                             HttpServletRequest httpServletRequest){

        String fileName = file.getOriginalFilename();
        String filePath = httpServletRequest.getSession().getServletContext().getRealPath("")+ "product\\";

        try {
            file.transferTo(new File(filePath + fileName));

        }catch (Exception e){
            e.printStackTrace();
        }

        Message message = productService.updateBasic(prodBasicDTO, fileName);
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
        Message<ProductDTO> message = productService.createProduct(productDTO);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @DeleteMapping("/{prodId}")
    public ResponseEntity<Message> deleteProduct(@PathVariable("prodId")Long prodId){
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








}
