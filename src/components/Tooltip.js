import React, { useState } from 'react';
const Tooltip = ({ text, children }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative flex items-center" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            {show && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-gray-800 text-white text-xs rounded-lg p-3 z-50 shadow-lg transition-opacity duration-300">
                    {text}
                </div>
            )}
        </div>
    );
};
export default Tooltip;
