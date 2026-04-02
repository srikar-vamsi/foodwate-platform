import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import api from '../services/api';

export const NgoDashboard = () => {
  const [availableBody, setAvailableBody] = useState([]);

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    try {
      const res = await api.get('/food/available');
      setAvailableBody(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRequest = async (id) => {
    try {
      await api.post(`/donations/request/${id}`);
      alert("Request sent successfully! Pending donor approval.");
      fetchFood();
    } catch (e) {
      alert("Failed to request food");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Donations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableBody.length === 0 ? <p className="text-gray-500 col-span-3">No food available at the moment.</p> : null}
        
        {availableBody.map(food => (
          <Card key={food.id} className="flex flex-col">
            <CardHeader>
              <h3 className="text-lg font-bold text-gray-900">{food.foodName}</h3>
              <span className="text-xs text-emerald-600 font-semibold">{food.category}</span>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
              <p className="text-sm"><strong>Quantity:</strong> {food.quantity} servings</p>
              <p className="text-sm"><strong>Expires:</strong> {new Date(food.expiryTime).toLocaleString()}</p>
              <p className="text-sm"><strong>Donor Info:</strong> {food.donor?.name || 'Anonymous'}</p>
            </CardContent>
            <div className="p-4 bg-gray-50 border-t border-gray-100 mt-auto">
              <Button onClick={() => handleRequest(food.id)} className="w-full">Request Food</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NgoDashboard;
