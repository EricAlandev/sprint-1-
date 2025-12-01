
'use client'
import axios from "axios"
import { useState, useEffect } from "react"

export default function MetricasKpis(){

    //Armazena os values das métricas
    const [metricas, SetMetricas] = useState(null);

    //Busca as métricas em tempo real
    const PegaMetricas = async () => {
        try{
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL2}/metricas`);

            SetMetricas(response.data);
            console.log(metricas);
        }

        catch(error){

        }
    }

    //Puxa as métricas automaticamente a cada 5 segundos
    useEffect(() => {
        PegaMetricas();

        const intervalo = setInterval(PegaMetricas, 5000)

        return () => clearInterval(intervalo);
    }, [])



    return(
        <>  
            <div className="

            relative flex flex-col w-[90vw] min-w-[300px] max-w-[360px] mt-[30px] mx-auto z-0 

               md:w-[48vw] md:max-w-[800px] 
            ">
                
                    {/*Métricas */}
                    <div className="flex flex-col">

                        <div className="grid grid-cols-2 grid-rows-2  gap-2
                
                        md:flex md:flex-row  md:gap-2">
                            {/*dados métricas */}
                            <div 
                            className=" max-h-[60px] bg-green-100 p-3 gap-2 rounded-md flex  justify-between items-center
                            
                            md:flex-col md:flex-1 md:max-w-[150px] md:max-h-[150px] 
                            ">
                                <span className="text-[16px]">OPEN</span>
                                <span className="font-bold text-green-600 text-[16px]">
                                    {metricas?.incidentes_abertos}
                                    </span>

                            </div>

                            

                            {/*ACK */}
                            <div 
                            className="max-h-[60px] bg-yellow-100 p-3 gap-3 rounded-md flex  justify-between  items-center

                            md:flex-col md:flex-1 md:max-w-[150px] md:max-h-[150px] "
                            >
                                <span>ACK</span>
                                <span className="font-bold text-yellow-600 text-xl">
                                    {metricas?.incidentes_ack}
                                </span>
                            </div>

                            {/*CLOSED */}
                            <div 
                            className="max-h-[60px] bg-red-100 p-3 gap-0 rounded-md flex  justify-between items-center

                            md:flex-col md:flex-1 md:max-w-[150px] md:max-h-[150px]
                            ">
                                <span>CLOSED</span>
                                <span className="font-bold text-red-600 text-xl">
                                    {metricas?.incidentes_closed}
                                </span>

                            </div>

                           {/* MTTA - tempo médio de reconhecimento */}
                            <div 
                            className="max-h-[60px] bg-gray-100 p-3 gap-2 rounded-md flex justify-between items-center
                            md:flex-col md:max-w-[150px] md:max-h-[150px]"
                            >
                            <span>MTTA</span>
                            <span className="font-bold text-gray-700  text-[18px] md:text-xl">3 minutos</span>
                            </div>

                            {/* MTTR - tempo médio de resolução */}
                            <div 
                            className="max-h-[60px] bg-gray-100 p-3 gap-2 rounded-md flex justify-between items-center
                            md:flex-col md:max-w-[150px] md:max-h-[150px]"
                            >
                            <span>MTTR</span>
                            <span className="font-bold text-gray-700 text-[18px] md:text-xl">3 minutos</span>
                            </div>


                            
                            {/*Baixar csv  - somente mobile*/}
                            <div className="absolute top-34 right-0 flex w-max gap-4 p-2 items-center bg-[#00875A]  rounded-md md:hidden">
                                <img
                                  src="/genericos/csv.png"
                                  alt=""
                                  className=" max-w-[33px]  md:hidden "
                                />

                                
                            </div>

                            {/*Baixar csv  - somente desktop*/}
                            <div className="md:relative md:w-10">
                                <img
                                src="/genericos/csv.png"
                                alt=""
                                className="hidden md:block  md:mt-10 md:flex-1 md:max-w-[50px]  md:p-2 cursor-pointer bg-[#00875A] rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                

            </div>



        </>
    )
}