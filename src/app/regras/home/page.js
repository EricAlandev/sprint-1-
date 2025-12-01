import NotificacoesDesk from "@/node/componentes/esqueletos/esqGerais/NotificacoesDesk";
import HeaderDesktop from "@/node/componentes/Header/HeaderDesktop";
import HeaderMobile from "@/node/componentes/Header/HeaderMobile";
import ListRegras from "@/node/componentes/pages/RegrasPage/ListaRegras";
import GerenteLayout from "@/node/layouts/GerenteLayout";


export default function Home(){
//Page ação de regras    

    return(
       <>
          {/*Layout */}
         <GerenteLayout layout={<HeaderMobile/>}/>
         
         <div className="md:flex">
            <GerenteLayout layout={<HeaderDesktop/>}/>

            <NotificacoesDesk/>

            <div className="
                   md:flex      
                    md:w-[74vw]
                    md:justify-center md:items-center
                  "
            >
               <ListRegras/>
            </div>
         </div>
         

       </>
    )
}