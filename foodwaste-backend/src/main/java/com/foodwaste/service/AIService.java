package com.foodwaste.service;

import com.foodwaste.model.Food;
import com.foodwaste.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIService {

    @Autowired
    private FoodRepository foodRepository;

    public Map<String, Object> getInsights() {
        Map<String, Object> insights = new HashMap<>();
        List<Food> allFoods = foodRepository.findAll();
        
        // 1. Prediction: Which food items are likely to be wasted (expiring in < 5 hours)
        long expiringSoon = allFoods.stream()
            .filter(Food::isAvailable)
            .filter(f -> f.getExpiryTime() != null && f.getExpiryTime().isBefore(LocalDateTime.now().plusHours(5)))
            .count();
        insights.put("expiringSoonCount", expiringSoon);
        insights.put("prediction", expiringSoon > 0 ? "High risk of waste: " + expiringSoon + " items expiring soon." : "Low waste risk.");

        // 2. Smart Insight: Suggest donation time
        insights.put("suggestion", "Donate prepared food within 4 hours. Historical data suggests NGO requests peak between 7 PM – 10 PM. Maximize your impact by donating before dinner time.");

        return insights;
    }
}
