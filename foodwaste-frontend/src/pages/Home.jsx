import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
           Turn surplus into 
          <span className="relative whitespace-nowrap text-emerald-600">
            <span className="relative ml-2">sustenance</span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Connect your restaurant, store, or event with local NGOs to instantly redistribute excess food. 
          Reduce food waste, help communities in need, and track your impact.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Link to="/register"><Button className="px-8 py-3 text-lg">Start Donating</Button></Link>
          <Link to="/login"><Button variant="outline" className="px-8 py-3 text-lg">Partner NGO Login</Button></Link>
        </div>
      </div>

      {/* Feature section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-emerald-600">Impact Driven</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to end food waste
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl lg:max-w-5xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
              <div className="relative pl-0">
                <dt className="text-base font-semibold leading-7 text-gray-900">Real-time availability</dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Donors can post available food instantly, and NGOs get notified within seconds.</dd>
              </div>
              <div className="relative pl-0">
                <dt className="text-base font-semibold leading-7 text-gray-900">AI-Powered Insights</dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Smart waste prediction engine identifies optimal donation times and alerts for expiring food.</dd>
              </div>
              <div className="relative pl-0">
                <dt className="text-base font-semibold leading-7 text-gray-900">Data Dashboards</dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Interactive Chart.js and Recharts visualizations tracking your community impact.</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
