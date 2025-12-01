


export default function FiltragemIncidente(){


    return(
        <>
            {/*Filtragem de incidentes */}
            <section className="z-0" >
                <form className=" 
                flex flex-col w-[90vw] min-w-[300px] max-w-[360px] mt-[25px] mx-auto z-0 

                 md:w-[48vw] md:max-w-[800px] 
                ">
                    
                    {/*barra pesquisa */}
                    <div className="flex ">
                        <input
                        placeholder="Pesquisar incidente..."
                        className=" p-1.5 w-full bg-[#D0D0D0] text-center rounded-l-[8px] md:p-2 "
                        />

                        {/*Lupa de pesquisa */}
                        <img
                            src="/regrasPage/Search.png"
                            alt=""
                            className=" max-h-[36.5px] bg-[#F0F0F0] rounded-r-[8px] md:max-h-[40] md:p-1"
                        />
                    </div>
                    
                    {/*Filtagrem */}
                    <div className="flex flex-col gap-4">
                        {/*filtragem por checkbox */}
                        <div
                        className="flex w-auto min-w-[300px] max-w-[300px] gap-4 mt-4.5 mx-auto text-[16px]"
                        >
                            <h2> Status: </h2>
                            
                            <div className="flex  gap-2 items-center ">
                                
                                <div className="flex gap-1">
                                    <input
                                    type="checkbox"
                                    
                                    />

                                    <p>OPEN</p>
                                </div>

                                <div className="flex gap-1">
                                    <input
                                    type="checkbox"
                                    
                                    />

                                    <p>ACK</p>
                                </div>

                                <div className="flex gap-1">
                                    <input
                                    type="checkbox"
                                    
                                    />

                                    <p>CLOSED</p>
                                </div>
                            </div>
                        </div>

                        {/*filtragem por Prioridade */}
                        <div
                        className="flex w-auto min-w-[300px] max-w-[300px] gap-4 mt-[10px] mx-auto text-[15.5px]" 
                        >
                            
                            <h2> Prioridades: </h2>
                            
                            <div className=" flex items-center gap-2">
                            
                                <select
                                    name="status"
                                    className="max-w-[80vw] p-1 bg-[#D0D0D0] rounded-sm placeholder:font-medium"
                                >
                                    <option value={"Sucesso"}>Sucesso</option>
                                    <option value={"Em Andamento"}>Em Andamento</option>
                                    <option value={"Incidente"}>Incidente</option>

                                </select>

                            </div>

                            </div>
                        </div>
                </form> 
            </section>
        </>
    )
}