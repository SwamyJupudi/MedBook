package com.dbp.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.dbp.demo.repository.UserRepository;
import com.dbp.demo.model.User;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        User user = userRepository.findByUsernameAndPassword(request.getUsername(), request.getPswd());
        if (user != null) {
            return new LoginResponse("login Success");
        }
        return new LoginResponse(" login Failed");
    }
    @PostMapping("/signup")
    public LoginResponse signup(@RequestBody LoginRequest request) {
        // Check if the username already exists
        if (userRepository.findByUsername(request.getUsername()) != null) {
            return new LoginResponse("Username Already Exists");
        }

        // Save new user
        User newUser = new User(request.getUsername(), request.getPswd());
        userRepository.save(newUser);
        return new LoginResponse("User Registered Successfully");
    }

}

// Request DTO
class LoginRequest {
    private String username;
    private String pswd;


    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPswd() {
        return pswd;
    }
    public void setPswd(String pswd) {
        this.pswd = pswd;
    }
}

// Response DTO
class LoginResponse {
    private String result;

    public LoginResponse(String result) {
        this.result = result;
    }
    public String getResult() {
        return result;
    }
}
