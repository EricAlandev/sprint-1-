




import EsqIncidente from "../../esqueletos/incidentes/EsqIncidente";
import FiltragemIncidente from "./FiltragemIncidente";
import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ListaIncidentes(){

    const router = useRouter();

    const incidentes = [
        {
         id: 1,
         idIncidente : 1,
         prioridade: "Alta",
         regra_do_incidente: "Checagem entrega de pedidos",
         status: "OPEN",
         horario_incidente: "20/10/2025 - 22:50"

        }, 
        
        {
            id: 2,
            idIncidente : 2,
            prioridade: "Média",
            regra_do_incidente: "Verificação de Estoque acabando",
            status: "ACK" ,
            horario_incidente: "20/10/2025 - 22:45",
            comentario_doACK : "estou aqui. Aceitei o incidente"
        },

        {
            id: 3,
            idIncidente : 3,
            prioridade: "Baixa",
            regra_do_incidente: "Verificação de Estoque acabando",
            status: "CLOSED" ,
            horario_incidente: "20/10/2025 - 22:44",
            comentario_doACK : "Aceito o incidente",
            comentario_doCLOSE : "Resolvido o incidente"

        }
        ]

        useEffect(() => {
            const puxarIncidentes = async () => {
                try{
                    //rota para adicionar user.
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/usuario/adicionarSendoAdm`, {
                        id: usuario.id,
                        nome: dadosCadastro.nomeFuncionario,
                        email: dadosCadastro.email,
                        matricula: dadosCadastro.matricula,
                        uid: cadastroFirebase.uid,
                        autorizacao: dadosCadastro.autorizacao, 
                        CANAIS_DIGITAIS: dadosCadastro.CANAIS_DIGITAIS,
                        FINANCEIRO: dadosCadastro.FINANCEIRO
                    })
    
                    console.log(response.data.mensagem)
                    alert("Funcionário Cadastrado")
                }
    
                catch(error){
                    console.log(error);
                }
            }

            puxarIncidentes();
        }, []);


        //Function feita para mandar para o detalhamento da rota
        const detalheDinamico = (id) => {
          router.push(`/incidentes/detalhes/${id}`)

        }

    return(
        <>

            
            <main>
                {/*Título + botão de adicionar regra */}
                <div className="relative flex items-center ">

                    <h2 className=" mt-[50px] mx-auto text-[18px] border-b-[2px] md:text-[22px]">
                    Listagem de Incidentes
                    </h2>
                </div>
                
                {/*Filtragem */}
                <FiltragemIncidente/>

                    {/*Incidentes */}
                    <div className="flex flex-col gap-3 mt-6">
                    {incidentes.map((incidente) => (
                        <EsqIncidente
                            key={incidente.id}
                            idIncidente={incidente.idIncidente}
                            prioridade={incidente.prioridade}
                            nomeRegraReferenciada={incidente.regra_do_incidente}
                            status={incidente.status}
                            horarioIncidente={incidente.horario_incidente}
                            
                            verDetalhes={() => detalheDinamico(incidente.id)}
                            
                        />

                    ))}
                </div>

            </main>
        </>
    )
}