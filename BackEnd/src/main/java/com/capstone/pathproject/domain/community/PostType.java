package com.capstone.pathproject.domain.community;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;


public enum PostType {
    @Enumerated(EnumType.STRING)
    NOTICE, FAQ, COMPLAINT, QNA
}
