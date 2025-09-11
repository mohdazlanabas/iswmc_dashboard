import React from 'react';
import { Card, CardContent } from "./ui/card";
import { Clock } from "lucide-react";

// Function to get the ISO week number
function getWeekOfYear(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}

export function LiveStatus() {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const weekOfYear = getWeekOfYear(now);

  const dateString = now.toLocaleDateString('en-MY', {
    timeZone: 'Asia/Kuala_Lumpur',
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const timeString = now.toLocaleTimeString('en-MY', {
    timeZone: 'Asia/Kuala_Lumpur',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="mb-3">
      <Card className="bg-green-600 text-white border-green-700">
        <CardContent className="p-2">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <div>
              <p className="text-xs opacity-90">Current Time</p>
              <p className="text-sm font-semibold">{`${dateString}, ${timeString}`}</p>
              <p className="text-xs opacity-90">{`Week ${weekOfYear}`}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}