import React from 'react';

const ProgressBar: React.FC = () => {
    return (
        <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div className="bg-blue-500 h-2.5 w-full rounded-full animate-indeterminate origin-center"></div>
        </div>
    );
};

export default ProgressBar;