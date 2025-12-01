'use client'

import GerenteLayout from "@/node/layouts/GerenteLayout";
import HeaderDesktop from "@/node/componentes/Header/HeaderDesktop";
import HeaderMobile from "@/node/componentes/Header/HeaderMobile";

import NotificacoesDesk from "@/node/componentes/esqueletos/esqGerais/NotificacoesDesk";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import AvisoDelecao from "@/node/componentes/esqueletos/esqGerais/avisoDelecao";
import EsqDetalhesRegras from "@/node/componentes/esqueletos/regras/EsqDetalhesRegras";
import ModalAdiar from "@/node/componentes/esqueletos/regras/ModalAdiar";
import ModalReexecutar from "@/node/componentes/esqueletos/regras/ModalReexecutar";
import ModalSilenciar from "@/node/componentes/esqueletos/regras/ModalSilenciar";
import ModalExecutar from "@/node/componentes/esqueletos/regras/ModalVoltarExec";

import { dadosGlobais } from "@/node/globalContext/GlobalContext";
import axios from "axios";

export default function PageDetalheIncidente() {

    const {usuario , token} = dadosGlobais();
    const { id } = useParams();

    //armazena os values da regra;
    const [regra, setRegra] = useState(null);

    //define o modal renderizado;
    const [modal, setModal] = useState(null);
    

    useEffect(() => {
        if (!usuario) return;

        const puxarRegras = async () => {
            try{
                //rota para adicionar user.
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/regras/api/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                console.log(response.data);
                console.log("deu certo")


                setRegra(response.data);
                
            }

            catch(error){
                console.log(error);
            }
        }

        puxarRegras();
        
    }, [usuario]);

    return (
        <>
            <GerenteLayout layout={<HeaderMobile />} />

            <div className="md:flex">
            {/* Sidebar */}
            <GerenteLayout layout={<HeaderDesktop />} />

            {/* Conteúdo principal */}
            <div className="flex flex-col w-full md:w-[74vw] md:justify-center">
                {/* Notificações */}
                <NotificacoesDesk />

            {/* Card centralizado 
                
                - ID serve para o esqueleto do detalhes regras receber o id do detalhamento. Com isso, podendo mandar pra page edição com o id correto

                deletar-regra - gera um modal de deleção. Daí vou implementar depois uma function aqui mesmo pra pedir o request da deleção.

            */}
            <div className="flex justify-center mt-4">
                <EsqDetalhesRegras
                    prioridade={regra?.prioridade || null}
                    regraNome={regra?.nomeDaRegra || null}

                    horario_inicio={regra?.horario_inicio || null}
                    horario_fim={regra?.horario_fim || null}
                    status={regra?.status || null}
                    SQLdaRegra={regra?.sql || null}
                    
                    reexecutar={() => setModal("Reexecutar")}
                    adiar={() => setModal("Adiar")}
                    silenciar={() => setModal("Silenciar")}
                    voltarExecucao={() => setModal("Voltar Execucao")}

                    ID={id}
                    deletarRegra={() => setModal("Deletar")}
                />
            </div>
    </div>

    {/*Modal de  Reexecutar*/}
    {modal === "Reexecutar" && (
        <ModalReexecutar
            fecharOverlay={() => setModal(null)}
            nomeRegra={regra?.nomeDaRegra || null}
        />
    )}


    {/*Modal de  adiar*/}
    {modal === "Adiar" && (
        <ModalAdiar
            fecharOverlay={() => setModal(null)}
        />
    )}

    {/*Modal de  silenciar*/}
    {modal === "Silenciar" && (
        <ModalSilenciar
            fecharOverlay={() => setModal(null)}
            nomeDaRegra={regra?.nomeDaRegra || null}
        />
    )}

    {/*Modal para reexecutar a tarefa. Caso o usuário ele clique em silenciar, renderiza esse modal pelo state global do adiouTarefa */}
    { modal === "Voltar Execucao" &&(
        <ModalExecutar
        fecharOverlay={() => setModal(null)}
        nomeDaRegra={regra?.nomeDaRegra || null}
    />
    )}

    {/*Modal de deletar regra */}
    {modal === "Deletar" && (
        <AvisoDelecao
            fecharOverlay={() => setModal(null)}
            nomeRegra={regra?.nomeDaRegra || null}
            nivelPrioridade={regra?.prioridade || null}
            status={regra?.status  || null}
        />
    )}

    
    
</div>

        </>
    )
}
