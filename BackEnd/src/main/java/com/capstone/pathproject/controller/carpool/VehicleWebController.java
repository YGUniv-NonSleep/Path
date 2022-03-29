package com.capstone.pathproject.controller.carpool;

import com.capstone.pathproject.dto.VehicleDTO;
import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequiredArgsConstructor
public class VehicleWebController {
    @Autowired
    VehicleService vehicleService;

    @GetMapping("/vehicle")
    public String vehicle(){
        return "vehicle";
    }

    @GetMapping("/vehicle/{vehicleId}")
    public String carpostVariable(@PathVariable("vehicleId") Long vehicleId, Model model){
        Message<VehicleDTO> result =  vehicleService.variableGet(vehicleId);
        model.addAttribute("result",result);
        return "carpost";
    }
}
