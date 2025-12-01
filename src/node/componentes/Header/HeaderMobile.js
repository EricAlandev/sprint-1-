'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { dadosGlobais } from "@/node/globalContext/GlobalContext";

export default  function HeaderMobile() {

    const {usuario } = dadosGlobais();

    const pathname = usePathname();

    //state feito pro droper
    const [hamburguer, setHamburguer] = useState(false);

    // Trava o scroll do body quando o hamburguer estiver aberto
    useEffect(() => {
        if (hamburguer) {
          document.body.style.overflow = "hidden"; // desativa scroll
        } else {
          document.body.style.overflow = "auto"; // ativa scroll
        }
      }, [hamburguer]);

    return(
        <header className="block md:hidden w-full min-h-[60px] bg-[#00875A]">
            
            <div className="w-full flex pt-2 pb-1 justify-center items-center">
                {/*Hamburguer Menu */}
                <img 
                    src="/header/hamburguerMenu.png"
                    alt="hamburguer menu"
                    className="absolute left-4 max-h-[35px]"
                    onClick={() => setHamburguer(!hamburguer)}
                />
                    
                {/*Logo */}    
                <Link 
                    href={'/incidentes/home'}
                    className=""
                >
                    <img
                    src="/header/Log.png"
                    alt=""
                    className="w-auto max-w-[140px] mx-auto"
                    />
                </Link>
            </div>
            
            {/*Hamburguer que vai abrir a direita */}
            {hamburguer && (
                <>
                    {/*Overlay */}
                    <div 
                    className="fixed inset-0 bg-black opacity-70 z-10" 
                    onClick={() => setHamburguer(!hamburguer)}
                    >
                        
                    </div>


                    {/*Hamburguer em si */}
                    <div className="absolute top-0 left-0 min-w-[300px] h-full bg-[#007F50] z-15">
                        <img
                          src="/header/Close.png"
                          alt=""
                          className="min-h-[25px] mt-4 ml-4 "
                          onClick={() => setHamburguer(!hamburguer)}
                        />
                    
                     {/*DROPERS */}
                     <div className="w-full h-full bg-[#00875A]">
                        <nav>
                            <ul className="flex flex-col min-h-[30px] mt-6 font-medium text-[18px] text-[white]">
                                
                                <li>
                                    <Link 
                                    href={"/incidentes/home"}
                                    className={`block w-full pt-3 pb-3 pl-4 duration-300
                                        ${ pathname === '/incidentes/home' ? " pb-1.5 pl-2 border-b-[2px] bg-[#00986A]" : ""}
                                        `}
                                    >
                                        Incidentes
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                    href={"/regras/home"}
                                    className={`block w-full pt-3 pb-3 pl-4 duration-300 
                                        ${ pathname === '/regras/home' ? " pb-1.5 border-b-[2px] bg-[#00986A]" : ""}
                                        `}
                                    >
                                        Execução de Regras
                                    </Link>
                                </li>

                                {/*Teste SQL*/}
                                {(usuario?.autorizacao !== "Viewer") && (
                                    <li>
                                    <Link 
                                    href={"/testeSQL"}
                                    className={`block w-full pt-3 pb-3 pl-4 duration-300
                                        ${ pathname === '/testeSQL' ? " pb-1.5 pl-2 border-b-[2px] bg-[#00986A]" : ""}
                                        `}
                                    >
                                        Teste Sandbox
                                    </Link>
                                </li>
                                )}

                                {/*Apenas Admin */}
                                {usuario?.autorizacao === "Admin" && (
                                <li>
                                    <Link 
                                    href={"/logs"}
                                    className={`block w-full pt-3 pb-3 pl-4  duration-300
                                        ${ pathname === '/logs' ? " pb-1.5 pl-2 border-b-[2px] bg-[#00986A]" : ""}
                                        `}
                                    >
                                        Logs
                                    </Link>

                                </li>
                                )}

                                {/*Apenas Admin */}
                                {usuario?.autorizacao === "Admin" && (
                                <li>
                                    <Link 
                                    href={"/escalonamento/home"}
                                    className={`block w-full pt-3 pb-3 pl-4  duration-300
                                        ${ pathname === '/escalonamento/home' ? " pb-1.5 pl-2 border-b-[2px] bg-[#00986A]" : ""}
                                        `}
                                    >
                                        Central de Escalonamento
                                    </Link>

                                </li>
                                )}

                                {/*Apenas admin */}
                                {usuario?.autorizacao === "Admin" && (
                                <li>
                                    <Link 
                                    href={"/admin"}
                                    className={`block w-full pt-3 pb-3 pl-4  duration-300
                                        ${ pathname === '/admin' ? " pb-1.5 pl-2 border-b-[2px] bg-[#00986A]" : ""}
                                        `}
                                    >
                                        Gerenciador do Admin
                                    </Link>

                                </li>
                                )}

                                {/*Apenas Admin */}
                                {usuario?.autorizacao !== "Viewer" && (
                                <li>
                                    <Link 
                                    href={"/help"}
                                    className={`block w-full pt-3 pb-3 pl-4  duration-300
                                        ${ pathname === '/help' ? " pb-1.5 pl-2 border-b-[2px] bg-[#00986A]" : ""}
                                        `}
                                    >
                                        Help
                                    </Link>

                                </li>
                                )}

                            </ul>
                        </nav>
                      </div>
                    </div>
                </>
            )}
        </header>
    )
}