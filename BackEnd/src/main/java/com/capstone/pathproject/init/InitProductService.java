package com.capstone.pathproject.init;

import com.capstone.pathproject.domain.company.DetailOption;
import com.capstone.pathproject.domain.company.Option;
import com.capstone.pathproject.domain.company.ProdBasic;
import com.capstone.pathproject.domain.company.Product;
import com.capstone.pathproject.repository.company.CompanyRepository;
import com.capstone.pathproject.repository.product.DetailOptionRepository;
import com.capstone.pathproject.repository.product.OptionRepository;
import com.capstone.pathproject.repository.product.ProdBasicRepository;
import com.capstone.pathproject.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Component
@Transactional
@RequiredArgsConstructor
public class InitProductService {

    private final ProductRepository productRepository;
    private final OptionRepository optionRepository;
    private final DetailOptionRepository detailOptionRepository;
    private final ProdBasicRepository prodBasicRepository;
    private final CompanyRepository companyRepository;

    public void dbInitProduct() {

        int temp = 0;

        for (int j = 1; j <= 10; j++) {
            ProdBasic prodBasic = createProdBasic((long) j);
            prodBasicRepository.save(prodBasic);
        }

        for (int k = 1; k <= 5; k++) {

            for (int h = 1; h <= 5; h++) {
                ArrayList<Option> options = new ArrayList<>();
                Product product = createProduct("Product" + h, (long)k, (long)h);


                for (int i = 1; i <= 5; i++) {
                    ArrayList<DetailOption> detailOptions = new ArrayList<>();
                    Option option = createOption("Option" + i, product.getId());
//                    optionRepository.save(option);
                    System.out.println("option.getId() = " + option.getId());
                    options.add(option);


                    for (int j = 1; j <= 5; j++) {
                        DetailOption detailOption = createDetailOption(option.getId(), "DetailOption" + j, j);
                        detailOptions.add(detailOption);
                    }

                    option.addDetailOptions(detailOptions);


                }

                product.addOptions(options);
                productRepository.save(product);



            }



        }


    }

    public ProdBasic createProdBasic(Long name) {
        return ProdBasic.createProdBasic()
                .category("커피")
                .image("blankImage")
                .name("Product Basic" + name)
                .detail("커피")
                .brand("Twosome Place")
                .build();
    }

    public DetailOption createDetailOption(Long optionId, String name, int j) {
        return DetailOption.createDetailOption()
                .name(name)
                .price((int) (j * 300))
                .optionId(optionId)
                .build();
    }

    public Option createOption(String name, Long productId) {
        return Option.createOption()
                .proId(productId)
                .name(name)
                .build();
    }

    public Product createProduct(String name, long compId, long prodBasicId) {
        return Product.createProduct()
                .price((int) (1000*prodBasicId))
                .stock(300)
                .discount(10)
                .exposure(true)
                .prodBasic(prodBasicRepository.findById(prodBasicId).get())
                .company(companyRepository.findById(compId).get())
                .build();
    }


}
