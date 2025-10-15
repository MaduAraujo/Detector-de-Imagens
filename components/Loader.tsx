import React from 'react';
import ProgressBar from './ProgressBar';

interface LoaderProps {
    message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
    return (
        <div className="w-full mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-teal-300 text-center">Analisando a imagem...</h2>
            <p className="text-gray-300 mb-6 text-center">{message}</p>
            <ProgressBar />
        </div>
    );
};

export default Loader;