import React from 'react';
import { X, Award } from 'lucide-react';
const ImpactModal = ({ impactData, setShowImpactModal }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full text-center relative">
      <button onClick={() => setShowImpactModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"><X /></button>
      <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Amazing!</h2>
      <p className="text-lg text-gray-600">That <span className="font-bold text-green-600">${impactData.amount.toLocaleString()}</span> payment made a huge difference!</p>
      <div className="mt-6 space-y-3">
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-green-800">You'll be debt-free</p>
          <p className="text-xl font-bold text-green-600">{impactData.monthsSaved} months sooner!</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">You'll save an extra</p>
          <p className="text-xl font-bold text-blue-600">${impactData.interestSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in interest!</p>
        </div>
      </div>
    </div>
  </div>
);
export default ImpactModal;
