package com.capstone.pathproject.dto.carpool;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class CarPostRequestCreateDto {

    @NotNull
    private Long postId;
    private String content;
    @NotNull
    private int price;
    @NotNull
    private String startLongitude;
    @NotNull
    private String startLatitude;
    @NotNull
    private String arriveLongitude;
    @NotNull
    private String arriveLatitude;
    @NotNull
    private int passenger;
    private String approval;

}
