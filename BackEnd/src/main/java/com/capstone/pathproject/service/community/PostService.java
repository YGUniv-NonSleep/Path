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

        List<Post> findPost = postRepository.findByParentIsNullAndType(type,pageable);
        ArrayList<PostDto> listPost = new ArrayList<PostDto>();
        findPost.stream().map(post -> new PostDto(post)).forEach(postDto -> listPost.add(postDto));

        return Message.<List<PostDto>>builder()
                .header(StatusEnum.OK)
                .message("์กฐํ์๋ฃ")
                .body(listPost).build();
    }



    public Message<PostDto> getReplyList(Long id) {
        Optional<Post> findPost = postRepository.findByParentId(id);
        System.out.println(findPost.toString());
        Post post = findPost.orElse(null);

        if (post == null) {
            return Message.<PostDto>builder()
                    .header(StatusEnum.OK)
                    .message("๋ต๊ธ์ด ์์ต๋๋ค.")
                    .build();
        }

        PostDto postDto = PostDto.createPostDto()
                .id(post.getId())
                .content(post.getContent())
                .view(post.getView())
                .photoName(post.getPhotoName())
                .type(post.getType())
                .title(post.getTitle())
                .loginId(post.getCreatedBy())
                .date(post.getCreatedDateTime())
                .build();


        //๋ณด์ฌ์ค์ผํจ
        return Message.<PostDto>builder()
                .header(StatusEnum.OK)
                .message("์กฐํ์๋ฃ")
                .body(postDto).build();


    }


    public Message<List<PostDto>> search(String keyword, Pageable pageable) {
        List<Post> postList = postRepository.findByTitleContaining(keyword, pageable);
        ArrayList<PostDto> listPDT = new ArrayList<PostDto>();
        postList.stream().map(post -> new PostDto(post)).forEach(postDTO -> listPDT.add(postDTO));

        return Message.<List<PostDto>>builder()
                .header(StatusEnum.OK)
                .message("๊ฒ์์๋ฃ")
                .body(listPDT).build();
    }


    public Message viewParams(Long id) {
        postRepository.updateView(id);
        Optional<Post> post = postRepository.findById(id);
        PostDto postDTO = PostDto.createPostDto()
                .loginId(post.get().getCreatedBy())
                .id(post.get().getId())
                .view(post.get().getView())
                .type(post.get().getType())
                .photoName(post.get().getPhotoName())
                .content(post.get().getContent())
                .title(post.get().getTitle())
                .date(post.get().getCreatedDateTime())
                .build();
        return Message.<PostDto>builder()
                .header(StatusEnum.OK)
                .message("์กฐํ์ ์ฆ๊ฐ์ฑ๊ณต")
                .body(postDTO).build();
    }

    public Message<String> create(CreatePostDto postDto){
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        Optional<Member> findMember = memberRepository.findById(member.getId());

        if(findMember == null){
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("์ฌ์ฉ์ ์์")
                    .body("").build();
        }
        Post post = Post.createPost()
                .member(member)
                .view(0)
                .content(postDto.getContent())
                .photoName(postDto.getPhotoName())
                .type(postDto.getType())
                .title(postDto.getTitle())
                .build();
        postRepository.save(post);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("๋ฑ๋ก์๋ฃ")
                .body("").build();
    }

    public Message<String> update(Long postId, UpdatePostDto postDto){
        Optional<Post> findPost = postRepository.findById(postId);
        Post post = findPost.orElse(null);

        if(post == null) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("์์?ํ? ๊ฒ์๊ธ์ด ์์ต๋๋ค.")
                    .body("").build();
        }
        // ์์ฑ์ ๊ฒ์ฆํ๊ธฐ
        if (!validatePostMember(post.getMember().getLoginId())) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("ํ์ฌ ์ฌ์ฉ์๊ฐ ๊ฒ์๊ธ ์์ฑ์๊ฐ ์๋๋๋ค.")
                    .body("").build();
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
                .message("์์?์ด ์๋ฃ๋์์ต๋๋ค.")
                .body("").build();
    }



    private boolean validatePostMember(String loginId) {
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
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
                    .message("๊ฒ์๊ธ์ด ์กด์ฌํ์ง ์์ต๋๋ค.")
                    .build();
        }
        if (!validatePostMember(post.getMember().getLoginId())) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("ํ์ฌ ์ฌ์ฉ์๊ฐ ๊ฒ์๊ธ ์์ฑ์๊ฐ ์๋๋๋ค.")
                    .body("").build();
        }
        postRepository.deleteById(postId);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("์ญ์?์๋ฃ")
                .body("")
                .build();
    }

      public Message<String> repcreate(ReplyCreatePostDto postDto){

        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();

        if(member.getRole() != Role.ROLE_ADMIN) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("๊ด๋ฆฌ์๋ง ๋ฑ๋กํ? ์ ์์ต๋๋ค.")
                    .build();
        }
        Optional<Post> findPost = postRepository.findById(postDto.getPostId());
        Post post = findPost.orElse(null);
        if(post == null){
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("๊ฒ์๊ธ์ด ์กด์ฌํ์ง ์์ต๋๋ค.")
                    .build();
        }

        Post reply = Post.createPost()
                .type(postDto.getType())
                .member(member)
                .content(postDto.getContent())
                .title(postDto.getTitle())
                .parent(post)
                .photoName(postDto.getPhotoName())
                .build();
          postRepository.save(reply);
          return Message.<String>builder()
                    .header(StatusEnum.OK)
                    .message("๋ฑ๋ก์๋ฃ")
                    .body("").build();
      }

