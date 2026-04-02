package com.foodwaste.controller;

import com.foodwaste.model.Donation;
import com.foodwaste.model.Request;
import com.foodwaste.model.User;
import com.foodwaste.repository.FoodRepository;
import com.foodwaste.repository.UserRepository;
import com.foodwaste.security.UserDetailsImpl;
import com.foodwaste.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/donations")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;

    @PostMapping("/request/{foodId}")
    @PreAuthorize("hasRole('NGO')")
    public ResponseEntity<?> requestFood(@PathVariable Long foodId, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User ngo = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("NGO not found"));
        
        Request request = new Request();
        request.setFood(foodRepository.findById(foodId)
                .orElseThrow(() -> new RuntimeException("Food not found")));
        request.setNgo(ngo);
        
        Request savedRequest = donationService.requestFood(request);
        return ResponseEntity.ok(savedRequest);
    }

    @PostMapping("/approve/{requestId}")
    @PreAuthorize("hasRole('DONOR') or hasRole('ADMIN')")
    public ResponseEntity<?> approveRequest(@PathVariable Long requestId) {
        Donation donation = donationService.approveRequest(requestId);
        return ResponseEntity.ok(donation);
    }
}
