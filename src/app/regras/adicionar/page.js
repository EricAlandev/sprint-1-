
'use client'

import GerenteLayout from "@/node/layouts/GerenteLayout"
import HeaderMobile from "@/node/componentes/Header/HeaderMobile"
import HeaderDesktop from "@/node/componentes/Header/HeaderDesktop"

import NotificacoesDesk from "@/node/componentes/esqueletos/esqGerais/NotificacoesDesk"

import EsqAdicionarRegra from "@/node/componentes/esqueletos/regras/EsqAdicionarRegra"

import { useRouter } from "next/navigation";


export default function AdicionarRegra() {

    const router = useRouter();

    const Voltar = () => {
        router.push(`/regras/home`)
    }


    return(
        <>
        <GerenteLayout layout={<HeaderMobile/>}/>
            <div className="md:flex">
                <GerenteLayout layout={<HeaderDesktop/>}/>

                <NotificacoesDesk/>

                <div className="
                    md:flex      
                        md:w-[74vw]
                        md:justify-center md:items-center
                    ">
                    <EsqAdicionarRegra
                        fechaOverlay={() => Voltar()}
                    />
                </div>
            </div>

        </>
    )
}