//    public Message<String> repupdate(Long postId, ReplyUpdatePostDto postDto, String fileName) {
//        Optional<Post> findPost = postRepository.findByParentId(postId);
//        Post post = findPost.orElse(null);
//        if (post == null) {
//            return Message.<String>builder()
//                    .header(StatusEnum.BAD_REQUEST)
//                    .message("์์?ํ? ๊ฒ์๊ธ์ด ์์ต๋๋ค.")
//                    .body("").build();
//        }
//        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        Member member = principalDetails.getMember();
//
//        if (member.getRole() != Role.ROLE_ADMIN) {
//            return Message.<String>builder()
//                    .header(StatusEnum.BAD_REQUEST)
//                    .message("๊ด๋ฆฌ์๋ง ๋ฑ๋กํ? ์ ์์ต๋๋ค.")
//                    .build();
//        }
//        if (StringUtils.isNotBlank(postDto.getTitle())) {
//            post.updateTitle(postDto.getTitle());
//        }
//        if (StringUtils.isNotBlank(postDto.getContent())) {
//            post.updateContent(postDto.getContent());
//        }
//        if (StringUtils.isNotBlank(postDto.getPhotoName())) {
//            post.updatePhotoName(postDto.getPhotoName());
//        }
//        post.updateType(postDto.getType());
//
//        return Message.<String>builder()
//                .header(StatusEnum.OK)
//                .message("์์?์ด ์๋ฃ๋์์ต๋๋ค.")
//                .body("").build();
//    }
    public Message<String> repupdate(Long postId, ReplyUpdatePostDto postDto){
        Optional<Post> findPost = postRepository.findByParentId(postId);
        Post post =findPost.orElse(null);
        if (post == null) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("์์?ํ? ๊ฒ์๊ธ์ด ์์ต๋๋ค.")
                    .body("").build();
        }
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();

        if (member.getRole() != Role.ROLE_ADMIN) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("๊ด๋ฆฌ์๋ง ๋ฑ๋กํ? ์ ์์ต๋๋ค.")
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
                .message("์์?์ด ์๋ฃ๋์์ต๋๋ค.")
                .body("").build();
    }


    public Message<String> repdelete(Long postId) {
        Optional<Post> findPost = postRepository.findById(postId);
        Post post = findPost.orElse(null);
        if (post == null) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("๊ฒ์๊ธ์ด ์กด์ฌํ์ง ์์ต๋๋ค.")
                    .build();
        }
        PrincipalDetails principalDetails = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = principalDetails.getMember();
        if (member.getRole() != Role.ROLE_ADMIN) {
            return Message.<String>builder()
                    .header(StatusEnum.BAD_REQUEST)
                    .message("๊ด๋ฆฌ์๋ง ์ญ์?ํ? ์ ์์ต๋๋ค.")
                    .build();
        }
        postRepository.deleteById(postId);
        return Message.<String>builder()
                .header(StatusEnum.OK)
                .message("์ญ์?์๋ฃ")
                .body("")
                .build();

    }
}
