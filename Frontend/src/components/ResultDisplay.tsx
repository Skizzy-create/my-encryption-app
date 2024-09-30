import React from 'react';

interface ResultDisplayProps {
    result: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => (
    <div className="mt-6 p-6 bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md shadow-md">
        <h3 className="text-lg font-bold text-gray-200">Result</h3>
        <p className="text-gray-400 mt-2">{result}</p>
    </div>
);

export default ResultDisplay;
