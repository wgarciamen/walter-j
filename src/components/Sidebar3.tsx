import { Calendar, LayoutDashboard, Settings, Users } from 'lucide-react';
import React from 'react';
import { NavItem } from '../types/dashboard';

const navItems: NavItem[] = [
  { icon: LayoutDashboard, text: 'Dashboard', active: true },
  { icon: Users, text: 'Team' },
  { icon: Calendar, text: 'Schedule' },
  { icon: Settings, text: 'Settings' },
];

export function Sidebar() {
  return (
    <div className="fixed left-0 h-screen w-64 bg-gray-900 text-white p-4">
      <div className="flex items-center gap-2 mb-8">
        <LayoutDashboard className="h-8 w-8 text-indigo-400" />
        <span className="text-xl font-bold">Analytics Pro</span>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon; // Asegúrate de asignar el componente aquí
          return (
            <a
              key={index}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                item.active
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.text}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
