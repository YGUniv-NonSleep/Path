package com.capstone.pathproject.domain.company;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum CompCategory {
    CONVENIENCESTORE, CAFE, RESTAURANT, MART, HOSPITAL, PHARMACY;

    @JsonCreator
    public static CompCategory from(String s) {
        return CompCategory.valueOf(s.toUpperCase());
    }
}
