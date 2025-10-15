import React from 'react';
import { AnalysisData } from '../services/geminiService';
import { TagIcon } from './icons/TagIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';

interface Props {
    result: AnalysisData;
}

const Card: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className = '', delay = 0 }) => (
    <div 
        className={`bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-lg transition-all duration-300 hover:shadow-blue-500/20 hover:-translate-y-1 opacity-0 ${className} animate-fade-in-up`}
        style={{ animationDelay: `${delay}ms` }}
    >
        {children}
    </div>
);


const AnalysisResultDisplay: React.FC<Props> = ({ result }) => {
    return (
        <div className="w-full mt-8 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-teal-300 text-center">Análise da Imagem</h2>
            
            <div className="grid grid-cols-1 gap-6">
                {/* General Description Card */}
                <Card delay={0}>
                    <p className="text-base sm:text-lg text-gray-300 whitespace-pre-wrap leading-relaxed">{result.description}</p>
                </Card>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Identified Objects Card */}
                    {result.identifiedObjects && result.identifiedObjects.length > 0 && (
                        <Card delay={200}>
                            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-300 flex items-center">
                                <TagIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                                Objetos Identificados
                            </h3>
                            <ul className="space-y-2">
                                {result.identifiedObjects.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-blue-400 mr-3 mt-1">&#8227;</span>
                                        <span className="text-sm sm:text-base text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    )}
                    
                    {/* Key Insights Card */}
                    {result.keyInsights && result.keyInsights.length > 0 && (
                        <Card delay={400}>
                            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-yellow-300 flex items-center">
                                <LightBulbIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                                Percepções Chave
                            </h3>
                            <ul className="space-y-2">
                                {result.keyInsights.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-yellow-400 mr-3 mt-1">&#8227;</span>
                                        <span className="text-sm sm:text-base text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalysisResultDisplay;