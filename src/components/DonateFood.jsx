import { useState } from "react";
import { donateFood } from "../services/foodService";

function DonateFood({ refreshFoods }) {

  const [food, setFood] = useState({
    foodName: "",
    quantity: "",
    location: "",
    expiryTime: ""
  });

  const submit = async () => {

    await donateFood(food);

    alert("Food donated successfully");

    setFood({
      foodName: "",
      quantity: "",
      location: "",
      expiryTime: ""
    });

    refreshFoods(); // reload food list

  };

  return (
    <div>

      <h2>Donate Food</h2>

      <input
        placeholder="Food Name"
        value={food.foodName}
        onChange={(e) => setFood({ ...food, foodName: e.target.value })}
      />

      <input
        placeholder="Quantity"
        value={food.quantity}
        onChange={(e) => setFood({ ...food, quantity: e.target.value })}
      />

      <input
        placeholder="Location"
        value={food.location}
        onChange={(e) => setFood({ ...food, location: e.target.value })}
      />

      <button onClick={submit}>Donate</button>

    </div>
  );
}

export default DonateFood;