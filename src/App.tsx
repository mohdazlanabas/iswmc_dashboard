import React, { useEffect, useState } from "react";
import { DashboardHeader } from "./components/dashboard-header";
import { LorryStatsCard } from "./components/lorry-stats-card";

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
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    // Fetch location data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              if (data && data.address) {
                const city = data.address.city || data.address.town || data.address.village;
                const country = data.address.country;
                setLocation(`${city}, ${country}`);
              } else {
                setLocation("Location not found");
              }
            })
            .catch(() => {
              setLocation("Could not fetch location");
            });
        },
        () => {
          setLocation("Location access denied");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }

    fetch("https://iswmc-backend-532680260027.asia-southeast2.run.app/api/stats/daily")
      .then(res => res.json())
      .then(setDailyData);
    fetch("https://iswmc-backend-532680260027.asia-southeast2.run.app/api/stats/weekly")
      .then(res => res.json())
      .then(setWeeklyData);
    fetch("https://iswmc-backend-532680260027.asia-southeast2.run.app/api/stats/monthly")
      .then(res => res.json())
      .then(setMonthlyData);
    fetch("https://iswmc-backend-532680260027.asia-southeast2.run.app/api/stats/yearly")
      .then(res => res.json())
      .then(setYearlyData);
  }, []);

  if (!dailyData || !weeklyData || !monthlyData || !yearlyData) {
    return <div>Loading...</div>;
  }

  // Helper functions to calculate totals
  const getTotalTonnage = (data: TruckData[]) =>
    data.reduce((sum, t) => sum + t.tonnage, 0);
  const getTotalLorries = (data: TruckData[]) =>
    data.reduce((sum, t) => sum + t.trips, 0);

  const lorryTypes: { [key: string]: { capacity: number; color: string } } = {
    Truck: { capacity: 5, color: '#059669' },
    Roro: { capacity: 5, color: '#10b981' },
    Tipper: { capacity: 1.5, color: '#34d399' },
    Compactor: { capacity: 9, color: '#6ee7b7' },
    Lifter: { capacity: 2, color: '#f59e42' },
    Dumper: { capacity: 8, color: '#f472b6' },
  };

  const transformData = (data: TruckData[]) => {
    return data.map(item => {
      const typeInfo = lorryTypes[item.truckType] || { capacity: 0, color: '#cccccc' };
      return {
        type: item.truckType === 'Truck' ? 'Dump' : item.truckType,
        count: item.trips,
        tonnage: item.tonnage,
        capacity: typeInfo.capacity,
        color: typeInfo.color,
      };
    });
  };

  return (
    <div className="h-[95vh] bg-green-25 bg-gradient-to-br from-green-50 to-white">
      <DashboardHeader />
      <div className="p-2">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mt-2">
          {/* Daily Stats */}
          <LorryStatsCard
            title="Daily Operations"
            period={dailyData.period}
            data={transformData(dailyData.data)}
            totalTonnage={getTotalTonnage(dailyData.data)}
            totalLorries={getTotalLorries(dailyData.data)}
          />
          {/* Weekly Stats */}
          <LorryStatsCard
            title="Weekly Operations"
            period={weeklyData.period}
            data={transformData(weeklyData.data)}
            totalTonnage={getTotalTonnage(weeklyData.data)}
            totalLorries={getTotalLorries(weeklyData.data)}
          />
          {/* Monthly Stats */}
          <LorryStatsCard
            title="Monthly Operations"
            period={monthlyData.period}
            data={transformData(monthlyData.data)}
            totalTonnage={getTotalTonnage(monthlyData.data)}
            totalLorries={getTotalLorries(monthlyData.data)}
          />
          {/* Yearly Stats */}
          <LorryStatsCard
            title="Yearly Operations"
            period={yearlyData.period}
            data={transformData(yearlyData.data)}
            totalTonnage={getTotalTonnage(yearlyData.data)}
            totalLorries={getTotalLorries(yearlyData.data)}
          />
        </div>
        {/* Footer */}
        <div className="mt-2 text-center text-green-600 text-xs">
          <p>Integrated Solid Waste Management Center • Operations: 1st January 2025 - 31st December 2050 • Dashboard refreshes automatically • Data sourced from PostgreSQL Weight Bridge System {location && `• Location: ${location}`} • Developed by net1io.com</p>
        </div>
      </div>
    </div>
  );
}