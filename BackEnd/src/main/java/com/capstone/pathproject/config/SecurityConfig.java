package com.capstone.pathproject.config;

import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.security.auth.jwt.JwtAuthenticationFilter;
import com.capstone.pathproject.security.auth.jwt.JwtAuthorizationFilter;
import com.capstone.pathproject.security.filter.JwtExceptionFilter;
import com.capstone.pathproject.util.CookieUtil;
import com.capstone.pathproject.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtExceptionFilter jwtExceptionFilter;
    private final MemberRepository memberRepository;
    private final StringRedisTemplate redisTemplate;
    private final JwtTokenUtil jwtTokenUtil;
    private final CookieUtil cookieUtil;
    private final CorsFilter corsFilter;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/exception/**")
                .antMatchers("/api/image/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .addFilter(corsFilter)
                .addFilterBefore(jwtExceptionFilter, JwtAuthenticationFilter.class)
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), redisTemplate, jwtTokenUtil, cookieUtil))
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), memberRepository, redisTemplate, jwtTokenUtil, cookieUtil))
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/member").permitAll()
                .antMatchers("/api/member/**", "/api/token/**").hasAnyRole("ADMIN", "BUSINESS", "MEMBER")
                .antMatchers("/api/company/**").hasAnyRole("ADMIN", "BUSINESS")
                .antMatchers("/api/admin/**").hasAnyRole("ADMIN")
                .anyRequest().permitAll();
    }
}
