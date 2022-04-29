package com.capstone.pathproject.controller;

import com.capstone.pathproject.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.*;

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


}
