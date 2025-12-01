'use client'

import HeaderDesktop from "@/node/componentes/Header/HeaderDesktop";
import HeaderMobile from "@/node/componentes/Header/HeaderMobile";
import GerenteLayout from "@/node/layouts/GerenteLayout";

import ListaIncidentes from "@/node/componentes/pages/incidentesPage/ListaIncidentes";
import MetricasKpis from "@/node/componentes/pages/RegrasPage/MetricasKpis";

import NotificacoesDesk from "@/node/componentes/esqueletos/esqGerais/NotificacoesDesk";



export default function Incidentes(){
    

    return(
        <>
            <GerenteLayout layout={<HeaderMobile/>} />
            
                <div className="md:flex">
                <GerenteLayout layout={<HeaderDesktop/>}/>

                    <NotificacoesDesk/>

                    <div className="md:flex  md:flex-col 
                    md:w-[74vw]
                    md:justify-center md:items-center">
                    <MetricasKpis />
                    <ListaIncidentes/>
                    </div>
                </div>
       

        </>
    
    )
}