import { Card, CardContent } from "./ui/card";
import { Clock } from "lucide-react";

export function LiveStatus() {
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
    <div className="mb-3">
      <Card className="bg-green-600 text-white border-green-700 max-w-xs">
        <CardContent className="p-2">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <div>
              <p className="text-xs opacity-90">Current Time</p>
              <p className="text-sm font-semibold">{currentTime}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}