package com.capstone.pathproject.dto.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Message {
    private StatusEnum status;
    private String message;
    private Object data;


    public Message(StatusEnum status, String message, Object data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
