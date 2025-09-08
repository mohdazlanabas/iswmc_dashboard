import { DashboardHeader } from "./components/dashboard-header";
import { TruckStatsCard } from "./components/truck-stats-card";
import { 
  generateDailyData, 
  generateWeeklyData, 
  generateMonthlyData, 
  generateYearlyData,
  calculateTotals 
} from "./components/mock-data";

export default function App() {
  // Generate mock data for all time periods
  const dailyData = generateDailyData();
  const weeklyData = generateWeeklyData();
  const monthlyData = generateMonthlyData();
  const yearlyData = generateYearlyData();

  const dailyTotals = calculateTotals(dailyData);
  const weeklyTotals = calculateTotals(weeklyData);
  const monthlyTotals = calculateTotals(monthlyData);
  const yearlyTotals = calculateTotals(yearlyData);

  const currentDate = new Date();
  const todayString = currentDate.toLocaleDateString('en-MY', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const currentWeek = `Week of ${currentDate.toLocaleDateString('en-MY', { 
    month: 'short', 
    day: 'numeric' 
  })}`;
  
  const currentMonth = currentDate.toLocaleDateString('en-MY', { 
    year: 'numeric', 
    month: 'long' 
  });
  
  const currentYear = currentDate.getFullYear().toString();

  return (
    <div className="min-h-screen bg-green-25 bg-gradient-to-br from-green-50 to-white">
      <DashboardHeader />
      
      <div className="p-2">
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mt-2">
          {/* Daily Stats */}
          <TruckStatsCard
            title="Daily Operations"
            period={todayString}
            data={dailyData}
            totalTonnage={dailyTotals.totalTonnage}
            totalTrucks={dailyTotals.totalTrucks}
          />

          {/* Weekly Stats */}
          <TruckStatsCard
            title="Weekly Operations"
            period={currentWeek}
            data={weeklyData}
            totalTonnage={weeklyTotals.totalTonnage}
            totalTrucks={weeklyTotals.totalTrucks}
          />

          {/* Monthly Stats */}
          <TruckStatsCard
            title="Monthly Operations"
            period={currentMonth}
            data={monthlyData}
            totalTonnage={monthlyTotals.totalTonnage}
            totalTrucks={monthlyTotals.totalTrucks}
          />

          {/* Yearly Stats */}
          <TruckStatsCard
            title="Yearly Operations"
            period={currentYear}
            data={yearlyData}
            totalTonnage={yearlyTotals.totalTonnage}
            totalTrucks={yearlyTotals.totalTrucks}
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