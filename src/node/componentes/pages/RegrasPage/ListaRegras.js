'use client'

import EsqRegras from "../../esqueletos/regras/EsqRegras";
import { useState, useEffect } from "react"
import { dadosGlobais } from "@/node/globalContext/GlobalContext";
import FiltragemRegras from "./FiltragemRegras";
import axios from "axios";


import { useRouter } from "next/navigation";

export default function ListRegras() {

    const {usuario, token} = dadosGlobais();

    const router = useRouter();

    const [regras, setRegras] = useState([]);

                    useEffect(() => {
                      if (!usuario) return;

                      const puxarRegras = async () => {
                          try{
                              //rota para adicionar user.
                              const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/regras/api/`,{
                                headers : {
                                  Authorization: `Bearer ${token}`
                                }
                              })
              
                              console.log(response.data.regras)
                              console.log("deu certo")


                              setRegras(response.data.regras);
                              
                          }
              
                          catch(error){
                              console.log(error);
                          }
                      }
                      
                      puxarRegras();
                      //A cada 5 segundos, puxa as regras de novo por conta do job;
                      const intervalo = setInterval(puxarRegras, 5000);
                      
                      return () => clearInterval(intervalo);
                  }, [usuario?.roles]);
          

    
    //Function feita para mandar para o detalhamento da rota
    const detalheDinamico = (id) => {
      router.push(`/regras/detalhes/${id}`)

    }

    const adicionarRegraRedirecionamento = () => {
      router.push(`/regras/adicionar`)

    }
 
    return(
      <main>
        

        <FiltragemRegras/>
        
        {/*Título + botão de adicionar regra + teste SQL*/}
        <div className="relative flex items-center ">
            {/*Renderiza o botão de adicionar se for admin  */}
            {(usuario?.autorizacao === "Admin") && (

                      <img
                      src="/genericos/Mais.png"
                      alt="criar"
                      className="absolute left-8.5 max-h-[30px] mt-[12px] z-0 md:left-0 cursor-pointer" 
                      onClick={() => adicionarRegraRedirecionamento()}
                      />
            )}

            {/*Listagem de regras*/}
            <h2 className="w-max  mt-[30px] mb-[20px] mx-auto text-[18px] border-b-[2px] 
            
            md:text-[22px]
            ">
              Listagem de Regras
            </h2>
        </div>
        
        {/* Regras de acordo com as roles */}
<div className="flex flex-col gap-3 mt-2">

{/* Caso não tenha nenhuma regra correspondente */}
{usuario?.autorizacao === "Viewer" && (
  <p className="min-h-[50px] mt-5 text-center text-gray-500 italic">
    Nenhuma regra disponível para esta role.
  </p>
)}

{/* Operador → mostra somente regras da role dele */}
{usuario?.autorizacao === "Operador" && Array.isArray(usuario?.roles) ? (
  regras
    .filter((regra) => usuario.roles.includes(regra.role)) 
    .map((regraFiltrada) => (
      <EsqRegras
        key={regraFiltrada.id}                               
        nomeRegra={regraFiltrada.nome}                       
        descricao={regraFiltrada.descricao}                 
        role={regraFiltrada.role}                            
        prioridade={regraFiltrada.prioridade}               
        status={regraFiltrada.status}                        
        horarioI={regraFiltrada.horario_inicio}       
        horarioF={regraFiltrada.horario_fim}              
        verDetalhes={() => detalheDinamico(regraFiltrada.id)}
      />
    ))
) : (
  usuario?.autorizacao === "Operador" && (
    <p className="min-h-[50px] mt-5 text-center text-gray-500 italic">
      Operador sem nenhuma role
    </p>
  )
)}

{/* Admin → vê todas as regras */}
{usuario?.autorizacao === "Admin" && (
  regras.map((regra) => (
    <EsqRegras
      key={regra.id}
      nomeRegra={regra.nome}
      descricao={regra.descricao}
      role={regra.role}
      prioridade={regra.prioridade}
      status={regra.status}
      horarioI={regra.horario_inicio}
      horarioF={regra.horario_fim}
      verDetalhes={() => detalheDinamico(regra.id)}
    />
  ))
)}

</div>

      </main>
    )
}