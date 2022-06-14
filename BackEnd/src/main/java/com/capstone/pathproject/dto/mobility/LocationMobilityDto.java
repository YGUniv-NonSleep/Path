package com.capstone.pathproject.dto.mobility;

import com.capstone.pathproject.domain.mobility.Mobility;
import com.capstone.pathproject.domain.mobility.MobilityState;
import com.capstone.pathproject.domain.mobility.MobilityType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LocationMobilityDto {
    private Long id;
    private int battery;
    private double longitude;
    private double latitude;
    private MobilityState state;
    private MobilityType type;
    private LocationMobilityCompanyDto mobilityCompany;

    public LocationMobilityDto(Mobility mobility) {
        this.id = mobility.getId();
        this.mobilityCompany = new LocationMobilityCompanyDto(mobility.getMobilityCompany());
        this.battery = mobility.getBattery();
        this.longitude = mobility.getLongitude();
        this.latitude = mobility.getLatitude();
        this.state = mobility.getState();
        this.type = mobility.getType();
    }
}
