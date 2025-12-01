
'use client'

import { useState } from "react"

export default function EsqEditarRegra({voltarParaDetalhes}){

    const [dadosParaEditar, setDadosParaEditar] = 
    useState({
            nomeDaRegra: "", 
            nivelPrioridade: "",
            horarioI : "",
            horarioF : "",
            status: "",
            sql: ""
        })

    const handleChanger = (e) => {
        const {name, value} = e.target;
        setDadosParaEditar((dadoAtual) => (
            {...dadoAtual, [name] : value}
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Como é só protótipo, eu acabei deixando sendo o response, o axios.
        try{
            console.log("enviou")
        }

        catch(error){
            console.log("não enviou")

        }

    }

    return(
    <>

        {/*formulário para editar os values. */}
        <div
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[67vh]  mx-auto p-4 bg-[#00875A] rounded-md shadow-md mt-6 overflow-y-auto
    
        md:static md:translate-x-0 md:translate-y-0

        md:w-[48vw] md:max-w-[800px] 
        md:h-[82vh] md:min-h-[755px]"
        >

                
                {/*Botão para voltar a página de detalhes */}
                <img
                    src="/genericos/ArrowBackWhite.png"
                    alt="voltarParaDetalhes"
                    className="absolute top-0 left-1 max-w-[40px] mt-3.5 ml-5 p-1 border-[1px] border-[white] rounded-[50%] cursor-pointer"
                    title="voltar para detalhes"
                    onClick={() => voltarParaDetalhes()}
                />

            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-10 ml-2 text-[18px] 
                 md:ml-2.5"
            >
                
                    {/*Nome da Regra */}
                    <div>
                        <label className="block mt-[15px] font-medium text-[white]">Nome Regra</label>
                        <input 
                            type="text"
                            name="nomeDaRegra"
                            value={dadosParaEditar.nomeDaRegra}
                            onChange={handleChanger}
                            placeholder="novo nome..."
                            className=" w-[80vw]  mt-[10px] p-1 bg-[white]  rounded-sm    
                            placeholder:text-[black] placeholder:font-medium  
                            
                            md:w-[44vw] md:max-w-[755px]
                            "
                        />
                    </div>

                    {/*Nivel Prioridade*/}
                    <div>
                        <label className="mt-[10px]  font-medium text-[white]">Prioridade</label>
                        <select
                         type="text"
                         name="nivelPrioridade"
                         value={dadosParaEditar.nivelPrioridade}
                         onChange={handleChanger}
                         className=" w-[80vw]  mt-[10px] p-1 
                         bg-[white] rounded-sm

                         md:w-[44vw] md:max-w-[755px]
                         "
                        >
                            <option value={"Alta"}>Alta</option>
                            <option value={"Media"}>Média</option>
                            <option value={"Baixa"}>Baixa</option>
        

                        </select>
                    </div>

                    
                    {/*Banco de dados */}
                    <div>
                        <label className="mt-[10px] font-medium text-[white]">Banco de dados</label>
                        
                        <select
                            name="bancoDeDados"
                            value={dadosParaEditar.bancoDeDados}
                            onChange={handleChanger}
                            className=" w-[80vw]  mt-[10px] p-1 bg-[white] rounded-sm placeholder:font-medium
                            
                            md:w-[44vw] md:max-w-[755px]
                            "
                        >
                            <option value={"postgre"}>PostgresSQL</option>
                            <option value={"oracle"}>Oracle</option>

                        </select>
                    </div>

                    {/*Horario Início*/}
                    <div>
                        <label className="mt-[10px] font-medium text-[white]">Data de Início</label>
                        <input 
                            type="datetime-local"
                            name="horarioI"
                            value={dadosParaEditar.horarioI}
                            onChange={handleChanger}
                            placeholder="data..."
                            className=" w-[80vw]  mt-[10px] p-1 
                            bg-[white] rounded-sm   placeholder:font-medium
                             placeholder:text-[black] 
                            
                            md:w-[44vw] md:max-w-[755px]
                            "
                        />
                    </div>

                    {/*Horario de Fim*/}
                    <div>
                        <label className="mt-[10px] font-medium text-[white]">Data de fim</label>
                        <input 
                            type="datetime-local"
                            name="horarioF"
                            value={dadosParaEditar.horarioF}
                            onChange={handleChanger}
                            className=" w-[80vw]  mt-[10px] p-1 
                            bg-[white] rounded-sm placeholder:font-medium
                            
                            md:w-[44vw] md:max-w-[755px]
                            "
                        />
                    </div>

                    {/*SQL da regra*/}
                    <div>
                        <label className="mt-[10px] font-medium text-[white]">SQL</label>
                        <textarea 
                            name="sql"
                            value={dadosParaEditar.sql}
                            onChange={handleChanger}
                            placeholder="novo sql..."
                            className=" w-[80vw] min-h-[120px]  mt-[10px] p-1 bg-[white] rounded-sm placeholder:font-medium
                            placeholder:text-[black] 
                            
                            md:w-[44vw] md:max-w-[755px]
                            "
                        />
                    </div>

                <button className="w-[80vw] p-2 bg-[#00986A]  text-[white] rounded-sm 
                
                md:w-[44vw] md:max-w-[755px] md:cursor-pointer
                ">
                    Alterar
                </button>
            </form>
        </div>
    </>
    )
}