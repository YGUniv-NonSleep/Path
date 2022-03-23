package com.capstone.pathproject.dto.response;

import lombok.*;
import org.springframework.http.HttpStatus;

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

    public HttpStatus getHttpStatus() {
        HttpStatus httpStatus;
        if (getHeader() == StatusEnum.OK) {
            httpStatus = HttpStatus.OK;
        } else if (getHeader() == StatusEnum.BAD_REQUEST) {
            httpStatus = HttpStatus.BAD_REQUEST;
        } else if (getHeader() == StatusEnum.NOT_FOUND) {
            httpStatus = HttpStatus.NOT_FOUND;
        } else {
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return httpStatus;
    }
}
