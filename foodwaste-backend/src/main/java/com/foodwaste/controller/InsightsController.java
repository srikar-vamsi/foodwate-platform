package com.foodwaste.controller;

import com.foodwaste.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/insights")
public class InsightsController {

    @Autowired
    private AIService aiService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAIInsights() {
        return ResponseEntity.ok(aiService.getInsights());
    }
}
