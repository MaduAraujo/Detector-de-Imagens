import React, { useState, useCallback, useEffect } from 'react';
import { analyzeImage, AnalysisData } from './services/geminiService';
import Spinner from './components/Spinner';
import { ImageIcon } from './components/icons/ImageIcon';
import AnalysisResultDisplay from './components/AnalysisResultDisplay';
import Header from './components/Header';
import Loader from './components/Loader';
import Footer from './components/Footer';

const App: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [isReadingFile, setIsReadingFile] = useState<boolean>(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [progressMessage, setProgressMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showSensitiveContent, setShowSensitiveContent] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const processFile = useCallback((file: File | undefined | null) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Por favor, selecione um arquivo de imagem válido (JPEG, PNG, GIF, etc.).');
            setImageFile(null);
            setImagePreviewUrl(null);
            return;
        }
        setIsReadingFile(true);
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result as string);
            setIsReadingFile(false);
        };
        reader.readAsDataURL(file);
        setAnalysisResult(null);
        setShowSensitiveContent(false); // Reset on new image
        setError('');
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        processFile(event.target.files?.[0]);
    };

    const handleAnalyzeClick = useCallback(async () => {
        if (!imageFile) {
            setError('Por favor, selecione uma imagem primeiro.');
            return;
        }

        setIsLoading(true);
        setError('');
        setAnalysisResult(null);
        setShowSensitiveContent(false);

        try {
            const result = await analyzeImage(imageFile);
            setAnalysisResult(result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(`Erro ao analisar a imagem: ${err.message}`);
            } else {
                setError('Ocorreu um erro desconhecido.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [imageFile]);
    
    useEffect(() => {
        let interval: number | undefined;
        if (isLoading) {
          const messages = [
            'Preparando sua imagem...',
            'Verificando conteúdo...',
            'Analisando os detalhes da imagem...',
            'Estruturando os resultados...',
            'Quase pronto, gerando a descrição...'
          ];
          let messageIndex = 0;
          setProgressMessage(messages[messageIndex]);

          interval = window.setInterval(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            setProgressMessage(messages[messageIndex]);
          }, 2500);
        }

        return () => {
          if (interval) {
            clearInterval(interval);
          }
        };
      }, [isLoading]);

    const triggerFileInput = () => {
        if (isLoading || isReadingFile) return;
        document.getElementById('file-upload')?.click();
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (isLoading || isReadingFile) return;
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Necessary to allow drop
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (isLoading || isReadingFile) return;
        setIsDragging(false);
        processFile(event.dataTransfer.files?.[0]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-gray-100 flex flex-col items-center">
            <Header />
            <main className="container mx-auto max-w-4xl w-full flex-grow flex flex-col items-center p-4 sm:p-6 lg:p-8">
                <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                        <div 
                            className={`relative group w-full h-64 md:h-full min-h-[256px] border-2 border-dashed rounded-xl flex flex-col justify-center items-center text-center transition-all duration-300
                                ${isDragging ? 'border-blue-500 bg-gray-700/60 scale-105' : 'border-gray-600'}
                                ${(isLoading || isReadingFile) ? 'cursor-wait' : 'cursor-pointer'}
                                ${!imagePreviewUrl && !isDragging && !isReadingFile ? 'hover:border-blue-500 hover:bg-gray-700/50' : ''}
                            `}
                            onClick={triggerFileInput}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                                disabled={isReadingFile || isLoading}
                            />
                            {isReadingFile ? (
                                <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg overflow-hidden relative">
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-slate-600/50 to-transparent animate-shimmer"></div>
                                </div>
                            ) : imagePreviewUrl ? (
                                <>
                                    <img src={imagePreviewUrl} alt="Pré-visualização" className="object-contain w-full h-full rounded-lg p-2" />
                                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none">
                                        <ImageIcon className="w-10 h-10 mb-2 text-white" />
                                        <span className="text-white font-semibold text-lg">Trocar Imagem</span>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center text-gray-400 p-4 pointer-events-none">
                                    <ImageIcon className="w-16 h-16 mb-4" />
                                    <span className="font-semibold">{isDragging ? 'Solte a imagem aqui!' : 'Clique ou arraste uma imagem'}</span>
                                    <span className="text-sm mt-1">PNG, JPG, GIF, etc.</span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col justify-center h-full text-center md:text-left">
                            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-blue-300">Pronto para a análise?</h2>
                            <p className="text-sm sm:text-base text-gray-300 mb-6">
                                Após selecionar uma imagem, clique no botão para que a IA analise todos os detalhes para você.
                            </p>
                            
                            <button
                                onClick={handleAnalyzeClick}
                                disabled={!imageFile || isLoading || isReadingFile}
                                className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner />
                                        Analisando...
                                    </>
                                ) : (
                                    'Analisar imagem'
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {isLoading && (
                    <Loader message={progressMessage} />
                )}

                 {!isLoading && error && (
                    <div className="w-full mt-8 bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg" role="alert">
                        <strong className="font-bold">Erro: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                {!isLoading && analysisResult && (
                    analysisResult.isSensitive && !showSensitiveContent ? (
                        <div className="w-full mt-8 bg-yellow-900/50 border border-yellow-700 text-yellow-200 px-4 sm:px-6 py-4 rounded-2xl flex flex-col items-center text-center animate-fade-in-up">
                            <div>
                                <strong className="font-bold">⚠️ Conteúdo Sensível Detectado</strong>
                                <p className="mt-1">A imagem parece conter conteúdo sensível.</p>
                            </div>
                            <button
                                onClick={() => setShowSensitiveContent(true)}
                                className="mt-4 bg-yellow-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-yellow-800 transition-all duration-300 transform hover:scale-105"
                            >
                                Ver conteúdo mesmo assim
                            </button>
                        </div>
                    ) : (
                        <AnalysisResultDisplay result={analysisResult} />
                    )
                )}
            </main>
            <Footer />
        </div>
    );
};

export default App;
