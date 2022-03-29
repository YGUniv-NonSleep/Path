package com.capstone.pathproject.service;


import com.capstone.pathproject.repository.CarPoolPostRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RequestService {

    private final CarPoolPostRepository carPoolPostRepository;
    private final MemberRepository memberRepository;

//    public Message<RequestDTO> write(RequestDTO requestDTO,MemberDTO memberDTO){
//       // 1게시글에 a라는 회원이 댓글을
//
    }

