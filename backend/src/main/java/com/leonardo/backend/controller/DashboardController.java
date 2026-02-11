package com.leonardo.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DashboardController {
    
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        // This endpoint is public - both guests and users can access
        return ResponseEntity.ok(Map.of(
            "message", "Welcome to Dashboard!",
            "data", Map.of(
                "totalUsers", 10,
                "info", "This is accessible to everyone"
            )
        ));
    }
}
