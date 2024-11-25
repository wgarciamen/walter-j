import { BarChart3, DollarSign, TrendingUp, Users2 } from 'lucide-react';
import React, { useState } from 'react';
import { RecentActivity } from '../../components/RecentActivity';
import { SearchHeader } from '../../components/SearchHeader';
import { Sidebar } from '../../components/Sidebar3';
import { StatCard } from '../../components/StatCard';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64 p-8">
        <SearchHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={TrendingUp} 
            title="Total Revenue" 
            value="$84,254" 
            trend={8.2} 
          />
          <StatCard 
            icon={Users2} 
            title="Active Users" 
            value="2,420" 
            trend={5.1} 
          />
          <StatCard 
            icon={DollarSign} 
            title="Average Order" 
            value="$1,230" 
            trend={-2.3} 
          />
          <StatCard 
            icon={BarChart3} 
            title="Conversion Rate" 
            value="2.4%" 
            trend={4.7} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart visualization would go here</p>
            </div>
          </div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default App;