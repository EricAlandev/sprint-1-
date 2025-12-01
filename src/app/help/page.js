'use client'

import NotificacoesDesk from "@/node/componentes/esqueletos/esqGerais/NotificacoesDesk";
import HeaderDesktop from "@/node/componentes/Header/HeaderDesktop";
import HeaderMobile from "@/node/componentes/Header/HeaderMobile";
import Dicionario from "@/node/componentes/pages/help/Dicionario";
import GerenteLayout from "@/node/layouts/GerenteLayout";

import { dadosGlobais } from "@/node/globalContext/GlobalContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Help(){

    const {autorizacao} = dadosGlobais();
        
    const navigate = useRouter();

    useEffect( () => {
    
                if(autorizacao !== null){
                    if (autorizacao === "Viewer"){
                        navigate.push("/incidentes/home")
                    }
                }
    
                
            
    
        }, [autorizacao] );
    
        
        if (autorizacao === null) {
                return (
                    <>
                            <GerenteLayout/>
                            <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2      -translate-y-1/2"
                            >
                             Carregando...
                            </h1>
                    </>
                )
        }

    return(
      <>
        <GerenteLayout layout={<HeaderMobile/>}  />
                        
                        {/*
                        Div feita para na versão de desktop, separar os dois 
                        */}
                         <div className="md:flex">
                            <GerenteLayout layout={<HeaderDesktop/>}  />
        
                            <NotificacoesDesk/>
                            
                             {/*
                                centraliza apenas a lista de funcionários
                            */}
                            <div 
                            className="
                            md:flex md:w-[74vw] md:justify-center md:items-center">
                                <Dicionario/>
                            </div>
                         </div>
      </>
    )
}