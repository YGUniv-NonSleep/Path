package com.capstone.pathproject.security.auth;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("loadUserByUsername 실행");
        Optional<Member> memberEntity = memberRepository.findByLoginId(username);
        if (memberEntity.isPresent()) {
            log.info("DB에 사용자 존재");
            return new PrincipalDetails(memberEntity.get());
        }
        log.info("DB에 사용자 존재하지 않음");
        return null;
    }
}
