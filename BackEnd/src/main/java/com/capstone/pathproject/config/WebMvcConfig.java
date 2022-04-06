package com.capstone.pathproject.config;

import com.capstone.pathproject.security.filter.LogFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import javax.servlet.Filter;


@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    @Bean
    public FilterRegistrationBean logFilter() {
        FilterRegistrationBean<Filter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
        filterFilterRegistrationBean.setFilter(new LogFilter()); // 등록 필터 지정
        filterFilterRegistrationBean.setOrder(0); // 필터는 체인으로 동작하기에 순서가 필요함. 낮을수록 먼저 동작.
        filterFilterRegistrationBean.addUrlPatterns("/*"); // 필터 적용할 URL 패턴 지정, 여러개 가능
        return filterFilterRegistrationBean;
    }
}
