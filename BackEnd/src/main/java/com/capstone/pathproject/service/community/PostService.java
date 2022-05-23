package com.capstone.pathproject.service.community;


import com.capstone.pathproject.domain.community.Post;
import com.capstone.pathproject.domain.community.PostType;
import com.capstone.pathproject.domain.member.Member;
import com.capstone.pathproject.domain.member.Role;
import com.capstone.pathproject.dto.community.*;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.repository.community.PostRepository;
import com.capstone.pathproject.repository.member.MemberRepository;
import com.capstone.pathproject.security.auth.PrincipalDetails;
import com.capstone.pathproject.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;


    public Message<List<PostDto>> getPostList(PostType type, Pageable pageable) {
        
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember(); // 로그인한 사람 찾아오기

        Optional<Member> findMember = memberRepository.findById(member.getId());


        List<Post> findPost = postRepository.findByParentIsNullAndType(type,pageable);
        ArrayList<PostDto> listPost = new ArrayList<PostDto>();
        findPost.stream().map(post -> post.toDTO()).forEach(postDto -> listPost.add(postDto));
      
        return Message.<List<PostDto>>builder()
                .header(StatusEnum.OK)
                .message("조회완료")
                .body(listPost).build();
    }


    public Message<PostDto> getReplyList(Long id) {
        Optional<Post> findPost = postRepository.findByParentId(id);
        Post post = findPost.orElse(null);

        PostDto postDto = PostDto.createPostDto()
                .id(post.getId())
                .content(post.getContent())
                .view(post.getView())
                .photoName(post.getPhotoName())
                .type(post.getType())
                .title(post.getTitle())
                .build();

        if (post == null) {
            return Message.<PostDto>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("답글이 없습니다.")
                    .build();
        }
        //보여줘야함
        return Message.<PostDto>builder()
                .header(StatusEnum.OK)
                .message("조회완료")
                .body(postDto).build();


    }


    public Message<List<PostDto>> search(String keyword, Pageable pageable) {
        List<Post> postList = postRepository.findByTitleContaining(keyword, pageable);
        ArrayList<PostDto> listPDT = new ArrayList<PostDto>();
        postList.stream().map(post -> post.toDTO()).forEach(postDTO -> listPDT.add(postDTO));
        return Message.<List<PostDto>>builder()
                .header(StatusEnum.OK)
                .message("검색완료")
                .body(listPDT).build();
    }


    public Message viewParams(Long id) {
        postRepository.updateView(id);
        Optional<Post> post = postRepository.findById(id);
        PostDto postDTO = post.get().toDTO();
        return Message.<PostDto>builder()
                .header(StatusEnum.OK)
                .message("조회수 증가성공")
                .body(postDTO).build();
    }


    public Message<String> create(CreatePostDto postDTO, String fileName) {

        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember(); // 로그인한 사람 찾아오기
        Optional<Member> findMember = memberRepository.findById(member.getId());

        if(findMember == null){
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("사용자 없음")
                    .body("").build();
        }
//        Optional<Member> findMember = memberRepository.findById(postDTO.getMemberId());
//        Member member = findMember.orElse(null);
//        if(findMember == null){
//            return Message.<String>createMessage()
//                    .header(StatusEnum.OK)
//                    .message("없음")
//                    .body("").build();
//        }
        Post post = Post.createPost()
                .member(member)
                .view(0)
                .content(postDTO.getContent())
                .photoName(fileName)
                .type(postDTO.getType())
                .title(postDTO.getTitle())
                .build();
        postRepository.save(post);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("등록완료")
                .body("").build();
    }


    public Message<String> update(Long postId, UpdatePostDto postDto, String fileName) {
        // 게시글 조회
        Optional<Post> findPost = postRepository.findById(postId);
        Post post = findPost.orElse(null);
        if (post == null) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("수정할 게시글이 없습니다.")
                    .body("").build();
        }
        // 작성자 검증하기
        if (!validatePostMember(post.getMember().getLoginId())) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("현재 사용자가 게시글 작성자가 아닙니다.")
                    .body("").build();
        }
        // 내용이 있는지 체크 후 변경
        if (StringUtils.isNotBlank(postDto.getTitle())) {
            post.updateTitle(postDto.getTitle());
        }
        if (StringUtils.isNotBlank(postDto.getContent())) {
            post.updateContent(postDto.getContent());
        }
        if (StringUtils.isNotBlank(postDto.getPhotoName())) {
            post.updatePhotoName(postDto.getPhotoName());
        }
        post.updateType(postDto.getType());

        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("수정이 완료되었습니다.")
                .body("").build();
    }

    private boolean validatePostMember(String loginId) {
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication();
        Member member = principalDetails.getMember();
        if (loginId.equals(member.getLoginId())) {
            return true;
        } else {
            return false;
        }
    }


    public Message<String> delete(Long postId) {
        Optional<Post> findPost = postRepository.findById(postId);
        Post post = findPost.orElse(null);
        if (post == null) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("게시글이 존재하지 않습니다.")
                    .build();
        }
        if (!validatePostMember(post.getMember().getLoginId())) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("현재 사용자가 게시글 작성자가 아닙니다.")
                    .body("").build();
        }
        postRepository.deleteById(postId);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("삭제완료")
                .body("")
                .build();
    }


    public Message<String> repcreate(ReplyCreatePostDto postDTO, String fileName) {

        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication();
        Member member = principalDetails.getMember();

        if (member.getRole() != Role.ROLE_ADMIN) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("관리자만 등록할 수 있습니다.")
                    .build();
        }

        Optional<Post> findPost = postRepository.findById(postDTO.getPostId());
        Post post = findPost.orElse(null);
        if (post == null) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("게시글이 존재하지 않습니다.")
                    .build();
        }
        Post reply = Post.createPost()
                .type(postDTO.getType())
                .member(member)
                .content(postDTO.getContent())
                .title(postDTO.getTitle())
                .parent(post)
                .photoName(fileName)
                .build();

        postRepository.save(reply);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("등록완료")
                .body("").build();


    }


    public Message<String> repupdate(Long postId, ReplyUpdatePostDto postDto, String fileName) {
        Optional<Post> findPost = postRepository.findById(postId);
        Post post = findPost.orElse(null);
        if (post == null) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("수정할 게시글이 없습니다.")
                    .body("").build();
        }
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication();
        Member member = principalDetails.getMember();

        if (member.getRole() != Role.ROLE_ADMIN) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("관리자만 등록할 수 있습니다.")
                    .build();
        }
        if (StringUtils.isNotBlank(postDto.getTitle())) {
            post.updateTitle(postDto.getTitle());
        }
        if (StringUtils.isNotBlank(postDto.getContent())) {
            post.updateContent(postDto.getContent());
        }
        if (StringUtils.isNotBlank(postDto.getPhotoName())) {
            post.updatePhotoName(postDto.getPhotoName());
        }
        post.updateType(postDto.getType());

        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("수정이 완료되었습니다.")
                .body("").build();
    }


    public Message<String> repdelete(Long postId) {
        Optional<Post> findPost = postRepository.findById(postId);
        Post post = findPost.orElse(null);
        if (post == null) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("게시글이 존재하지 않습니다.")
                    .build();
        }
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication();
        Member member = principalDetails.getMember();
        if (member.getRole() != Role.ROLE_ADMIN) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("관리자만 삭제할 수 있습니다.")
                    .build();
        }
        postRepository.deleteById(postId);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("삭제완료")
                .body("")
                .build();

    }
}
