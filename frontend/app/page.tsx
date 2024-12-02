"use client";

import { useState } from "react";
import InputForm from "./components/InputForm";
import ResultsDisplay from "./components/ResultsDisplay";

export default function Home() {
    const [result, setResult] = useState<number | null>(null);

    const handleCalculate = (result: number) => {
        setResult(result); // Apenas salva o valor retornado
    };
    

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600 mb-10">
                Simulador de Investimentos
            </h1>
            <InputForm onCalculate={handleCalculate} />
            <ResultsDisplay result={result} />
        </div>
    );
}
