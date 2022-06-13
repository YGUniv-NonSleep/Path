package com.capstone.pathproject.security.oauth;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.MemberGender;
import com.capstone.pathproject.domain.member.Role;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("getClientRegistration: " + userRequest.getClientRegistration()); //registrationId로 어떤 OAuth로 로그인했는지 확인 가능
        System.out.println("getAccessToken: " + userRequest.getAccessToken().getTokenValue());

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("oAuth2User.getAttributes() = " + oAuth2User.getAttributes());

        OAuth2UserInfo oAuth2UserInfo = null;
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            log.info("PrincipalOauth2UserService : 구글 로그인 요청");
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            log.info("PrincipalOauth2UserService : 네이버 로그인 요청");
            oAuth2UserInfo = new NaverUserInfo((Map<String, Object>) oAuth2User.getAttributes().get("response"));
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("facebook")) {
            log.info("PrincipalOauth2UserService : 페이스북 로그인 요청");
            oAuth2UserInfo = new FacebookUserInfo(oAuth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
            log.info("PrincipalOauth2UserService : 카카오 로그인 요청");
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        } else {
            log.warn("PrincipalOauth2UserService : 구글, 네이버, 페이스북 외 로그인 요청이 왔습니다.");
        }

        String provider = oAuth2UserInfo.getProvider();
        String providerId = oAuth2UserInfo.getProviderId();
        String loginId = provider + "_" + providerId;
        String uuid = UUID.randomUUID().toString().substring(0, 6);
        String password = bCryptPasswordEncoder.encode("snsMember" + uuid);
        String email = oAuth2UserInfo.getEmail();
        String name = oAuth2UserInfo.getName();
        Role role = Role.ROLE_MEMBER;
        MemberGender gender = null;
        String mobile = null;
        LocalDate birthday = null;

        if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            switch (oAuth2UserInfo.getGender()) {
                case "M":
                    gender = MemberGender.MALE;
                    break;
                case "F":
                    gender = MemberGender.FEMALE;
                    break;
            }
            mobile = oAuth2UserInfo.getMobile();
            int month = Integer.parseInt(oAuth2UserInfo.getBirthday().substring(0, 2));
            int day = Integer.parseInt(oAuth2UserInfo.getBirthday().substring(3, 5));
            int year = Integer.parseInt(oAuth2UserInfo.getBirthyear());
            birthday = LocalDate.of(year, month, day);
        }

        Optional<Member> findMember = memberRepository.findByLoginId(loginId);
        Member member = findMember.orElse(null);
        if (member == null) {
            log.info("PrincipalOauth2UserService : OAuth 최초 로그인");
            member = Member.builder()
                    .loginId(loginId)
                    .name(name)
                    .password(password)
                    .mail(email)
                    .role(role)
                    .provider(provider)
                    .providerId(providerId)
                    .score(100)
                    .gender(gender)
                    .phone(mobile)
                    .birthday(birthday)
                    .build();
            memberRepository.save(member);
        } else {
            log.info("PrincipalOauth2UserService : 회원가입된 OAuth 회원입니다.");
        }
        return new PrincipalDetails(member, oAuth2User.getAttributes());
    }
}