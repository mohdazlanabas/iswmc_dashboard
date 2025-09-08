import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface TruckData {
  type: string;
  count: number;
  tonnage: number;
  capacity: number;
  color: string;
}

interface TruckStatsCardProps {
  title: string;
  period: string;
  data: TruckData[];
  totalTonnage: number;
  totalTrucks: number;
}

export function TruckStatsCard({ title, period, data, totalTonnage, totalTrucks }: TruckStatsCardProps) {
  return (
    <Card className="bg-green-50/50 border-green-200">
      <CardHeader className="bg-green-100 border-b border-green-200 p-1.5">
        <CardTitle className="text-green-800 flex items-center justify-between text-sm">
          <span>{title}</span>
          <span className="text-xs font-normal text-green-600">{period}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1.5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
          {/* Summary Stats */}
          <div className="space-y-1">
            <div className="bg-white rounded p-1.5 border border-green-200">
              <p className="text-xs text-green-600">Total Trucks</p>
              <p className="text-base font-semibold text-green-800">{totalTrucks}</p>
            </div>
            <div className="bg-white rounded p-1.5 border border-green-200">
              <p className="text-xs text-green-600">Total Tonnage</p>
              <p className="text-base font-semibold text-green-800">{Math.round(totalTonnage)} tons</p>
            </div>
            
            {/* Truck Type Breakdown */}
            <div className="space-y-1">
              {data.map((truck) => (
                <div key={truck.type} className="bg-white rounded p-1.5 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-green-800">{truck.type}</span>
                    <span className="text-xs text-green-600">{truck.count} trucks</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-green-600">
                    <span>{truck.capacity}t capacity</span>
                    <span>{Math.round(truck.tonnage)}t</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Charts */}
          <div className="bg-white rounded p-1.5 border border-green-200">
            {/* Truck Count Chart */}
            <div className="mb-1.5">
              <h4 className="text-xs font-medium text-green-800 mb-0.5">Truck Count by Type</h4>
              <ResponsiveContainer width="100%" height={85}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                  <XAxis dataKey="type" tick={{ fontSize: 8 }} stroke="#059669" />
                  <YAxis tick={{ fontSize: 8 }} stroke="#059669" />
                  <Bar dataKey="count" fill="#10b981" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Tonnage Distribution Chart */}
            <div>
              <h4 className="text-xs font-medium text-green-800 mb-0.5">Tonnage Distribution</h4>
              <ResponsiveContainer width="100%" height={85}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={30}
                    dataKey="tonnage"
                    label={({ type, tonnage }) => `${type}: ${Math.round(tonnage)}t`}
                    labelLine={false}
                    fontSize={6}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}