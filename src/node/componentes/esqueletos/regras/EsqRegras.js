'use client'

import { dadosGlobais } from "@/node/globalContext/GlobalContext"

export default function EsqRegras({ prioridade, nomeRegra, status, horarioI, horarioF, verDetalhes }) {
    const { usuario } = dadosGlobais();

    return (
        <section className="
            flex flex-col w-full max-w-[360px] mx-auto gap-2 p-4 border border-gray-300 rounded-md
            md:w-[48vw] md:max-w-[800px]
        ">
            <p className="text-sm">
                    <strong>Prioridade:</strong> {prioridade}
            </p>

            <h2 className="text-base font-semibold">{nomeRegra}</h2>

            <div className="flex flex-col md:flex-row md:gap-4 text-sm text-gray-700">

                <p>Status: </p>
                <span className={`
                    ${status === "rodando" ? "font-bold text-[#CA8A04] ml-[-10px]" : 
                        status === "sucesso" ? "font-bold text-[#00875A] ml-[-10px]" : 
                         status === "falhou" ? "font-bold text-red-500 ml-[-10px]" : "text-[#A0A0A0]"
                    }`
                    }>
                        {status}
                </span>

                <span>
                    Início: {horarioI}
                </span>

                <span>
                    Fim: {horarioF}
                </span>
            </div>

            {(usuario.autorizacao !== "Viewer") && (
                <button
                    onClick={verDetalhes}
                    className="mt-3 px-3 py-1.5 bg-[#00875A] text-white rounded-sm  cursor-pointer"
                >
                    Ver Detalhes
                </button>
            )}
        </section>
    )
}
