import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Sparkles, AlertTriangle } from 'lucide-react';
import api from '../services/api';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export const AdminDashboard = () => {
  const [insights, setInsights] = useState({});

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await api.get('/insights');
        setInsights(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchInsights();
  }, []);

  // Mock data for visualizations since backend currently doesn't aggregate these natively
  // In a real scenario, these would come from the backend's analytics endpoint
  const data = [
    { name: 'Mon', donations: 4000, requests: 2400 },
    { name: 'Tue', donations: 3000, requests: 1398 },
    { name: 'Wed', donations: 2000, requests: 9800 },
    { name: 'Thu', donations: 2780, requests: 3908 },
    { name: 'Fri', donations: 1890, requests: 4800 },
    { name: 'Sat', donations: 2390, requests: 3800 },
    { name: 'Sun', donations: 3490, requests: 4300 },
  ];

  const pieData = [
    { name: 'Cooked Food', value: 400 },
    { name: 'Raw Ingredients', value: 300 },
    { name: 'Packaged Goods', value: 300 },
    { name: 'Bakery', value: 200 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-gray-900">Platform Analytics</h2>
      </div>

      {/* AI Insights Widget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Sparkles className="text-indigo-600 w-5 h-5" />
            <h3 className="font-bold text-indigo-900">AI Smart Suggestion</h3>
          </CardHeader>
          <CardContent>
            <p className="text-indigo-800 text-sm leading-relaxed">
              {insights.suggestion || 'Loading insights from AI engine...'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-100">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <AlertTriangle className="text-orange-600 w-5 h-5" />
            <h3 className="font-bold text-orange-900">Waste Prediction Alert</h3>
          </CardHeader>
          <CardContent>
            <p className="text-orange-800 text-sm font-medium">
              {insights.prediction || 'Loading waste prediction...'}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-xs font-bold">
                {insights.expiringSoonCount || 0} ITEMS AT RISK
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><h3 className="font-bold">Donations vs Requests (Weekly)</h3></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="donations" fill="#10b981" />
                <Bar dataKey="requests" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><h3 className="font-bold">Food Category Distribution</h3></CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
