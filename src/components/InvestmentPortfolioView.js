import React, { useMemo } from 'react';
import StatCard from './StatCard';
import InvestmentGrowthCalculator from './InvestmentGrowthCalculator';
import { Landmark, PieChart as PieChartIcon } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d', '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB'];
const InvestmentPortfolioView = ({ data }) => {
    const { totalValue, allocation } = useMemo(() => {
        if (!data || data.length === 0) return { totalValue: 0, allocation: [] };
        const total = data.reduce((sum, item) => sum + (item.Value || 0), 0);
        const types = {};
        data.forEach(item => {
            const type = item.Type || 'Uncategorized';
            if (!types[type]) types[type] = 0;
            types[type] += item.Value || 0;
        });
        return { totalValue: total, allocation: Object.keys(types).map(name => ({ name, value: types[name] })) };
    }, [data]);
    if (data.length === 0) {
        return (
            <div className="text-center p-10 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800">Investment Portfolio</h2>
                <p className="text-gray-500 mt-2">No investment data found. Please add a link to your 'Investments' sheet to see your portfolio.</p>
            </div>
        )
    }
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-1">
                     <StatCard icon={<Landmark className="h-6 w-6 text-white"/>} title="Total Portfolio Value" value={`$${totalValue.toLocaleString(undefined, {maximumFractionDigits: 2})}`} color="bg-teal-500" />
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Asset Allocation</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={allocation} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                {allocation.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                            </Pie>
                            <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Investment Details</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm"><thead className="bg-gray-100 text-xs text-gray-700 uppercase"><tr><th className="p-3">Investment Name</th><th className="p-3">Type</th><th className="p-3 text-right">Value</th></tr></thead><tbody>{data.map((item, index) => ( <tr key={index} className="border-b hover:bg-gray-50"><td className="p-3 font-medium">{item['Investment Name']}</td><td className="p-3">{item.Type}</td><td className="p-3 text-right">${(item.Value || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td></tr>))}</tbody></table>
                </div>
            </div>
            <InvestmentGrowthCalculator startingAmount={totalValue} />
        </>
    )
}
export default InvestmentPortfolioView;
