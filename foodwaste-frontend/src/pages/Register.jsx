import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'DONOR'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await register(formData.name, formData.email, formData.password, formData.role);
      if (user.role === 'ROLE_DONOR') navigate('/donor');
      else if (user.role === 'ROLE_NGO') navigate('/ngo');
      else if (user.role === 'ROLE_ADMIN') navigate('/admin');
      else navigate('/');
    } catch (err) {
      // The API returns simple strings right now for register errors
      setError(typeof err === 'string' ? err : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
        </CardHeader>
        <CardContent>
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" name="name" required value={formData.name} onChange={handleChange} />
            <Input label="Email address" type="email" name="email" required value={formData.email} onChange={handleChange} />
            <Input label="Password" type="password" name="password" required value={formData.password} onChange={handleChange} />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
              <select 
                name="role" 
                value={formData.role} 
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="DONOR">Donor (Restaurant/Individual)</option>
                <option value="NGO">NGO (Receiver)</option>
              </select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">Sign in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
