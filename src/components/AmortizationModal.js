import React from 'react';
import { X } from 'lucide-react';
const AmortizationModal = ({ amortizationData, setShowAmortizationModal }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-2xl p-6 max-w-2xl w-full text-center relative">
      <button onClick={() => setShowAmortizationModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"><X /></button>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Amortization Schedule for {amortizationData?.id}</h2>
      <div className="overflow-y-auto h-96">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-xs text-gray-700 uppercase sticky top-0">
            <tr>
              <th className="p-2">Month</th>
              <th className="p-2 text-right">Payment</th>
              <th className="p-2 text-right">Principal</th>
              <th className="p-2 text-right">Interest</th>
              <th className="p-2 text-right">Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {amortizationData?.amortization.map(row => (
              <tr key={row.month} className="border-b">
                <td className="p-2">{row.month}</td>
                <td className="p-2 text-right">${row.payment.toFixed(2)}</td>
                <td className="p-2 text-right">${row.principal.toFixed(2)}</td>
                <td className="p-2 text-right">${row.interest.toFixed(2)}</td>
                <td className="p-2 text-right">${row.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
export default AmortizationModal;
