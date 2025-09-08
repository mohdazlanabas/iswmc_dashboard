import greenviroLogo from 'figma:asset/abd5d5eea1307fcc79f39cc60c9db3d9f29b26e8.png';
import mbspLogo from 'figma:asset/df0afb4651ef1cf5c30958110261a441e691f363.png';
import { Clock } from "lucide-react";

export function DashboardHeader() {
  const currentTime = new Date().toLocaleString('en-MY', {
    timeZone: 'Asia/Kuala_Lumpur',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
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
              <p className="text-xs font-semibold">{currentTime}</p>
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