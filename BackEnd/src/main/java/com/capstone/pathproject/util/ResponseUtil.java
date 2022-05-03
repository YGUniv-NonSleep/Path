package com.capstone.pathproject.util;

import com.capstone.pathproject.dto.response.Message;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class ResponseUtil {

    public ResponseEntity<Message<?>> createResponseEntity(Message<?> message) {
        int statusCode = message.getHeader().getStatusCode();
        HttpStatus status;
        switch (statusCode) {
            case 400:
                status = HttpStatus.BAD_REQUEST;
                break;
            case 401:
                status = HttpStatus.UNAUTHORIZED;
                break;
            case 404:
                status = HttpStatus.NOT_FOUND;
                break;
            case 500:
                status = HttpStatus.INTERNAL_SERVER_ERROR;
                break;
            default:
                status = HttpStatus.OK;
                break;
        }
        return new ResponseEntity<>(message, status);
    }
}
