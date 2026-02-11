package com.leonardo.backend.controller;

import com.leonardo.backend.entity.User;
import com.leonardo.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {
    
    private final AuthService authService;
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> getProfile(Authentication authentication) {
        // Only authenticated users can access this
        String email = (String) authentication.getPrincipal();
        User user = authService.getProfile(email);
        
        return ResponseEntity.ok(Map.of(
            "userId", user.getUserId(),
            "email", user.getEmail(),
            "fullName", user.getFullName(),
            "phoneNumber", user.getPhoneNumber(),
            "role", user.getRole().name()
        ));
    }
}
