package com.foodwaste.service;

import com.foodwaste.model.Donation;
import com.foodwaste.model.Request;
import com.foodwaste.model.RequestStatus;
import com.foodwaste.repository.DonationRepository;
import com.foodwaste.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private RequestRepository requestRepository;

    public Request requestFood(Request request) {
        return requestRepository.save(request);
    }

    public Donation approveRequest(Long requestId) {
        Request request = requestRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(RequestStatus.APPROVED);
        requestRepository.save(request);

        // Create a donation record
        Donation donation = new Donation();
        donation.setFood(request.getFood());
        donation.setDonor(request.getFood().getDonor());
        donation.setNgo(request.getNgo());
        donation.setStatus(RequestStatus.COMPLETED);
        donation.setCompletedAt(LocalDateTime.now());
        
        // Mark food as not available
        request.getFood().setAvailable(false);
        
        return donationRepository.save(donation);
    }
}
