import React from 'react';
import Tooltip from './Tooltip';
import { Info, ChevronsRight } from 'lucide-react';
const StatCard = ({ icon, title, value, baseValue, color, tooltipText, scenarioMode }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex items-center">
      <div className={`p-3 rounded-full mr-4 ${color}`}>{icon}</div>
      <div>
        <div className="flex items-center">
          <p className="text-sm text-gray-500">{title}</p>
          {tooltipText && (
            <Tooltip text={tooltipText}>
              <Info size={14} className="ml-1.5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </Tooltip>
          )}
        </div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
    {scenarioMode && baseValue && value !== baseValue && (
      <div className="mt-2 text-sm text-center">
        <span className="text-gray-500 line-through">{baseValue}</span>
        <ChevronsRight className="inline h-4 w-4 mx-1 text-green-500" />
        <span className="font-bold text-green-600">{value}</span>
      </div>
    )}
  </div>
);
export default StatCard;
