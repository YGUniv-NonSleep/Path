package com.capstone.pathproject.security.config;

import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.security.auth.PrincipalDetailsService;
import com.capstone.pathproject.security.auth.jwt.JwtAuthenticationFilter;
import com.capstone.pathproject.security.auth.jwt.JwtAuthorizationFilter;
import com.capstone.pathproject.security.util.CookieUtil;
import com.capstone.pathproject.security.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final MemberRepository memberRepository;
    private final RedisTemplate redisTemplate;
    private final JwtTokenUtil jwtTokenUtil;
    private final CookieUtil cookieUtil;
    private final CorsFilter corsFilter;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(corsFilter)
                .formLogin().disable()
                .httpBasic().disable()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), redisTemplate, jwtTokenUtil, cookieUtil))
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), memberRepository, redisTemplate, jwtTokenUtil, cookieUtil))
                .authorizeRequests()
                .antMatchers("/api/reissue/**").hasAnyRole("ADMIN", "BUSINESS", "USER")
                .antMatchers("/api/user/**").hasAnyRole("ADMIN", "BUSINESS", "USER")
                .antMatchers("/api/business/**").hasAnyRole("ADMIN", "BUSINESS")
                .antMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().permitAll();
    }
}
