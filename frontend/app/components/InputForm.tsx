"use client";

import { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

interface InputFormProps {
    onCalculate: (result: number) => void;
}


const CALCULATE_QUERY = gql`
    query Calculate($initial: Float!, $rate: Float!, $years: Int!) {
        calculate(initial: $initial, rate: $rate, years: $years)
    }
`;

export default function InputForm({ onCalculate }: InputFormProps) {
    const [initial, setInitial] = useState(0);
    const [rate, setRate] = useState(0);
    const [years, setYears] = useState(0);
    const [menor, setMenor] = useState(false);
    const [calculate, { data }] = useLazyQuery(CALCULATE_QUERY);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (initial <= 0 || rate <= 0 || years <= 0) {
            setMenor(true);
            return;
        } else {
            setMenor(false);
        }
        calculate({ variables: { initial, rate, years } });
    };

    useEffect(() => {
        if (data && data.calculate !== undefined) {
            console.log("Resultado retornado:", data.calculate);
            onCalculate(data.calculate); // Passa apenas o número
        }
    }, [data, onCalculate]);
    
    

    return (
        <form
            className="p-4 bg-white rounded shadow-md max-w-md mx-auto w-1/3"
            onSubmit={handleSubmit}
        >
            <div className="mb-4">
                <label className="block text-gray-700">Valor Inicial</label>
                <input
                    type="number"
                    value={initial}
                    onChange={(e) => setInitial(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Taxa de Juros (% ao ano)
                </label>
                <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Prazo (anos)</label>
                <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Calcular
            </button>
            {menor && (
                <p className="bg-red-600 font-bold rounded-lg p-5 mt-4">
                    Todos os valores devem ser maiores que zero
                </p>
            )}
        </form>
    );
}
