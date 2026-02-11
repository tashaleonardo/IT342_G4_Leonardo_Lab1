package com.leonardo.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootTestController {
    @GetMapping("/root-test")
    public String test() {
        return "ROOT CONTROLLER WORKS!";
    }
}
