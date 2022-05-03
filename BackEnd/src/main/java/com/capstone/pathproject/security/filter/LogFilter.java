package com.capstone.pathproject.security.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;

import javax.servlet.*;
import javax.servlet.Filter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.UUID;

// Filter 인터페이스는 default 메서드인 init()과 destroy()가 있고, 필수 구현인 doFilter()가 있다.
// init() : 필터 초기화 메서드로 서블릿 컨테이너가 생성될 때 호출
// destroy() : 필터 종료 메서드로 서블릿 컨테이너가 종료될 때 호출
// doFilter() : 고객 요청이 올때마다 해당 메서드 호출
// 모든 요청에 대해 로그를 남기는 필터
@Slf4j
@Order(0)
public class LogFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        log.info("log filter init");
    }

    // HTTP 요청이 오면 doFilter가 호출
    // ServletRequest request 파라미터는 HTTP 요청이 아닌 경우도 고려해서 만든 인터페이스로, HTTP사용시 HttpServletRequest로 다운캐스팅한 뒤 사용한다.
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        log.info("log filter doFilter");

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String requestURI = httpRequest.getRequestURI();
        // HTTP 요청을 구분하기 위해 임의의 uuid를 만든다. (UUID로 만들면 중복될 일이 거의 없음)
        String uuid = UUID.randomUUID().toString();

        try {
            log.info("REQUEST [{}][{}]", uuid, requestURI);
            chain.doFilter(request, response); // 다음 필터가 있으면 진행하고 없으면 서블릿 호출한다. (없으면 다음 단계 진행 안됨!)
        }catch(Exception e) {
            throw e;
        }finally {
            log.info("RESPONSE [{}][{}]",uuid,requestURI);
        }
    }

    @Override
    public void destroy() {
        log.info("log filter destroy");
    }
}