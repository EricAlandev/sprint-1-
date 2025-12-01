'use client'

import NotificacoesDesk from "@/node/componentes/esqueletos/esqGerais/NotificacoesDesk"
import EsqTestarSQL from "@/node/componentes/esqueletos/regras/EsqTestarSQL"
import HeaderDesktop from "@/node/componentes/Header/HeaderDesktop"
import HeaderMobile from "@/node/componentes/Header/HeaderMobile"
import GerenteLayout from "@/node/layouts/GerenteLayout"
import { useState } from "react"

import { dadosGlobais } from "@/node/globalContext/GlobalContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function TesteSQL(){


    const {autorizacao} = dadosGlobais();
            
        const navigate = useRouter();
        
    
    //Pegar o sql que o usuário escrever
    const [sqlDigitado, setSQLdigitado] = useState({sql: ''})

    const [resposta, setRespota] = useState(false);

    useEffect( () => {
        
        if(autorizacao !== null){
            if (autorizacao === "Viewer"){
                navigate.push("/incidentes/home")
            }
        }
    
        
    
    
    }, [autorizacao] );

    const pegarValor = (e) => {
        const {name, value} = e.target;
        setSQLdigitado((sql) => (
            {...sql, [name] : value}
        ))
    }

    const enviarForm = (e) => {
        e.preventDefault();

        try{
            setRespota(true)
        }

        catch{

        }
    }

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
          <GerenteLayout layout={<HeaderMobile/>}/>
          
          <div className="md:flex">
            <GerenteLayout layout={<HeaderDesktop/>}/>

                <NotificacoesDesk/>

                <div
                    className="md:flex
                    md:w-[74vw]
                    md:justify-center md:items-center"
                >
                    <EsqTestarSQL/>
                </div>
                
          </div>
        </>
    )
}