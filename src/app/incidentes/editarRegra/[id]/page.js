
'use client'

import EsqEditarRegra from "@/componentes/esqueletos/regras/EsqEditarRegra";
import HeaderDesktop from "@/componentes/Header/HeaderDesktop";
import HeaderMobile from "@/componentes/Header/HeaderMobile";
import GerenteLayout from "@/node/layouts/GerenteLayout";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import NotificacoesDesk from "@/componentes/esqueletos/esqGerais/NotificacoesDesk";

export default function editarRegra(){

    //ID da page
    const {id} = useParams();

    const router = useRouter();

    const Voltar = () => {
        router.push(`/regras/detalhes/${id}`)
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
                                <EsqEditarRegra
                                    voltarParaDetalhes={() => Voltar()}
                                
                                />
                      </div>
                            
            </div>
                

        </>
    )
}