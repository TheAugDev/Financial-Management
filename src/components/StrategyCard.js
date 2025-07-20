import React from 'react';
import { CheckCircle2 } from 'lucide-react';
const StrategyCard = ({ title, description, value, icon, selected, setStrategy }) => (
  <div onClick={() => setStrategy(value)} className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        {icon}
        <h4 className="font-bold ml-2">{title}</h4>
      </div>
      {selected && <CheckCircle2 className="text-blue-500" />}
    </div>
    <p className="text-sm text-gray-600 mt-1">{description}</p>
  </div>
);
export default StrategyCard;
