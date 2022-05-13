package com.capstone.pathproject.controller;

import com.capstone.pathproject.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UtilApiController {

    private final FileUtil fileUtil;

    @ResponseBody
    @GetMapping("/image/{imageName}")
    public Resource downloadImage(@PathVariable String imageName) throws MalformedURLException {
        return new UrlResource("file:" + fileUtil.getFullPath(imageName));
    }

    @PostMapping("/image")
    public ResponseEntity<String> saveImage(@RequestParam("multipartFile") MultipartFile multipartFile){
        String fileName = fileUtil.storeFile(multipartFile);
        return new ResponseEntity<>(fileName, HttpStatus.OK);
    }
}
