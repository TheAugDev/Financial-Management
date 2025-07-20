import React from 'react';
import { Info, ExternalLink } from 'lucide-react';
const Instructions = () => (
  <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md mb-6 shadow-sm">
    <h3 className="text-lg font-semibold flex items-center"><Info className="h-6 w-6 mr-3" />How to use this tool</h3>
    <div className="text-sm space-y-2 mt-2">
      <p>This tool requires separate links for your 'Debts', 'Bills', and 'Income' sheets for maximum reliability.</p>
      <p>1. <strong>Use the Template:</strong> Start by making a copy of the official <a href="https://docs.google.com/spreadsheets/d/1hD7oQM8cgB9EBhs1wHuBgaSFOwLH1a_TGg4jU84vfFw/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Template Sheet <ExternalLink className="h-3 w-3 ml-1 inline"/></a>. It has the required tabs.</p>
      <p>2. <strong>Publish Each Tab:</strong> For each tab ('Debts', 'Bills', 'Income', 'Investments'), click on it, go to <code className="bg-blue-100 text-blue-800 px-1 rounded">File</code> &rarr; <code className="bg-blue-100 text-blue-800 px-1 rounded">Share</code> &rarr; <code className="bg-blue-100 text-blue-800 px-1 rounded">Publish to web</code>. In the dialog, select the specific sheet, choose 'Comma-separated values (.csv)', and click Publish. Copy the unique generated link for each tab.</p>
      <p>3. <strong>Paste Links Below:</strong> Paste each link into its corresponding input field.</p>
    </div>
  </div>
);
export default Instructions;
