package com.capstone.pathproject.service.product;

import com.capstone.pathproject.domain.company.*;
import com.capstone.pathproject.dto.product.DetailOptionDTO;
import com.capstone.pathproject.dto.product.OptionDTO;
import com.capstone.pathproject.dto.product.ProdBasicDTO;
import com.capstone.pathproject.dto.product.ProductDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.company.CompanyRepository;
import com.capstone.pathproject.repository.product.DetailOptionRepository;
import com.capstone.pathproject.repository.product.OptionRepository;
import com.capstone.pathproject.repository.product.ProdBasicRepository;
import com.capstone.pathproject.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProdBasicRepository prodBasicRepository;
    private final ProductRepository productRepository;
    private final OptionRepository optionRepository;
    private final DetailOptionRepository detailOptionRepository;
    private final CompanyRepository companyRepository;


    public Message<ProdBasicDTO> createBasic(ProdBasicDTO prodBasicDTO) {

        prodBasicRepository.save(prodBasicDTO.toEntity());

        return Message.<ProdBasicDTO>builder()
                .header(StatusEnum.OK)
                .message("ProdBasic Create Success")
                .body(prodBasicDTO)
                .build();
    }

    public Message deleteBasic(Long prodBasicId){
        prodBasicRepository.deleteById(prodBasicId);
        return Message.builder()
                .header(StatusEnum.OK)
                .message("ProdBasic delete success")
                .build();
    }

    public Message<ProdBasicDTO> updateBasic(ProdBasicDTO prodBasicDTO){

        prodBasicRepository.save(prodBasicDTO.toEntity());

        return Message.<ProdBasicDTO>builder()
                .header(StatusEnum.OK)
                .message("ProdBasic updeate Success")
                .body(prodBasicDTO)
                .build();
    }

    public Message<ProdBasicDTO> basicDetail(Long prodBasicId) {

        Optional<ProdBasic> prodBasic = prodBasicRepository.findById(prodBasicId);
        ProdBasicDTO prodBasicDTO = new ProdBasicDTO(prodBasic.get());

        return Message.<ProdBasicDTO>builder()
                .header(StatusEnum.OK)
                .message("find Success")
                .body(prodBasicDTO)
                .build();
    }

    public Message<List<ProdBasicDTO>> findBasicByName(String name, String brand){

        List<ProdBasic> prodBasicList = prodBasicRepository.findByNameContainingAndBrandContaining(name, brand);
        ArrayList<ProdBasicDTO> prodBasicDTOList = new ArrayList<>();

        prodBasicList.stream()
                .map(prodBasic -> new ProdBasicDTO(prodBasic))
                .forEach(prodBasicDTO -> prodBasicDTOList.add(prodBasicDTO));

        System.out.println(prodBasicList);

        return Message.<List<ProdBasicDTO>>builder()
                .header(StatusEnum.OK)
                .body(prodBasicDTOList)
                .message("조회 성공!")
                .build();
    }

    public Message<ProductDTO> createProduct(ProductDTO productDTO){

        Optional<Company> company = companyRepository.findById(productDTO.getCompany().getId());

        productRepository.save(productDTO.toEntity(company.get()));

        return Message.<ProductDTO>builder()
                .header(StatusEnum.OK)
                .message("Product Create Success")
                .body(productDTO)
                .build();
    }

    public Message deleteProduct(Long productId){
        productRepository.deleteById(productId);

        return Message.builder()
                .header(StatusEnum.OK)
                .message("Product Delete Success")
                .build();
    }

    public Message<ProductDTO> updateProduct(ProductDTO productDTO){

        Optional<Company> company = companyRepository.findById(productDTO.getCompany().getId());

        productRepository.save(productDTO.toEntity(company.get()));

        return Message.<ProductDTO>builder()
                .header(StatusEnum.OK)
                .message("Product Update Success")
                .body(productDTO)
                .build();
    }

    public Message<ProductDTO> productDetail(Long prodId){

        Product product = productRepository.findById(prodId).get();

        ProductDTO productDTO = new ProductDTO(product);

        return Message.<ProductDTO>builder()
                .header(StatusEnum.OK)
                .message("Product find Success")
                .body(productDTO)
                .build();
    }

    public Message<List<ProductDTO>> productListByCompany(Long companyId){

        List<Product> productList = productRepository.findByCompanyId(companyId);
        ArrayList<ProductDTO> productDTOList = new ArrayList<>();

        productList.stream()
                .map(product -> new ProductDTO(product))
                .forEach(productDTO -> productDTOList.add(productDTO));

//        for (ProductDTO p : productDTOList){
//            for (Option o : p.getOptionList()) {
//                for (DetailOption d: o.getDetailOptionList()
//                     ) {
//                    System.out.println(d.toString());
//                }
//            }
//        }

        return Message.<List<ProductDTO>>builder()
                .message("상품 조회 성공")
                .body(productDTOList)
                .header(StatusEnum.OK)
                .build();
    }

    //public Message<Product> productListBy

    public Message<OptionDTO> createOption(OptionDTO optionDTO){

        optionRepository.save(optionDTO.toEntity());

        return Message.<OptionDTO>builder()
                .header(StatusEnum.OK)
                .message("Option Create Success")
                .body(optionDTO)
                .build();
    }

    public Message deleteOption(Long optionId){

        optionRepository.deleteById(optionId);

        return Message.builder()
                .header(StatusEnum.OK)
                .message("Option Delete Success")
                .build();
    }

    public Message<OptionDTO> updateOption(OptionDTO optionDTO){

        optionRepository.save(optionDTO.toEntity());

        return Message.<OptionDTO>builder()
                .header(StatusEnum.OK)
                .message("Option Update Success")
                .body(optionDTO)
                .build();
    }

    public Message<OptionDTO> selectOption(Long optionId){

        Option rs = optionRepository.findById(optionId).get();

        OptionDTO result = OptionDTO.createOptionDTO()
                .id(rs.getId())
                .name(rs.getName())
                .build();

        return Message.<OptionDTO>builder()
                .header(StatusEnum.OK)
                .message("Option Select Success")
                .body(result)
                .build();
    }

    public Message<DetailOptionDTO> createDetailOption(DetailOptionDTO detailOptionDTO){

        detailOptionRepository.save(detailOptionDTO.toEntity());

        return Message.<DetailOptionDTO>builder()
                .header(StatusEnum.OK)
                .message("DetailOption Create Success")
                .body(detailOptionDTO)
                .build();
    }

    public Message deleteDetailOption(Long detailOptionId){

        detailOptionRepository.deleteById(detailOptionId);

        return Message.builder()
                .header(StatusEnum.OK)
                .message("DetailOption Delete Success")
                .build();
    }

    public Message<DetailOptionDTO> updateDetailOption(DetailOptionDTO detailOptionDTO){

        detailOptionRepository.save(detailOptionDTO.toEntity());

        return Message.<DetailOptionDTO>builder()
                .header(StatusEnum.OK)
                .message("DetailOption Update Success")
                .body(detailOptionDTO)
                .build();
    }

    public Message<DetailOptionDTO> DetailOptionByOption(OptionDTO optionDTO){
        return null;
    }



}
