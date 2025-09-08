import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, TrendingUp, AlertCircle } from "lucide-react";

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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-green-600 text-white border-green-700">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <div>
              <p className="text-sm opacity-90">Current Time</p>
              <p className="font-semibold">{currentTime}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">System Status</p>
              <p className="font-semibold text-green-800">Online</p>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-300">Active</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Today's Progress</p>
              <p className="font-semibold text-green-800">Normal Operation</p>
            </div>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Weight Bridge</p>
              <p className="font-semibold text-green-800">Operational</p>
            </div>
            <AlertCircle className="h-5 w-5 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}