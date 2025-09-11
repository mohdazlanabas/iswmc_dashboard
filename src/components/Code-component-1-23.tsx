// Mock data generator for waste management dashboard

export interface LorryType {
  type: string;
  capacity: number;
  color: string;
}

export const lorryTypes: LorryType[] = [
  { type: 'Dump', capacity: 5, color: '#059669' },
  { type: 'Roro', capacity: 5, color: '#10b981' },
  { type: 'Tipper', capacity: 1.5, color: '#34d399' },
  { type: 'Compactor', capacity: 9, color: '#6ee7b7' },
  { type: 'Lifter', capacity: 2, color: '#f59e42' },
  { type: 'Dumper', capacity: 8, color: '#f472b6' }
];

export interface LorryData {
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

export function generateDailyData(): LorryData[] {
  return lorryTypes.map(lorry => {
    const count = generateRandomCount(30); // Base 30 lorries per day per type
    const tonnage = count * lorry.capacity * (0.8 + Math.random() * 0.4); // 80-120% capacity utilization
    return {
      type: lorry.type,
      count,
      tonnage,
      capacity: lorry.capacity,
      color: lorry.color
    };
  });
}

export function generateWeeklyData(): LorryData[] {
  return lorryTypes.map(lorry => {
    const count = generateRandomCount(210); // Base 30 * 7 lorries per week per type
    const tonnage = count * lorry.capacity * (0.8 + Math.random() * 0.4);
    return {
      type: lorry.type,
      count,
      tonnage,
      capacity: lorry.capacity,
      color: lorry.color
    };
  });
}

export function generateMonthlyData(): LorryData[] {
  return lorryTypes.map(lorry => {
    const count = generateRandomCount(900); // Base 30 * 30 lorries per month per type
    const tonnage = count * lorry.capacity * (0.8 + Math.random() * 0.4);
    return {
      type: lorry.type,
      count,
      tonnage,
      capacity: lorry.capacity,
      color: lorry.color
    };
  });
}

export function generateYearlyData(): LorryData[] {
  return lorryTypes.map(lorry => {
    const count = generateRandomCount(10950); // Base 30 * 365 lorries per year per type
    const tonnage = count * lorry.capacity * (0.8 + Math.random() * 0.4);
    return {
      type: lorry.type,
      count,
      tonnage,
      capacity: lorry.capacity,
      color: lorry.color
    };
  });
}

export function calculateTotals(data: LorryData[]) {
  return {
    totalLorries: data.reduce((sum, lorry) => sum + lorry.count, 0),
    totalTonnage: data.reduce((sum, lorry) => sum + lorry.tonnage, 0)
  };
}