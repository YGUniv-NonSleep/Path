package com.capstone.pathproject.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsConfig corsConfig;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(corsConfig.corsFilter())
                .formLogin().disable()
                .httpBasic().disable()
                .authorizeRequests()
                .antMatchers("/user/**").hasAnyRole("ADMIN","BUSINESS","USER")
                .antMatchers("/business/**").hasAnyRole("ADMIN","BUSINESS")
                .antMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().permitAll();
    }
}
