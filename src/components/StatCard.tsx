import React from 'react';
import { StatCardProps } from '../types/dashboard';

export function StatCard({ icon: Icon, title, value, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-lg">
            <Icon className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-semibold mt-1">{value}</p>
          </div>
        </div>
        <span
          className={`text-sm ${
            trend > 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend > 0 ? '+' : ''}
          {trend}%
        </span>
      </div>
    </div>
  );
}
