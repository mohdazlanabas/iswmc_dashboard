import React, { useEffect, useState } from "react";
import { DashboardHeader } from "./components/dashboard-header";
import { TruckStatsCard } from "./components/truck-stats-card";

// Types for backend data
interface TruckData {
  truckId: number;
  truckType: string;
  tonnage: number;
  trips: number;
}
interface StatsResponse {
  period: string;
  data: TruckData[];
}

export default function App() {
  const [dailyData, setDailyData] = useState(null as StatsResponse | null);
  const [weeklyData, setWeeklyData] = useState(null as StatsResponse | null);
  const [monthlyData, setMonthlyData] = useState(null as StatsResponse | null);
  const [yearlyData, setYearlyData] = useState(null as StatsResponse | null);

  useEffect(() => {
    fetch("http://localhost:4000/api/stats/daily")
      .then(res => res.json())
      .then(setDailyData);
    fetch("http://localhost:4000/api/stats/weekly")
      .then(res => res.json())
      .then(setWeeklyData);
    fetch("http://localhost:4000/api/stats/monthly")
      .then(res => res.json())
      .then(setMonthlyData);
    fetch("http://localhost:4000/api/stats/yearly")
      .then(res => res.json())
      .then(setYearlyData);
  }, []);

  if (!dailyData || !weeklyData || !monthlyData || !yearlyData) {
    return <div>Loading...</div>;
  }

  // Helper functions to calculate totals
  const getTotalTonnage = (data: TruckData[]) =>
    data.reduce((sum, t) => sum + t.tonnage, 0);
  const getTotalTrucks = (data: TruckData[]) =>
    data.reduce((sum, t) => sum + t.trips, 0);

  return (
    <div className="h-[95vh] bg-green-25 bg-gradient-to-br from-green-50 to-white">
      <DashboardHeader />
      <div className="p-2">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mt-2">
          {/* Daily Stats */}
          <TruckStatsCard
            title="Daily Operations"
            period={dailyData.period}
            data={dailyData.data}
            totalTonnage={getTotalTonnage(dailyData.data)}
            totalTrucks={getTotalTrucks(dailyData.data)}
          />
          {/* Weekly Stats */}
          <TruckStatsCard
            title="Weekly Operations"
            period={weeklyData.period}
            data={weeklyData.data}
            totalTonnage={getTotalTonnage(weeklyData.data)}
            totalTrucks={getTotalTrucks(weeklyData.data)}
          />
          {/* Monthly Stats */}
          <TruckStatsCard
            title="Monthly Operations"
            period={monthlyData.period}
            data={monthlyData.data}
            totalTonnage={getTotalTonnage(monthlyData.data)}
            totalTrucks={getTotalTrucks(monthlyData.data)}
          />
          {/* Yearly Stats */}
          <TruckStatsCard
            title="Yearly Operations"
            period={yearlyData.period}
            data={yearlyData.data}
            totalTonnage={getTotalTonnage(yearlyData.data)}
            totalTrucks={getTotalTrucks(yearlyData.data)}
          />
        </div>
        {/* Footer */}
        <div className="mt-2 text-center text-green-600 text-xs">
          <p>Integrated Solid Waste Management Center • Operations: 1st January 2025 - 31st December 2050 • Dashboard refreshes automatically • Data sourced from PostgreSQL Weight Bridge System • Developed by net1io.com</p>
        </div>
      </div>
    </div>
  );
}