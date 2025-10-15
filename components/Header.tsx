import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 border-b border-slate-700/50 bg-slate-900/70 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 mb-2">
          Detector de Imagens
        </h1>
        <p className="text-md text-slate-400 max-w-2xl">
          Envie uma imagem e deixe a IA descrever o que vê.
        </p>
      </div>
    </header>
  );
};

export default Header;