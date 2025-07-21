import React from 'react';
import { CheckSquare, Clock, TrendingUp } from 'lucide-react';
import { useTaskStore } from '../../stores/taskStores';
import { StatsCard } from './StatsCard';

export const Dashboard: React.FC = () => {
  const { getTaskStats } = useTaskStore();
  const stats = getTaskStats();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          icon={CheckSquare}
          color="bg-blue-500"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon={TrendingUp}
          color="bg-green-500"
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          color="bg-yellow-500"
        />
       
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Task Overview</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Completion Rate</span>
            <span className="font-semibold">
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};