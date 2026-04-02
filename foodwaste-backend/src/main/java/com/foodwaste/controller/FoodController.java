package com.foodwaste.controller;

import com.foodwaste.model.Food;
import com.foodwaste.model.User;
import com.foodwaste.repository.UserRepository;
import com.foodwaste.security.UserDetailsImpl;
import com.foodwaste.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    @PreAuthorize("hasRole('DONOR') or hasRole('ADMIN')")
    public ResponseEntity<?> addFood(@RequestBody Food food, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User donor = userRepository.findById(userDetails.getId()).orElse(null);
        
        if (donor == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        
        food.setDonor(donor);
        Food savedFood = foodService.addFood(food);
        return ResponseEntity.ok(savedFood);
    }

    @GetMapping("/available")
    @PreAuthorize("hasRole('NGO') or hasRole('ADMIN')")
    public ResponseEntity<List<Food>> getAvailableFood() {
        return ResponseEntity.ok(foodService.getAllAvailableFood());
    }

    @GetMapping("/my-food")
    @PreAuthorize("hasRole('DONOR')")
    public ResponseEntity<List<Food>> getMyFood(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(foodService.getFoodByDonor(userDetails.getId()));
    }
}
