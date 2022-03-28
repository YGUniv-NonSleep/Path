package com.capstone.pathproject.service;

import com.capstone.pathproject.domain.company.ProdBasic;
import com.capstone.pathproject.domain.company.Product;
import com.capstone.pathproject.dto.CompanyDTO;
import com.capstone.pathproject.dto.ProdBasicDTO;
import com.capstone.pathproject.dto.ProductDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.ProdBasicRepository;
import com.capstone.pathproject.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProdBasicRepository prodBasicRepository;
    private final ProductRepository productRepository;

    //ProdBasic create
    public Message<ProdBasicDTO> createBasic(ProdBasicDTO prodBasicDTO) {
        System.out.println(prodBasicDTO.toString());

        ProdBasic d = prodBasicDTO.toEntity();
        System.out.println(d.toString());

        prodBasicRepository.save(prodBasicDTO.toEntity());
        return Message.<ProdBasicDTO>createMessage()
                .header(StatusEnum.OK)
                .message("ProdBasic Create Success")
                .body(prodBasicDTO)
                .build();
    }
    //ProdBasic delete
    public Message deleteBasic(Long prodBasicId){
        prodBasicRepository.deleteById(prodBasicId);
        return Message.createMessage()
                .header(StatusEnum.OK)
                .message("ProdBasic delete success")
                .build();
    }
    //ProdBasic updete
    public Message<ProdBasicDTO> updateBasic(ProdBasicDTO prodBasicDTO){
        prodBasicRepository.save(prodBasicDTO.toEntity());

        return Message.<ProdBasicDTO>createMessage()
                .header(StatusEnum.OK)
                .message("ProdBasic updeate Success")
                .body(prodBasicDTO)
                .build();
    }
    //ProdBasic
    public Message<ProdBasicDTO> basicDetail(Long prodBasicId) {
        Optional<ProdBasic> pb = prodBasicRepository.findById(prodBasicId);
        ProdBasic rs = pb.get();

        ProdBasicDTO prodBasicDTO = ProdBasicDTO.createProdBasicDTO()
                .id(rs.getId())
                .name(rs.getName())
                .image(rs.getImage())
                .detail(rs.getDetail())
                .brand(rs.getBrand())
                .categori(rs.getCategori())
                .build();

        return Message.<ProdBasicDTO>createMessage()
                .header(StatusEnum.OK)
                .message("find Success")
                .body(prodBasicDTO)
                .build();
    }

    public Message<ProductDTO> createProduct(ProductDTO productDTO){
        productRepository.save(productDTO.toEntity());

        return Message.<ProductDTO>createMessage()
                .header(StatusEnum.OK)
                .message("Product Create Success")
                .body(productDTO)
                .build();
    }

    public Message deleteProduct(Long productId){
        productRepository.deleteById(productId);

        return Message.createMessage()
                .header(StatusEnum.OK)
                .message("Product Delete Success")
                .build();
    }

    public Message<ProductDTO> updateProduct(ProductDTO productDTO){
        productRepository.save(productDTO.toEntity());

        return Message.<ProductDTO>createMessage()
                .header(StatusEnum.OK)
                .message("Product Update Success")
                .build();
    }

    public Message<ProductDTO> productDetail(Long  prodId){
        Product rs = productRepository.findById(prodId).get();

        ProductDTO result = ProductDTO.createProductDTO()
                .prodbasic(rs.getProdbasic())
                .company(rs.getCompany())
                .created(rs.getCreated())
                .discount(rs.getDiscount())
                .exposure(rs.getExposure())
                .id(rs.getId())
                .price(rs.getPrice())
                .stock(rs.getStock())
                .build();

        return Message.<ProductDTO>createMessage().header(StatusEnum.OK).message("Product find Success").build();
    }

    public Message<List<ProductDTO>> productListByCompany(CompanyDTO companyDTO){
        List<Product> rs = productRepository.findByCompany(companyDTO.toEntity());

        return Message.<List<ProductDTO>>createMessage().header(StatusEnum.OK).message("Product find Success").build();
    }

    //public Message<Product> productListBy


}
