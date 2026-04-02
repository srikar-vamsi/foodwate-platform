package com.foodwaste.repository;

import com.foodwaste.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByIsAvailableTrue();
    List<Food> findByDonorId(Long donorId);
}
