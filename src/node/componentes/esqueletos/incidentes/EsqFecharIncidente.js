'use client'

import { useState } from "react";

export default function EsqFecharIncidente({
    fecharOverlay, 
    voltarParaDetalhes, 
    nomeRegra, 
    nivelPrioridade, 
    status,
    comentario
}){
     {/*Aloca valor que o user digitou */}
        const [comentarioClose, setComentarioClose] = useState({comentario : ""})
    
        {/*ACK - função para atribuir o valor ao state -  */}
        const atribuiValor = (e) => {
            const {name, value} = e.target;
            setComentarioClose((comentario) => (
                {...comentario, [name] : value}
            ))
        }
    
        {/*ACK - função para enviar pro db o ack + comentário*/}
        const enviaForm = (e) => {
            e.preventDefault();
            
            
            try{
                
            }
    
            catch(error){
    
            }
        }


    return(
      <>
            {/*Overlay */}
            <div 
                className="fixed inset-0 bg-black opacity-70"
                onClick={() => fecharOverlay()}
             ></div>
            
            {/*Modal para deletar */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] min-w-[300px] min-h-[400px]  pb-5  bg-white rounded-md">

                    {/*Botão para voltar a página de detalhes */}
                    <img
                            src="/genericos/ArrowBack.png"
                            alt="voltarParaDetalhes"
                            className="  max-w-[40px] mt-3.5 ml-5 p-1 border-[1px] rounded-[50%]"
                            title="voltar para detalhes"
                            onClick={() => voltarParaDetalhes()}
                    />

                    <h2 className=" mt-[0px] font-medium  text-center  text-[18px]">Fechar Incidente</h2>

                    <div className="flex flex-col gap-2 mt-3 ml-8.5 mb-3.5   text-[15.5]">

                        <h2 
                         className="mt-2 mb-2"
                        >
                            Regra: <br/> 
                            <span className="pb-0.5 border-b-[1px]">{nomeRegra}
                            </span>
                        </h2>

                        <h2 className="mt-2 mb-2">
                        Nivel de prioridade: {nivelPrioridade}
                        </h2>

                        <h2 className="mt-2 mb-2">
                        Status atual: <span className="font-medium">{status}</span>
                        </h2>

                        <h2 className="mt-2 mb-2">
                        Comentário Do ACK: <br/> "{comentario}"
                        </h2>
                    </div>

                    <form onSubmit={enviaForm}>

                            <textarea 
                            name="comentario"
                            value={comentarioClose.comentario}
                            onChange={atribuiValor}
                            placeholder="confirme"
                            className="block w-[75vw] min-h-[100px] mx-auto pt-1 pl-4 bg-[#D0D0D0] rounded-sm"
                            />


                            <button className="block w-full min-w-[150px] max-w-[200px] mx-auto mt-4 p-2 font-medium text-[white] bg-[red] rounded-sm">
                                Fechar Incidente
                            </button>
                    </form>
                    
        </div>
      </>
    )
}