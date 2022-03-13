package com.capstone.pathproject.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Message<T> {
    private StatusEnum header;
    private String message;
    private T body;

    @Builder(builderMethodName = "createMessage")
    public Message(StatusEnum header, String message, T body) {
        this.header = header;
        this.message = message;
        this.body = body;
    }
}
