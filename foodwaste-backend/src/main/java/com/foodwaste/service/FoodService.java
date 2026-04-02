package com.foodwaste.service;

import com.foodwaste.model.Food;
import com.foodwaste.model.Inventory;
import com.foodwaste.repository.FoodRepository;
import com.foodwaste.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    public Food addFood(Food food) {
        Food savedFood = foodRepository.save(food);
        
        // Update Inventory
        Inventory inventory = new Inventory();
        inventory.setFood(savedFood);
        inventory.setQuantity(savedFood.getQuantity());
        inventoryRepository.save(inventory);

        return savedFood;
    }

    public List<Food> getAllAvailableFood() {
        return foodRepository.findByIsAvailableTrue();
    }

    public List<Food> getFoodByDonor(Long donorId) {
        return foodRepository.findByDonorId(donorId);
    }
}
