package com.leonardo.backend.service;

import com.leonardo.backend.dto.AuthResponse;
import com.leonardo.backend.dto.LoginRequest;
import com.leonardo.backend.dto.RegisterRequest;
import com.leonardo.backend.entity.User;
import com.leonardo.backend.entity.UserRole;
import com.leonardo.backend.repository.UserRepository;
import com.leonardo.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        // Hash password with BCrypt
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        // Create user with role USER
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(hashedPassword);
        user.setFullName(request.getFullName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(UserRole.USER);
        user.setIsActive(true);
        user.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(savedUser.getEmail());

        return AuthResponse.builder()
                .token(token)
                .email(savedUser.getEmail())
                .fullName(savedUser.getFullName())
                .role(savedUser.getRole().name())
                .userId(savedUser.getUserId())
                .expiresIn(36000000L)  // 10 hours in milliseconds
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        // Update last login
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().name())
                .userId(user.getUserId())
                .expiresIn(36000000L)
                .build();
    }

    public User getProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
    
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }
}
