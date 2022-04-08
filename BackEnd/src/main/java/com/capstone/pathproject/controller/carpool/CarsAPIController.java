package com.capstone.pathproject.controller.carpool;


import com.capstone.pathproject.dto.carpool.CarPostDTO;
import com.capstone.pathproject.dto.carpool.CarsDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.carpool.CarsService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarsAPIController {
    private final CarsService carsService;


    //CRUD
    @PostMapping("/create")
    public ResponseEntity<Message<CarsDTO>> create(@RequestPart(value = "key",required = false)CarsDTO carsDTO,
                                                   @RequestPart(value = "userfile",required = false)MultipartFile file,
                                                   HttpServletRequest request){
        String fileName;
        if(file == null){
            fileName = "";
        }else{
            fileName = file.getOriginalFilename();
            String filePath = request.getSession().getServletContext().getRealPath("") + "cars\\";

            try {
                file.transferTo(new File(filePath + fileName));
            }catch(IllegalStateException | IOException e){
                e.printStackTrace();
            }
        }
        Message<CarsDTO> message = carsService.create(carsDTO, fileName);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


    @PatchMapping("/update")
    public ResponseEntity<Message<CarsDTO>> update(@RequestPart(value = "key",required = false)CarsDTO carsDTO,
                                          @RequestPart(value = "userfile",required = false)MultipartFile file,
                                          HttpServletRequest request){
        String fileName;
        if(file == null){
            fileName = "";
        }else{
            fileName = file.getOriginalFilename();
            String filePath = request.getSession().getServletContext().getRealPath("") + "cars\\";
            try {
                file.transferTo(new File(filePath + fileName));
            }catch(IllegalStateException | IOException e){
                e.printStackTrace();
            }
        }
        Message<CarsDTO> message = carsService.update(carsDTO,fileName);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Message<CarsDTO>> delete(@RequestParam("carsId")Long carsId){
        Message<CarsDTO> message = carsService.delete(carsId);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }


    //view
    @GetMapping("/view")
    public ResponseEntity findview(@PageableDefault(size = 5,sort = "id",
                                    direction = Sort.Direction.DESC)Pageable pageable){
     Message<List<CarsDTO>> message = carsService.findview(pageable);
     return new ResponseEntity<>(message,HttpStatus.OK);
    }
    @GetMapping("/view/search")
    public ResponseEntity search(String keyword,@PageableDefault(size = 5,sort = "id",direction = Sort.Direction.DESC)Pageable pageable){
        Message<List<CarsDTO>> message = carsService.search(keyword,pageable);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }
}
