package com.capstone.pathproject.controller.excpetion;

import com.capstone.pathproject.dto.response.Message;
import com.capstone.pathproject.dto.response.StatusEnum;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApiControllerAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Message<Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors()
                .forEach(c -> errors.put(((FieldError) c).getField(), c.getDefaultMessage()));
        Message<Object> message = Message.builder()
                .header(StatusEnum.BAD_REQUEST)
                .message("유효성 검사 실패")
                .body(errors).build();
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Message<Object>> handleBadCredentialsException(BadCredentialsException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("exception", "BadCredentialsException");
        Message<Object> message = Message.builder()
                .header(StatusEnum.UNAUTHORIZED)
                .message(ex.getMessage())
                .body(errors).build();
        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity<Message<Object>> handleInternalAuthenticationServiceException(InternalAuthenticationServiceException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("exception", "InternalAuthenticationServiceException");
        Message<Object> message = Message.builder()
                .header(StatusEnum.UNAUTHORIZED)
                .message(ex.getMessage())
                .body(errors).build();
        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccountExpiredException.class)
    public ResponseEntity<Message<Object>> handleRefreshTokenValidException(AccountExpiredException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("exception", "AccountExpiredException");
        Message<Object> message = Message.builder()
                .header(StatusEnum.UNAUTHORIZED)
                .message(ex.getMessage())
                .body(errors).build();
        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }
}
