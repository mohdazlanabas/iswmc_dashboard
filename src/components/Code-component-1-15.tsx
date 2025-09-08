import greenviroLogo from 'figma:asset/abd5d5eea1307fcc79f39cc60c9db3d9f29b26e8.png';
import mbspLogo from 'figma:asset/df0afb4651ef1cf5c30958110261a441e691f363.png';

export function DashboardHeader() {
  return (
    <div className="bg-green-50 border-b border-green-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={greenviroLogo} alt="Greenviro Solutions" className="h-12" />
          <div className="border-l border-green-300 h-12 mx-4"></div>
          <div>
            <h1 className="text-green-800 text-xl font-semibold">Integrated Solid Waste Management Center</h1>
            <p className="text-green-600 text-sm">Real-time Waste Collection Monitoring Dashboard</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right text-green-700">
            <p className="text-sm">Client Dashboard for</p>
          </div>
          <img src={mbspLogo} alt="MBSP" className="h-16" />
        </div>
      </div>
    </div>
  );
}