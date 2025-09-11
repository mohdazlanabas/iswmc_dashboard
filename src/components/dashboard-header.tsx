import greenviroLogo from 'figma:asset/abd5d5eea1307fcc79f39cc60c9db3d9f29b26e8.png';
import mbspLogo from 'figma:asset/df0afb4651ef1cf5c30958110261a441e691f363.png';
import { Clock } from "lucide-react";
import React from 'react';

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

export function DashboardHeader() {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const weekOfYear = getWeekOfYear(now);
  const dayOfWeek = now.toLocaleDateString('en-MY', {
    timeZone: 'Asia/Kuala_Lumpur',
    weekday: 'long',
  });
  const dayOfMonth = now.getDate();
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
    <div className="bg-green-50 border-b border-green-200 px-4 py-1">
      <div className="flex items-center justify-between">
        {/* Left Logo */}
        <div className="flex items-center space-x-3">
          <img src={greenviroLogo} alt="Greenviro Solutions" className="h-9" />
        </div>

        {/* Center Content */}
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <h1 className="text-green-800 text-lg font-semibold">Integrated Solid Waste Management Center</h1>
            <p className="text-green-600 text-xs">Real-time Waste Collection Monitoring Dashboard</p>
          </div>
          <div className="bg-green-600 text-white rounded px-2 py-1.5 flex items-center space-x-2">
            <Clock className="h-3 w-3" />
            <div>
              <p className="text-xs opacity-90">Current Time</p>
              <p className="text-xs font-semibold">{`${dateString}, ${timeString}`}</p>
              <p className="text-xs opacity-90">{`Week ${weekOfYear} • ${dayOfWeek}, ${dayOfMonth}`}</p>
            </div>
          </div>
        </div>

        {/* Right Logo */}
        <div className="flex items-center space-x-3">
          <div className="text-right text-green-700">
            <p className="text-xs">Client Dashboard for</p>
          </div>
          <img src={mbspLogo} alt="MBSP" className="h-10" />
        </div>
      </div>
    </div>
  );
}