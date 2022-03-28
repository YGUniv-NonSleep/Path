package com.capstone.pathproject.service;


import com.capstone.pathproject.domain.community.Post;
import com.capstone.pathproject.dto.PostDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import com.capstone.pathproject.controller.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    private final PostRepository postRepository;

    @Transactional
    public Page<Post> getPostList(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    @Transactional
    public List<Post> search(String keyword, Pageable pageable) {
        List<Post> postList = postRepository.findByTitleContaining(keyword, pageable);
        return postList;
    }

    @Transactional
    public int updateView(Long id) {
        System.out.println(id);
        return postRepository.updateView(id);
    }


    ///Post Service///
    @Transactional
    public Message<PostDTO> create(PostDTO postDTO, String fileName) {
        PostDTO result = PostDTO.checkPostDTO()
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
            PostDTO updateResult = PostDTO.checkPostDTO()
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


//    public Message<PostDTO> variableGet(Long postId){
//        Optional<Post> result = postRepository.findById(postId);
//        Post get = result.get();
//        PostDTO rs = PostDTO.checkPostDTO()
//                .id(get.getId())
//                .member(get.getMember())
//                .type(get.getType())
//                .parent(get.getParent())
//                .title(get.getTitle())
//                .content(get.getContent())
//                .view(get.getView())
//                .writeDate(get.getWriteDate())
//                .photoPath(get.getPhotoPath())
//                .build();
//
//        Message<PostDTO> pm = Message.<PostDTO>createMessage()
//                .header(StatusEnum.OK)
//                .message("ok")
//                .body(rs).build();
//        return pm;
//    }


    ///답글 SERVICE///
    @Transactional
    public Message<PostDTO> repcreate(PostDTO postDTO, String fileName) {
        //Optional<Post> optionRes = postRepository.findById(postDTO.getParent().getId());
        PostDTO result = PostDTO.checkPostDTO()
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
        System.out.println(fileName);
        postRepository.save(result.toEntity());
        return Message.<PostDTO>createMessage()
                .header(StatusEnum.OK)
                .message("등록완료")
                .body(result).build();
    }


    @Transactional
    public Message<PostDTO> repupdate(PostDTO postDTO, String fileName) {
       // Optional<Post> result = postRepository.findById(postDTO.getParent().getId());
            PostDTO updateResult = PostDTO.checkPostDTO()
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
    }


    @Transactional
    public Message<PostDTO> repdelete(Long postId) {
        Optional<Post> result = postRepository.findById(postId);
        postRepository.deleteById(result.get().getId());
        return Message.<PostDTO>createMessage()
                .header(StatusEnum.OK)
                .message("삭제완료")
                .build();

    }


}
