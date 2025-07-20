import React, { useState, useEffect, useMemo } from 'react';
import { DollarSign, Percent, Calendar } from 'lucide-react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, Line } from 'recharts';
const InvestmentGrowthCalculator = ({ startingAmount: initialStartingAmount }) => {
    const [startingAmount, setStartingAmount] = useState(initialStartingAmount);
    const [monthlyContribution, setMonthlyContribution] = useState(500);
    const [annualReturn, setAnnualReturn] = useState(7);
    const [yearsToGrow, setYearsToGrow] = useState(20);
    useEffect(() => { setStartingAmount(initialStartingAmount); }, [initialStartingAmount]);
    const projectionData = useMemo(() => {
        const data = [];
        let currentValue = startingAmount;
        const monthlyReturnRate = (annualReturn / 100) / 12;
        for (let year = 0; year <= yearsToGrow; year++) {
            data.push({ year: `Year ${year}`, value: currentValue });
            if (year < yearsToGrow) {
                for (let month = 1; month <= 12; month++) {
                    currentValue = (currentValue + monthlyContribution) * (1 + monthlyReturnRate);
                }
            }
        }
        return data;
    }, [startingAmount, monthlyContribution, annualReturn, yearsToGrow]);
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-xl font-bold mb-4">Investment Growth Projection</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                    <label className="text-sm font-medium text-gray-700">Starting Principal</label>
                    <div className="relative mt-1">
                         <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
                         <input type="number" value={startingAmount} onChange={e => setStartingAmount(Number(e.target.value))} className="w-full pl-8 border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Monthly Contribution</label>
                    <div className="relative mt-1">
                         <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
                         <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} className="w-full pl-8 border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-700">Est. Annual Return (%)</label>
                    <div className="relative mt-1">
                         <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
                         <input type="number" value={annualReturn} onChange={e => setAnnualReturn(Number(e.target.value))} className="w-full pl-8 border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-700">Years to Project</label>
                    <div className="relative mt-1">
                         <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
                         <input type="number" value={yearsToGrow} onChange={e => setYearsToGrow(Number(e.target.value))} className="w-full pl-8 border-gray-300 rounded-md shadow-sm"/>
                    </div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value/1000).toLocaleString()}k`} />
                    <RechartsTooltip formatter={(value) => `$${value.toLocaleString(undefined, {maximumFractionDigits: 0})}`} />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="Projected Value" stroke="#14b8a6" strokeWidth={3} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
export default InvestmentGrowthCalculator;
