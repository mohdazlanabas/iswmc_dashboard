// Mock data generator for waste management dashboard

export interface TruckType {
  type: string;
  capacity: number;
  color: string;
}

export const truckTypes: TruckType[] = [
  { type: 'Truck', capacity: 5, color: '#059669' },
  { type: 'Roro', capacity: 5, color: '#10b981' },
  { type: 'Tipper', capacity: 1.5, color: '#34d399' },
  { type: 'Compactor', capacity: 9, color: '#6ee7b7' }
];

export interface TruckData {
  type: string;
  count: number;
  tonnage: number;
  capacity: number;
  color: string;
}

// Generate random data within realistic ranges
function generateRandomCount(base: number, variance: number = 0.3): number {
  const min = Math.floor(base * (1 - variance));
  const max = Math.floor(base * (1 + variance));
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateDailyData(): TruckData[] {
  return truckTypes.map(truck => {
    const count = generateRandomCount(30); // Base 30 trucks per day per type
    const tonnage = count * truck.capacity * (0.8 + Math.random() * 0.4); // 80-120% capacity utilization
    return {
      type: truck.type,
      count,
      tonnage,
      capacity: truck.capacity,
      color: truck.color
    };
  });
}

export function generateWeeklyData(): TruckData[] {
  return truckTypes.map(truck => {
    const count = generateRandomCount(210); // Base 30 * 7 trucks per week per type
    const tonnage = count * truck.capacity * (0.8 + Math.random() * 0.4);
    return {
      type: truck.type,
      count,
      tonnage,
      capacity: truck.capacity,
      color: truck.color
    };
  });
}

export function generateMonthlyData(): TruckData[] {
  return truckTypes.map(truck => {
    const count = generateRandomCount(900); // Base 30 * 30 trucks per month per type
    const tonnage = count * truck.capacity * (0.8 + Math.random() * 0.4);
    return {
      type: truck.type,
      count,
      tonnage,
      capacity: truck.capacity,
      color: truck.color
    };
  });
}

export function generateYearlyData(): TruckData[] {
  return truckTypes.map(truck => {
    const count = generateRandomCount(10950); // Base 30 * 365 trucks per year per type
    const tonnage = count * truck.capacity * (0.8 + Math.random() * 0.4);
    return {
      type: truck.type,
      count,
      tonnage,
      capacity: truck.capacity,
      color: truck.color
    };
  });
}

export function calculateTotals(data: TruckData[]) {
  return {
    totalTrucks: data.reduce((sum, truck) => sum + truck.count, 0),
    totalTonnage: data.reduce((sum, truck) => sum + truck.tonnage, 0)
  };
}