import { motion } from "framer-motion";

interface ResultsDisplayProps {
    result: number | null;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
    console.log("Resultado recebido pelo ResultsDisplay:", result);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mr-10"
        >
            {result !== null ? (
                isNaN(result) ? (
                    <p className="bg-red-600 font-bold rounded-lg p-5 mt-4">
                        Erro ao Calcular
                    </p>
                ) : (
                    <p className="bg-green-600 font-bold rounded-lg p-5 mt-4">
                        Projeção Final: R${result.toFixed(2)}
                    </p>
                )
            ) : (
                <p className="text-gray-600 rounded shadow-md max-w-md mx-auto mt-6 p-4">
                    Insira os dados e clique em Calcular
                </p>
            )}
        </motion.div>
    );
}

