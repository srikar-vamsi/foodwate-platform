package com.foodwaste.repository;

import com.foodwaste.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Inventory findByFoodId(Long foodId);
}
