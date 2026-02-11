package com.leonardo.backend.repository;

import com.leonardo.backend.entity.User;
import com.leonardo.backend.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // For login / profile
    Optional<User> findByEmail(String email);

    // For registration check (email unique)
    boolean existsByEmail(String email);

    // For dashboard stats by role (e.g., user count)
    long countByRole(UserRole role);
}
