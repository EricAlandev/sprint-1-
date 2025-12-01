'use client'

import EsqDetalheIncidente from "@/componentes/esqueletos/incidentes/EsqDetalheIncidente";
import GerenteLayout from "@/node/layouts/GerenteLayout";
import HeaderDesktop from "@/componentes/Header/HeaderDesktop";
import HeaderMobile from "@/componentes/Header/HeaderMobile";

import NotificacoesDesk from "@/componentes/esqueletos/esqGerais/NotificacoesDesk";
import { useParams } from "next/navigation";
import { useState } from "react";
import AvisoDelecao from "@/componentes/esqueletos/esqGerais/avisoDelecao";
import ModalFecharIncidente from "@/componentes/pages/incidentesPage/ModalFecharIncidente";
import ModalReexecutarIncidente from "@/componentes/pages/incidentesPage/ModalReexecutarIncidente";

export default function PageDetalheIncidente(){

    const incidentes = [
            {
             id: 1,
             idIncidente : 1,
             prioridade: "Alta",
             error: "CANNOT COUNT",
             idRegra: 1,
             regra_do_incidente: "Checagem entrega de pedidos",
             status: "OPEN",
             horario_incidente: "20/10/2025 - 22:50",
             funcionarioACK : null,
             funcionarioClose: null
    
            }, 
            
            {
                id: 2,
                idIncidente : 2,
                prioridade: "Média",
                error: "CANNOT COUNT",
                idRegra: 2,
                regra_do_incidente: "Verificação de Estoque acabando",
                status: "ACK" ,
                horario_incidente: "20/10/2025 - 22:45",
                comentario_doACK : "estou aqui. Aceitei o incidente",
                funcionarioACK : "Roberto Silva",
                horarioComentarioIncial : "20/10/2025 - 22:47",
                funcionarioClose: null
            },
    
            {
                id: 3,
                idIncidente : 3,
                prioridade: "Baixa",
                error: "CANNOT COUNT",
                idRegra: 3,
                regra_do_incidente: "Verificação de Estoque acabando",
                status: "CLOSED" ,
                horario_incidente: "20/10/2025 - 22:44",

                comentario_doACK : "Aceito o incidente",
                funcionarioACK : "Roberto Silva",
                horarioComentarioIncial : "20/10/2025 - 22:45",

                comentario_doCLOSE : "Resolvido. Faltou o from durante o select. Mas, foi concertado",
                funcionarioClose : "Roberto Silva",
                horarioComentarioFinal : "20/10/2025 - 22:55"

    
            }
            ]

            const [modal, setModal] = useState(null);
            
            //ID da page
            const {id} = useParams();
    
            //Pega o incidente que tiver o mesmo id do incidente.
            const detalheDoIncidente = incidentes.find((incidenteAtual) => incidenteAtual.id === Number(id))

    return(
       <>
         <GerenteLayout layout={<HeaderMobile/>}/>
                   
                   <div className="md:flex">
                     <GerenteLayout layout={<HeaderDesktop/>}/>
         
                         <NotificacoesDesk/>
         
                         <div
                             className="md:flex
                             md:w-[74vw]
                             md:justify-center md:items-center"
                         >
                                <EsqDetalheIncidente
                                idIncidente={detalheDoIncidente.idIncidente}
                                
                                prioridade={detalheDoIncidente.prioridade}

                                idRegra={detalheDoIncidente.idRegra}
                                regraNome={detalheDoIncidente.regra_do_incidente}

                                erro={detalheDoIncidente.error}
                                horario_incidente={detalheDoIncidente.horario_incidente}
                                

                                comentarioInicial={detalheDoIncidente.comentario_doACK}
                                funcionarioComentarioInicial={detalheDoIncidente.funcionarioACK}
                                horarioComentarioInicial={detalheDoIncidente.horarioComentarioIncial}


                                comentarioFinal={detalheDoIncidente.comentario_doCLOSE}
                                funcionarioComentarioFinal={detalheDoIncidente.funcionarioClose}
                                horarioComentarioFinal={detalheDoIncidente.horarioComentarioFinal}

                                status={detalheDoIncidente.status}
                                
                                reexecutarIncidente={() => setModal("reexecutar Incidente")}
                                fecharIncidente={() => setModal("Fechar")} 
                            />
                         </div>

                         {modal === "Fechar" && (
                            <ModalFecharIncidente
                                fecharOverlay={() => setModal(null)}
                            />
                         )}

                        {modal === "reexecutar Incidente" && (
                            <ModalReexecutarIncidente
                                fecharOverlay={() => setModal(null)}
                                idIncidente={detalheDoIncidente.idIncidente}
  

                            />
                         )}
                         
                   </div>
       </>
    )
}