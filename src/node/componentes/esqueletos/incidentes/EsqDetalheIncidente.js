'use client'

import { useState } from "react"
import Link from "next/link";

export default function DetalheIncidente({
      idIncidente,
      erro,

      idRegra,
      regraNome, 
      prioridade, 
      horario_incidente, 
      status,

      comentarioInicial,
      funcionarioComentarioInicial,
      horarioComentarioInicial,

      comentarioFinal,
      funcionarioComentarioFinal,
      horarioComentarioFinal,
    
      reexecutarIncidente,
      fecharIncidente,
      
}) {

    const [comentarioACK, setComentarioACK] = useState({comentario : ""})

    const atribuiValor = (e) => {
        const {name, value} = e.target;
        setComentarioACK((comentario) => ({...comentario, [name]: value}))
    }

    const enviaForm = (e) => {
        e.preventDefault();
        try { } catch(error) {}
    }

    return(
     <>
         {/*Container pai com flex para centralizar */}

            
        {/* Card */}
        <div className=
        {`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[95vw]  bg-[#00875A] text-white rounded-md md:w-full max-w-[750px] min-h-[400px]   overflow-y-auto md:overflow-y-hidden p-6 md:-translate-x-0 md:-translate-y-0 md:top-auto md:left-0 md:relative flex flex-col
        `}>

            {/* Botão Voltar */}
            <Link href="/incidentes/home">
                <img
                    src="/genericos/ArrowBackWhite.png"
                    alt="Voltar"
                    className="absolute top-4 left-4 w-10 h-10 p-1 border rounded-full cursor-pointer md:w-11 md:h-11"
                />
            </Link>

            {/* Título */}
            <h1 className="text-xl font-medium text-center mb-6 border-b-2 pb-2 md:pb-5.5">Detalhamento do Incidente #{idIncidente}</h1>

            {/* Detalhes */}
            <div className="flex flex-col gap-4 text-base md:text-[17.5px]">

                <p>
                    <strong>
                        Nível de prioridade:
                    </strong> <br/>
                    {prioridade}
                </p>

                <p>
                    <strong>
                        Regra do Incidente:
                    </strong> <br/>
                    {regraNome}
                </p>

                <p className="font-bold">
                    ID da Regra: <br/>
                    <span className="ml-1 font-light">
                        {idRegra}
                    </span>
                </p>

                <p>
                    <strong>
                        Erro do SQL:
                    </strong> <br/
                    ><span className="underline">{erro}</span>
                </p>

                <p>
                    <strong>
                        Horário do Incidente:
                    </strong> <br/>
                    {horario_incidente}
                </p>
                
                {/* Comentários */}

                {/*Se status = ACK, ele puxa o comentário do ack */}
                {status === "ACK" && (
                    <>
                        {/*Comentário do ack */}
                        <p>
                            <strong>
                                Comentário do ack: <br/>
                            </strong>

                            "{comentarioInicial}" 
                            - {funcionarioComentarioInicial}
                            <span className="ml-2">
                               no horário {horarioComentarioInicial}
                            </span>
                        </p>

                        <p>
                            <strong>
                                Status atual:
                            </strong> <br/>

                            <span className={`block w-max mt-1 px-2 py-1 font-bold rounded-sm 
                                ${status === "OPEN" ? "text-green-500 bg-white" : ""}
                                ${status === "ACK" ? "text-[#E6B800] bg-white" : ""}
                                ${status === "CLOSED" ? "text-red-500 bg-white" : ""}
                            `}>
                                {status}
                            </span>
                        </p>
                    </>
                )}

                {/*Se status = closed, ele puxa o comentário do ack e o comentário do close */}
                {status === "CLOSED" && (
                    <>
                        {/*Comentário do ack */}
                        <p>
                            <strong>
                                Comentário do ack:<br/>
                            </strong>
                            
                            "{comentarioInicial}" <br/>
                            - {funcionarioComentarioInicial} 
                             - {horarioComentarioInicial}
                        </p>
                        
                        {/*Comentário do close */}
                        <p>
                            <strong>
                                Comentário do close: <br/>
                            </strong> 
                            "{comentarioFinal}" <br/> 
                            - {funcionarioComentarioFinal}
                            - {horarioComentarioFinal}
                        </p>


                        <p>
                            <strong>
                                Status atual:
                            </strong> <br/>

                            <span className={`block w-max mt-1 px-2 py-1 font-bold rounded-sm 
                                ${status === "OPEN" ? "text-green-500 bg-white" : ""}
                                ${status === "ACK" ? "text-gray-400 bg-white" : ""}
                                ${status === "CLOSED" ? "text-red-500 bg-white" : ""}
                            `}>
                                {status}
                            </span>
                        </p>
                    </>
                )}
            </div>

            {/* Formulário ACK */}
            {status === "OPEN" && (
                <form onSubmit={enviaForm} className="mt-5 flex flex-col gap-3">
                    <label>Aguardando Confirmação</label>
                    <textarea
                        name="comentario"
                        value={comentarioACK.comentario}
                        onChange={atribuiValor}
                        placeholder="Confirme"
                        className="w-full h-[11vh] min-h-[80px] max-h-[150px] p-2 rounded placeholder:text-gray-400 text-black bg-[white]"
                    />
                    <button className="mb:mb-3 self-center px-4 py-2 bg-gray-600 rounded text-white cursor-pointer">Confirmar ACK</button>
                </form>
            )}

            {/* Botões Reexecutar / Fechar Incidente */}
            {(status === "ACK") && (
                <div className="flex gap-4 mt-6">
                    <button className=" px-5 py-3 bg-gray-600 rounded text-white cursor-pointer"
                    onClick={() => reexecutarIncidente()}
                    >
                        Reexecutar
                    </button>

                        {/*Fechar Incidente */}
                        <button onClick={fecharIncidente}>
                            <img src="/genericos/trash.png" alt="fechar incidente" className="w-11.5 h-11.5 p-2 bg-red-500 rounded-md cursor-pointer"
                            />
                        </button>
                    
                </div>
            )}
        </div>
     </>
    )
}
