'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import EsqNotificacoes from "../esqNotifiacoes/EsqNotificacoes";

export default function NotificacoesDesk(){

    const notificacoes  = [ 

        {
            id: 1,
            prioridade: "Alta",
            nome : "Checagem entrega de pedidos",
            horarioIncidente: "20/10/2025 - 22:33",
            status: "OPEN"
        },

        {
            id: 2,
            prioridade: "Média",
            nome : "Verificação - Estoque acabando",
            horarioIncidente: "20/10/2025 - 22:42",
            status: "OPEN"
        },

        {
            id: 3,
            prioridade: "Baixa",
            nome : "Checagem entrega de pedidos",
            horarioIncidente: "20/10/2025 - 22:50",
            status: "OPEN"
           }
 
    ]

    const [droperNotificacoes, setDroperNotificacoes] = useState(false);

    useEffect(() => {
        if (droperNotificacoes) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
    
        // Limpa o estilo ao desmontar o componente
        return () => {
          document.body.style.overflow = "auto";
        };
      }, [droperNotificacoes]);
    
    

    /*
        ESQUELETO APENAS DO MENU 
        -- PARA VER O ESQUELETO DAS NOTIFICAÇÕES, Olhar EsqNotificacoes
    */
    return(
        <>  
            {/*Div pai */}
            <div className="
            absolute top-4 right-3 flex gap-2.5

            md:right-10  md:gap-4
            md:mt-4
            ">
                {/*Botão de notificaões */}
                <>
                    <div>
                        <img
                        src="/header/notificacao.png"
                        alt=""
                        className="
                        max-h-[37px] p-2 bg-[#007F50] rounded-[50%]

                        md:max-h-[40px]
                        md:cursor-pointer
                        "
                        onClick={() => setDroperNotificacoes(!droperNotificacoes)}
                        />

                        <p className="absolute top-0 left-7 
                           px-1.5  bg-[#FACC15] text-[#007F50] 
                           rounded-[50%] 
                        ">
                            3
                        </p>
                    </div>

                    {/*Histórico das notificações em si */}
                    {droperNotificacoes && (
                        <section className="absolute 
                        top-15 right-0 

                         w-[21vw] min-w-[200px] h-[50vh] min-h-[200px]
                         max-w-[330px] max-h-[330px]  pb-3

                        bg-[#007F50] rounded-md  overflow-y-auto z-5
                        
                         md:top-15 md:right-[-16.5px]
                        ">

                            <div className="flex flex-col">
                                {notificacoes.map((notificacaoAtual) => (
                                        <EsqNotificacoes
                                            key={notificacaoAtual.id}
                                            nomeRegra={notificacaoAtual.nome}
                                            prioridade={notificacaoAtual.prioridade}
                                            horario={notificacaoAtual.horarioIncidente}

                                            status={notificacaoAtual.status}

                                        />
                                    ))}
                            </div>

                        </section>  
                    )}
                </>

                {/*Botão de configurações */}
                <Link href={"/configuracoes/home"}>
                    <img
                    src="/header/configurations.png"
                    alt=""
                    className="
                    max-h-[37px] p-2 bg-[#007F50] rounded-[50%]

                    md:max-h-[40px]
                    md:cursor-pointer
                    "
                    />
                </Link>
            </div>
        </>
    )
}