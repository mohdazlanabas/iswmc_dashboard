import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface LorryData {
  type: string;
  count: number;
  tonnage: number;
  capacity: number;
  color: string;
}

interface LorryStatsCardProps {
  title: string;
  period: string;
  data: LorryData[];
  totalTonnage: number;
  totalLorries: number;
}

export function LorryStatsCard({ title, period, data, totalTonnage, totalLorries }: LorryStatsCardProps) {
  return (
    <Card className="bg-green-50/50 border-green-200">
      <CardHeader className="bg-green-100 border-b border-green-200">
        <CardTitle className="text-green-800 flex items-center justify-between">
          <span>{title}</span>
          <span className="text-sm font-normal text-green-600">{period}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Summary Stats */}
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 border border-green-200">
              <p className="text-sm text-green-600">Total Lorry</p>
              <p className="text-2xl font-semibold text-green-800">{totalLorries}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-green-200">
              <p className="text-sm text-green-600">Total Tonnage</p>
              <p className="text-2xl font-semibold text-green-800">{totalTonnage.toFixed(1)} tons</p>
            </div>
            
            {/* Truck Type Breakdown */}
            <div className="space-y-2">
              {data.map((lorry) => (
                <div key={lorry.type} className="bg-white rounded p-2 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-800">{lorry.type}</span>
                    <span className="text-sm text-green-600">{lorry.count} lorries</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-green-600">
                    <span>{lorry.capacity} ton capacity</span>
                    <span>{lorry.tonnage.toFixed(1)} tons</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Truck Count Chart */}
          <div className="bg-white rounded-lg p-3 border border-green-200">
            <h4 className="text-sm font-medium text-green-800 mb-3">Truck Count by Type</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="type" tick={{ fontSize: 12 }} stroke="#059669" />
                <YAxis tick={{ fontSize: 12 }} stroke="#059669" />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tonnage Distribution Chart */}
          <div className="bg-white rounded-lg p-3 border border-green-200">
            <h4 className="text-sm font-medium text-green-800 mb-3">Tonnage Distribution</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  dataKey="tonnage"
                  label={({ type, tonnage }) => `${type}: ${tonnage.toFixed(1)}t`}
                  labelLine={false}
                  fontSize={10}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}