

export default function FiltragemRegras() {

    return(
      <>
        {/*Filtragem de regras */}
                <section className="z-0" >
                            <form className=" 
                            flex flex-col w-[90vw] min-w-[300px] max-w-[360px] mt-[30px] mx-auto z-0 
                            mt-8.5

                             md:w-[48vw] md:max-w-[800px] 
                            ">
                                
                                {/*barra pesquisa */}
                                <div className="flex">
                                    <input
                                    placeholder="Pesquisar regra..."
                                    className=" p-1.5 w-full bg-[#D0D0D0] text-center rounded-l-[8px] md:p-2"
                                    />
            
                                    <img
                                        src="/regrasPage/Search.png"
                                        alt=""
                                        className=" max-h-[36.5px] bg-[#F0F0F0] rounded-r-[8px] md:max-h-[40] md:p-1"
                                    />
                                </div>
            
                                <h2 className="w-max  mt-[10px] mb-[10px] mx-auto text-[18px] border-b-[2px] ">Filtros</h2>
                                
                                {/*Filtagrem */}
                                <div className="flex flex-col gap-4">
                                    {/*filtragem por checkbox */}
                                    <div
                                    className="flex w-auto min-w-[300px] max-w-[360px] gap-4 mx-auto items-center text-[16px]"
                                    >
                                        <h2> Status: </h2>
                                        
                                        <div className="
                                        grid grid-cols-2 grid-rows-2 gap-2  mx-auto 
                                        
                                        md:flex md:gap-4
                                        ">
                                            
                                            <div className="flex gap-1">
                                                <input
                                                type="checkbox"
                                                
                                                />
            
                                                <p>Sucesso</p>
                                            </div>
            
                                            <div className="flex gap-1">
                                                <input
                                                type="checkbox"
                                                
                                                />
            
                                                <p>Falhou</p>
                                            </div>
            
                                            <div className="flex gap-1">
                                                <input
                                                type="checkbox"
                                                
                                                />
            
                                                <p>Rodando</p>
                                            </div>
            
                                            <div className="flex gap-1">
                                                <input
                                                type="checkbox"
                                                
                                                />
            
                                                <p>Timeout</p>
                                            </div>
                                        </div>
                                    </div>
            
                                    {/*filtragem por Prioridade */}
                                    <div
                                    className="flex w-auto min-w-[300px] max-w-[360px] gap-4 mt-[10px] mx-auto items-center text-[15.5px]" 
                                    >
                                        <h2> Prioridades: </h2>
                                        
                                        <div className=" flex items-center gap-2">
                                          
                                            <select
                                                name="status"
                                                className="max-w-[80vw] p-1 bg-[#A0A0A0] rounded-sm placeholder:font-medium"
                                            >
                                                <option value={"Alta"}>Alta</option>
                                                <option value={"Media"}>Média</option>
                                                <option value={"Baixa"}>Baixa</option>
        
                                            </select>
            
                                        </div>
                                    </div>
                                </div>
            
            
                            </form>
            
                        </section>
      </>
    )
}