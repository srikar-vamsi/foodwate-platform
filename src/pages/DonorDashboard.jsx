import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import api from '../services/api';

export const DonorDashboard = () => {
  const [food, setFood] = useState({ foodName: '', quantity: '', category: 'COOKED_FOOD', expiryTime: '' });
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await api.get('/food/my-food');
      setDonations(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      await api.post('/food/add', {
        ...food,
        expiryTime: new Date(food.expiryTime).toISOString()
      });
      alert('Food added successfully!');
      fetchDonations();
      setFood({ foodName: '', quantity: '', category: 'COOKED_FOOD', expiryTime: '' });
    } catch (e) {
      alert('Failed to add food');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><h3 className="text-xl font-bold">Donate Food</h3></CardHeader>
          <CardContent>
            <form onSubmit={handleAddFood} className="space-y-4">
              <Input label="Food Name" required value={food.foodName} onChange={e => setFood({...food, foodName: e.target.value})} />
              <Input label="Quantity (Servings/Items)" type="number" required value={food.quantity} onChange={e => setFood({...food, quantity: e.target.value})} />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={food.category} 
                  onChange={e => setFood({...food, category: e.target.value})}
                >
                  <option value="COOKED_FOOD">Cooked Food</option>
                  <option value="RAW_INGREDIENTS">Raw Ingredients</option>
                  <option value="PACKAGED_GOODS">Packaged Goods</option>
                  <option value="BAKERY">Bakery</option>
                  <option value="FRUITS_VEG">Fruits & Veg</option>
                </select>
              </div>

              <Input label="Expiry Time" type="datetime-local" required value={food.expiryTime} onChange={e => setFood({...food, expiryTime: e.target.value})} />
              <Button type="submit" className="w-full">Submit Donation</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><h3 className="text-xl font-bold">My Recent Donations</h3></CardHeader>
          <CardContent>
            {donations.length === 0 ? <p className="text-gray-500">No donations yet.</p> : (
              <ul className="divide-y divide-gray-100">
                {donations.map(d => (
                  <li key={d.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{d.foodName}</p>
                      <p className="text-sm text-gray-500">Qty: {d.quantity} • {d.category}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${d.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {d.available ? 'Available' : 'Donated'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonorDashboard;
