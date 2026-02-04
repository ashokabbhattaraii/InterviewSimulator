"use client";

import React from "react";
import { Users, Target, TrendingUp } from "lucide-react";

interface StatsData {
  totalMembers: number;
  totalAttempts: number;
  successRate: number;
}

export default function Stats(totalUsers: { totalUsers: number }) {
  // Sample data - replace with actual data from API/database
  const stats: StatsData = {
    totalMembers: totalUsers.totalUsers,
    totalAttempts: 5840,
    successRate: 78.5,
  };

  const StatCard = ({
    icon: Icon,
    label,
    value,
    unit,
    color,
  }: {
    icon: React.ComponentType<{ className: string }>;
    label: string;
    value: number | string;
    unit?: string;
    color: string;
  }) => (
    <div className="bg-background rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      <p className="text-foreground text-sm font-semibold mb-3 tracking-wide">
        {label}
      </p>

      <div className="flex items-baseline gap-2">
        <p className="text-4xl font-bold text-primary">{value}</p>
        {unit && (
          <span className="text-xl font-semibold text-gray-500">{unit}</span>
        )}
      </div>

      <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full`}
          style={{ width: "85%" }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="w-full py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Our Impact
          </h2>
          <p className="text-gray-400 text-lg">
            Join thousands of successful candidates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            icon={Users}
            label="Total Members"
            value={stats.totalMembers}
            color="bg-blue-500"
          />
          <StatCard
            icon={Target}
            label="Total Attempts"
            value={stats.totalAttempts}
            color="bg-purple-500"
          />
          <StatCard
            icon={TrendingUp}
            label="Success Rate"
            value={stats.successRate}
            unit="%"
            color="bg-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}
