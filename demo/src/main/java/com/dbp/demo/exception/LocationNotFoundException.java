package com.dbp.demo.exception;


import java.lang.RuntimeException;
public class LocationNotFoundException extends RuntimeException {
    public LocationNotFoundException(String message) {
        super(message);
    }
}
