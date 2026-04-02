function FoodList({ foods }) {

  if (!Array.isArray(foods)) {
    return <p>Loading donations...</p>;
  }

  return (
    <div>

      <h2>Available Donations</h2>

      {foods.length === 0 ? (
        <p>No donations available</p>
      ) : (
        foods.map((food) => (
          <div key={food.id}>
            <p>
              <b>{food.foodName}</b> | Quantity: {food.quantity} | Location: {food.location}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default FoodList;