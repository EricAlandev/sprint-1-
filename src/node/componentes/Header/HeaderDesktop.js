'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dadosGlobais } from "@/node/globalContext/GlobalContext";

export default function HeaderDesktop(){

    const {usuario } = dadosGlobais();
    
        const pathname = usePathname();
    


    return(
      <>
        <header className="hidden md:block ">

            {/*Hamburguer que vai abrir a direita */}
                <>


                    {/*Hamburguer em si */}
                    <div className="w-[21vw] min-w-[230px] 
                    max-w-[350px]  h-full min-h-[100vh]  bg-[#007F50] z-15">
                        {/*Logo */}    
                        <Link 
                            href={'/incidentes/home'}
                            className=""
                        >
                            <img
                            src="/header/Log.png"
                            alt=""
                            className="w-auto max-w-[160px]  mx-auto md:pt-2"
                            />
                        </Link>
                    
                     {/*Hamburguer em si  */}
                    <div className="w-full h-full bg-[#00875A]">
                      <nav>
                        <ul className="flex flex-col min-h-[30px] mt-2 font-medium text-[18px] text-[white]">

                            {/* Incidentes */}
                            <li>
                            <Link
                                href={"/incidentes/home"}
                                className={`block w-full pt-3 pb-3 pl-4 duration-300
                                ${ pathname === '/incidentes/home' || pathname.startsWith === '/incidentes/home/detalhes'
                                    ? "pb-1.5 pl-2 border-b-[2px] bg-[#00986A]"
                                    : "" }`}
                            >
                                <div className="flex items-center gap-[12px]">
                                <img src="/logoHeader/Incidentes.png" alt="logo of incidentes page" className="w-[30px] h-[30px]" />
                                <p>Incidentes</p>
                                </div>
                            </Link>
                            </li>

                            {/* Execução de Regras */}
                            <li>
                            <Link
                                href={"/regras/home"}
                                className={`block w-full pt-3 pb-3 pl-4 duration-300
                                ${ pathname === '/regras/home' ? "pb-1.5 border-b-[2px] bg-[#00986A]" : "" }`}
                            >
                                <div className="flex items-center gap-[12px]">
                                <img src="/logoHeader/Regras.png" alt="" className="w-[30px] h-[30px]" />
                                <p>Execução de Regras</p>
                                </div>
                            </Link>
                            </li>

                            {/* Teste Sandbox (não Viewer) */}
                            {usuario?.autorizacao !== "Viewer" && (
                            <li>
                                <Link
                                href={"/testeSQL"}
                                className={`block w-full pt-3 pb-3 pl-4 duration-300
                                    ${ pathname === '/testeSQL' ? "pb-1.5 pl-2 border-b-[2px] bg-[#00986A]" : "" }`}
                                >
                                <div className="flex items-center gap-[13.5px]">
                                    <img src="/logoHeader/Sandbox.png" alt="logo of page Sandbox" className="w-[28px] h-[28px]" />
                                    <p>Teste Sandbox</p>
                                </div>
                                </Link>
                            </li>
                            )}

                            {/* Central de Escalonamento (Admin) */}
                            {usuario?.autorizacao === "Admin" && (
                            <li>
                                <Link
                                href={"/escalonamento/home"}
                                className={`block w-full pt-3 pb-3 pl-4 duration-300
                                    ${ pathname === '/escalonamento/home' ? "pb-1.5 pl-2 border-b-[2px] bg-[#00986A]" : "" }`}
                                >
                                <div className="flex items-center gap-[13.5px]">
                                    <img src="/logoHeader/Escalonamento.png" alt="logo of page escalonamento" className="w-[30px] h-[30px]" />
                                    <p>Central de Escalonamento</p>
                                </div>
                                </Link>
                            </li>
                            )}

                            {/* Logs (Admin) */}
                            {usuario?.autorizacao === "Admin" && (
                            <li>
                                <Link
                                href={"/logs"}
                                className={`block w-full pt-3 pb-3 pl-4 duration-300
                                    ${ pathname === '/logs' ? "pb-1.5 pl-2 border-b-[2px] bg-[#00986A]" : "" }`}
                                >
                                <div className="flex items-center gap-[10px]">
                                    <img src="/logoHeader/Logs.png" alt="logo of page Logs.png" className="w-[35px] h-[35px]" />
                                    <p>Logs</p>
                                </div>
                                </Link>
                            </li>
                            )}

                            {/* Gerenciador do Admin (Admin) */}
                            {usuario?.autorizacao === "Admin" && (
                            <li>
                                <Link
                                href={"/admin"}
                                className={`block w-full pt-3 pb-3 pl-4 duration-300
                                    ${ pathname === '/admin' ? "pb-1.5 pl-2 border-b-[2px] bg-[#00986A]" : "" }`}
                                >
                                <div className="flex items-center gap-[13.5px]">
                                    <img src="/logoHeader/Admin.png" alt="logo of page admin" className="w-[30px] h-[30px]" />
                                    <p>Gerenciador do Admin</p>
                                </div>
                                </Link>
                            </li>
                            )}

                            {/* Help (não Viewer) */}
                            {usuario?.autorizacao !== "Viewer" && (
                            <li>
                                <Link
                                href={"/help"}
                                className={`block w-full pt-3 pb-3 pl-4 duration-300
                                    ${ pathname === '/help' ? "pb-1.5 pl-2 border-b-[2px] bg-[#00986A]" : "" }`}
                                >
                                <div className="flex items-center gap-[10px]">
                                    <img src="/logoHeader/Help.png" alt="" className="w-[35px] h-[35px]" />
                                    <p>Help</p>
                                </div>
                                </Link>
                            </li>
                            )}
                       </ul>
                    </nav>    
                      </div>
                    </div>
                </>
        </header>
      </>
    )
}