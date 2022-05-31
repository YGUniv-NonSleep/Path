package com.capstone.pathproject.service.member;

import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.dto.member.*;
import com.capstone.pathproject.dto.order.AmountByDayDto;
import com.capstone.pathproject.dto.order.MemberPaymentDto;
import com.capstone.pathproject.dto.order.OrderItemQueryDto;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.repository.order.query.OrderItemQueryRepository;
import com.capstone.pathproject.repository.order.query.PaymentQueryRepository;
import com.capstone.pathproject.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final OrderItemQueryRepository orderItemQueryRepository;
    private final PaymentQueryRepository paymentQueryRepository;
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // 회원가입
    public Message<String> signup(SignupFormDto signupFormDto) {
        if (isValidateDuplicateMember(signupFormDto.getLoginId())) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 존재함")
                    .body("").build();
        }
        Member member = signupFormDto.toEntity();
        member.updateEncodePassword(encodePassword(member.getPassword()));
        memberRepository.save(member);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("회원 가입 성공")
                .body("").build();
    }

    private boolean isValidateDuplicateMember(String loginId) {
        Optional<Member> findMembers = memberRepository.findByLoginId(loginId);
        return findMembers.isPresent();
    }

    private String encodePassword(String password) {
        return bCryptPasswordEncoder.encode(password);
    }

    // 회원 조회
    @Transactional(readOnly = true)
    public Message<MemberDto> getMemberInfo(Long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        Member member = findMember.orElse(null);
        if (member == null) {
            return Message.<MemberDto>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 없습니다.").build();
        }
        MemberDto memberDto = new MemberDto(member);
        return Message.<MemberDto>builder()
                .header(StatusEnum.OK)
                .message("회원이 있습니다.")
                .body(memberDto).build();
    }

    // 회원 수정
    public Message<String> updateMember(Long id, UpdateMemberDto updateMemberDto) {
        Optional<Member> findMember = memberRepository.findById(id);
        Member member = findMember.orElse(null);
        if (member == null) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 없습니다.")
                    .body("").build();
        }
        if (StringUtils.isNotBlank(updateMemberDto.getMail()))
            member.updateMail(updateMemberDto.getMail());
        if (StringUtils.isNotBlank(updateMemberDto.getPhone()))
            member.updatePhone(updateMemberDto.getPhone());
        if (StringUtils.isNotBlank(updateMemberDto.getPostId()))
            member.updatePost(Integer.parseInt(updateMemberDto.getPostId()));
        if (StringUtils.isNotBlank(updateMemberDto.getAddr()))
            member.updateAddr(updateMemberDto.getAddr());
        if (StringUtils.isNotBlank(updateMemberDto.getAddrDetail()))
            member.updateAddrDetail(updateMemberDto.getAddrDetail());
        if (StringUtils.isNotBlank(updateMemberDto.getAddrExtra())) {
            if (updateMemberDto.getAddrExtra().equals("없음")) member.updateAddrExtra("");
            else member.updateAddrExtra(updateMemberDto.getAddrExtra());
        }
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("회원 수정이 되었습니다.")
                .body("").build();
    }

    // 회원 탈퇴
    public Message<String> deleteMember(Long id) {
        Optional<Member> findMember = memberRepository.findById(id);
        Member member = findMember.orElse(null);
        if (member == null) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 없습니다.")
                    .body("").build();
        }
        memberRepository.delete(member);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("회원 탈퇴하였습니다.")
                .body("").build();
    }

    // 아이디 찾기
    public Message<Object> forgotLoginId(ForgotLoginIdDto forgotLoginIdDto) {
        Optional<Member> findMember = memberRepository.findByNameAndMail(forgotLoginIdDto.getName(), forgotLoginIdDto.getMail());
        return forgotIdAndPwValidateOptionalMember(findMember);
    }

    // 비밀번호 찾기
    public Message<Object> forgotPassword(ForgotPwDto forgotPwDto) {
        Optional<Member> findMember = memberRepository.findByLoginIdAndPhone(forgotPwDto.getLoginId(), forgotPwDto.getPhone());
        return forgotIdAndPwValidateOptionalMember(findMember);
    }

    private Message<Object> forgotIdAndPwValidateOptionalMember(Optional<Member> findMember) {
        Member member = findMember.orElse(null);
        if (member == null) {
            return Message.builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 존재하지 않습니다.").build();
        }
        MemberDto memberDto = MemberDto.builder()
                .id(member.getId())
                .loginId(member.getLoginId())
                .mail(member.getMail())
                .name(member.getName()).build();
        return Message.builder()
                .header(StatusEnum.OK)
                .message("회원이 존재합니다.")
                .body(memberDto).build();
    }

    // 비밀번호 재설정
    public Message<Object> resetPassword(Long id, Map<String, String> body) {
        Optional<Member> findMember = memberRepository.findById(id);
        Member member = findMember.orElse(null);
        if (member == null) {
            return Message.builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("회원이 없습니다.").build();
        }
        if (StringUtils.isBlank(body.get("password"))) {
            return Message.builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("비밀번호를 입력하지 않았습니다.").build();
        }
        member.updateEncodePassword(encodePassword(body.get("password")));
        return Message.builder()
                .header(StatusEnum.OK)
                .message("비밀번호 재설정되었습니다.").build();
    }

    public Slice<MemberPaymentDto> getMemberPayments(Long memberId, Pageable pageable) {
        Slice<MemberPaymentDto> memberPaymentDtos = paymentQueryRepository.findMemberPayments(memberId, pageable);
        Map<Long, List<OrderItemQueryDto>> orderItemMap = getOrderItemMap(toOrderIds(memberPaymentDtos));
        memberPaymentDtos.forEach(p -> p.setOrderItems(orderItemMap.get(p.getOrderId())));
        return memberPaymentDtos;
    }

    public Slice<MemberPaymentDto> getMemberPaymentsBetweenDate(Long memberId, String startDate, String endDate, Pageable pageable) {
        LocalDate startLocalDate = LocalDate.parse(startDate);
        LocalDateTime startLocalDateTime = startLocalDate.atTime(0, 0);
        LocalDate endLocalDate = LocalDate.parse(endDate);
        LocalDateTime endLocalDateTime = endLocalDate.atTime(LocalTime.MAX);
        Slice<MemberPaymentDto> memberPaymentDtos = paymentQueryRepository.findMemberPaymentsBetweenDate(memberId, startLocalDateTime, endLocalDateTime, pageable);
        Map<Long, List<OrderItemQueryDto>> orderItemMap = getOrderItemMap(toOrderIds(memberPaymentDtos));
        memberPaymentDtos.forEach(p -> p.setOrderItems(orderItemMap.get(p.getOrderId())));
        return memberPaymentDtos;
    }

    private Map<Long, List<OrderItemQueryDto>> getOrderItemMap(List<Long> orderIds) {
        List<OrderItemQueryDto> orderItems = orderItemQueryRepository.findOrderItems(orderIds);
        return orderItems.stream()
                .collect(Collectors.groupingBy(OrderItemQueryDto::getOrderId));
    }

    private List<Long> toOrderIds(Slice<MemberPaymentDto> memberPaymentDtos) {
        return memberPaymentDtos.stream()
                .map(MemberPaymentDto::getOrderId)
                .collect(Collectors.toList());
    }

    public Message<Object> getMemberTotalPaymentsMonth(Long memberId) {
        int year = LocalDate.now().getYear();
        String month = LocalDate.now().format(DateTimeFormatter.ofPattern("MM"));
        LocalDateTime firstDateTime = LocalDate.of(year, Integer.parseInt(month), 1).atTime(0, 0);
        List<AmountByDayDto> amountByDayDtos = paymentQueryRepository.findTotalPaymentsBetweenDate(memberId, firstDateTime, LocalDateTime.now());
        return Message.builder()
                .header(StatusEnum.OK)
                .message("이번달 총 결제요금 조회완료")
                .body(amountByDayDtos).build();
    }
}
