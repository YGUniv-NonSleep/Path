package com.capstone.pathproject.service;


import com.capstone.pathproject.domain.community.Post;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.Role;
import com.capstone.pathproject.dto.PostDTO;
import com.capstone.pathproject.dto.member.MemberDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.PostRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;


    @Transactional
    public Message<List<PostDTO>> getPostList(Pageable pageable) {
        List<Post> result = postRepository.findAll(pageable).getContent();
        ArrayList<PostDTO> listPDT = new ArrayList<PostDTO>();
        result.stream().map(post -> post.toDTO()).forEach(postDTO -> listPDT.add(postDTO));
        return Message.<List<PostDTO>>createMessage()
                .header(StatusEnum.OK)
                .message("조회완료")
                .body(listPDT).build();
    }

    @Transactional
    public Message<List<PostDTO>> search(String keyword, Pageable pageable) {
        List<Post> postList = postRepository.findByTitleContaining(keyword, pageable);
        ArrayList<PostDTO> listPDT = new ArrayList<PostDTO>();

        postList.stream().map(post -> post.toDTO()).forEach(postDTO -> listPDT.add(postDTO));
        return Message.<List<PostDTO>>createMessage()
                .header(StatusEnum.OK)
                .message("검색완료")
                .body(listPDT).build();
    }


    @Transactional
    public Message updateView (Long id) {
        postRepository.updateView(id);
        return Message.<PostDTO>createMessage()
                .header(StatusEnum.OK)
                .message("조회수 증가성공")
                .build();
    }


    ///Post Service///
    @Transactional
    public Message<PostDTO> create(PostDTO postDTO, String fileName) {
        PostDTO result = PostDTO.createPostDTO()
                .id(postDTO.getId())
                .member(postDTO.getMember())
                .parent(postDTO.getParent())
                .view(postDTO.getView())
                .writeDate(postDTO.getWriteDate())
                .content(postDTO.getContent())
                .photoName(fileName)
                .type(postDTO.getType())
                .title(postDTO.getTitle())
                .build();

        postRepository.save(result.toEntity());
        return Message.<PostDTO>createMessage()
                .header(StatusEnum.OK)
                .message("등록완료")
                .body(result).build();
    }


    @Transactional
    public Message<PostDTO> update(PostDTO postDTO, String fileName) {
        Optional<Post> result = postRepository.findById(postDTO.getId());
        if (result.isPresent()) {
//            PostDTO updateResult = PostDTO.createPostDTO()
//                    .id(postDTO.getId())
//                    .member(postDTO.getMember())
//                    .parent(postDTO.getParent())
//                    .view(postDTO.getView())
//                    .writeDate(postDTO.getWriteDate())
//                    .content(postDTO.getContent())
//                    .photoName(fileName)
//                    .type(postDTO.getType())
//                    .title(postDTO.getTitle())
//                    .build();

            PostDTO updateResult = result.get().toDTO();

//            PostDTO updateResult = result.get().toDTO();


            postRepository.save(updateResult.toEntity());
        }

        return Message.<PostDTO>createMessage()
                .header(StatusEnum.OK)
                .message("업데이트 완료")
                .body(postDTO).build();
    }


    @Transactional
    public Message<PostDTO> delete(Long postId) {
        Optional<Post> result = postRepository.findById(postId);
        Long rs = result.get().getId();
        if (result.isPresent()) {
            postRepository.deleteById(rs);
        }

        return Message.<PostDTO>createMessage()
                .header(StatusEnum.OK)
                .message("삭제완료")
                .build();
    }


    ///답글 SERVICE///
    @Transactional
    public Message<PostDTO> repcreate(PostDTO postDTO, String fileName) {
        Optional<Member> memberOptional = memberRepository.findById(postDTO.getMember().getId());
        //Member의 ROLE이 ADMIN(관리자)이면 게시글의 답글을 등록할 수 있다.
        if(memberOptional.get().getRole().equals(Role.ROLE_ADMIN)){
            PostDTO result = PostDTO.createPostDTO()
                    .id(postDTO.getId())
                    .type(postDTO.getType())
                    .view(postDTO.getView())
                    .member(postDTO.getMember())
                    .writeDate(postDTO.getWriteDate())
                    .content(postDTO.getContent())
                    .title(postDTO.getTitle())
                    .parent(postDTO.getParent())
                    .photoName(fileName)
                    .build();

            postRepository.save(result.toEntity());
            return Message.<PostDTO>createMessage()
                    .header(StatusEnum.OK)
                    .message("등록완료")
                    .body(result).build();
        }else{
            return Message.<PostDTO>createMessage()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("관리자만 등록할 수 있습니다.")
                    .build();
        }
    }


    @Transactional
    public Message<PostDTO> repupdate(PostDTO postDTO, String fileName) {
          Optional<Member> memberOptional = memberRepository.findById(postDTO.getMember().getId());
          if(memberOptional.get().getRole().equals(Role.ROLE_ADMIN)){
              PostDTO updateResult = PostDTO.createPostDTO()
                      .id(postDTO.getId())
                      .member(postDTO.getMember())
                      .parent(postDTO.getParent())
                      .view(postDTO.getView())
                      .writeDate(postDTO.getWriteDate())
                      .content(postDTO.getContent())
                      .photoName(fileName)
                      .type(postDTO.getType())
                      .title(postDTO.getTitle())
                      .build();
              postRepository.save(updateResult.toEntity());
              return Message.<PostDTO>createMessage()
                      .header(StatusEnum.OK)
                      .message("업데이트 완료")
                      .body(updateResult).build();
          }else{
              return Message.<PostDTO>createMessage()
                      .header(StatusEnum.BAD_REQUEST)
                      .message("관리자만 수정할 수 있습니다.")
                      .build();
          }
    }


    @Transactional
    public Message<PostDTO> repdelete(Long postId) {
        Optional<Post> result = postRepository.findById(postId);//postId = 25;

            postRepository.deleteById(result.get().getId());
            return Message.<PostDTO>createMessage()
                    .header(StatusEnum.OK)
                    .message("삭제완료")
                    .build();
        }


    }
