

'use client'

import { dadosGlobais } from "@/node/globalContext/GlobalContext"

export default function EsqIncidente({idIncidente, prioridade, nomeRegraReferenciada, status, horarioIncidente, verDetalhes, definirQualDetalhe}) {

    const {usuario} = dadosGlobais();

    return(
        <>
            {usuario && (
                <section className="w-[90vw] max-w-[360px] mx-auto px-4 py-4 border-[#A0A0A0] border-[2px] rounded-md 
            
                md:w-[48vw]  md:max-w-[800px]">
    
                                <p>
                                    ID incidente: 
                                    <span className="ml-1 font-bold">
                                        {idIncidente}
                                    </span>
    
                                </p>
                      
                                <p>
                                    Prioridade: 
                                    <span className="ml-1 font-bold">
                                        {prioridade}
                                    </span>
    
                                </p>
    
                                <h2>
                                    Regra: 
                                    <span className="ml-1 font-bold">
                                        {nomeRegraReferenciada}
                                    </span>
                                </h2>
    
                                {/*Status */}
                                <h2>
                                    Status: 
                                    
                                    {/*Mudança de cores via status */}
                                    <span className={`
                                        ml-1 font-bold 
                                        ${status === "OPEN" ? 
                                            "text-[green]" :
                                            status === "ACK" ?
                                            "text-[#E6B800]" : 
                                            status === "CLOSED" ?
                                            "text-[red]" : ""
                                        }
                                        `}>
                                        {status}
                                    </span>
                                </h2>
    
                            <h2>Horário do incidente: 
                                    <span className="ml-1 font-[600]">
                                        {horarioIncidente}
                                    </span>
                            </h2>
                    
                    {/*Ver detalhes */}
                    {usuario?.autorizacao !== "Viewer" &&  (
                        <div className="flex gap-4 mt-[10px]">
                            <button 
                                onClick={() => {
                                    verDetalhes();
                                    definirQualDetalhe();
                                }}
                                className="px-1.5 py-1.5 bg-[#A0A0A0] text-[white] rounded-sm cursor-pointer">
                                Ver Detalhes
                            </button>
                     
                        </div>
                    )}
    
                </section>
            )}
        </>
    )
}