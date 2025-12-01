
'use client'

import { useState } from "react"
import { dadosGlobais } from "@/node/globalContext/GlobalContext"
import axios from "axios"

export default function EsqAdicionarRegra({fechaOverlay}){

    const {token} = dadosGlobais();

    const [dadosParaEditar, setDadosParaEditar] = 
    useState({
            nomeDaRegra: "", 
            descricao: "",
            nivelPrioridade: "",
            bancoDeDados: "postgres",
            horarioI : "",
            horarioF : "",
            sql: "",
            CANAIS_DIGITAIS : "",
            FINANCEIRO: "",
        })

    const handleChanger = (e) => {
        const {name, value} = e.target;
        setDadosParaEditar((dadoAtual) => (
            {...dadoAtual, [name] : value}
        ))

        console.log(dadosParaEditar)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Como é só protótipo, eu acabei deixando sendo o response, o axios.
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/regras/api`, {
                nomeDaRegra: dadosParaEditar.nomeDaRegra,
                descricao: dadosParaEditar.descricao,
                nivelPrioridade: dadosParaEditar.nivelPrioridade,
                bancoDeDados: dadosParaEditar.bancoDeDados,
                horarioI: dadosParaEditar.horarioI,
                horarioF: dadosParaEditar.horarioF,
                sql: dadosParaEditar.sql,
                CANAIS_DIGITAIS: dadosParaEditar.CANAIS_DIGITAIS,
                FINANCEIRO: dadosParaEditar.FINANCEIRO
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            alert("Regra adicionada!")
        }

        catch(error){
            console.log("não enviou")

        }

    }

    return(
    <>

        {/*formulário para editar os values. */}
        <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[67vh] mx-auto p-4 bg-[#00875A] rounded-md shadow-md mt-6 overflow-y-auto
        
        
        md:overflow-y-auto
        md:static md:translate-x-0 md:translate-y-0

        md:w-[40.5vw] md:min-w-[625px] md:max-w-[800px] 
        md:h-[84vh] md:min-h-[790px] "
        >
            
            <div className="relative flex">
                {/*Botão para voltar a página de detalhes */}
                <img
                        src="/genericos/ArrowBackWhite.png"
                        alt="voltarParaDetalhes"
                        className=" absolute left-2.5 max-w-[40px] mt-3.5  p-1 border-[1px] border-[white] rounded-[50%] cursor-pointer
                        
                        "
                        title="voltar para detalhes"
                        onClick={() => fechaOverlay()}
                />

                <h2 className="w-max mt-4 mx-auto font-medium border-b-[1px] text-[white]">
                    Adicionar regra
                </h2>
            </div>

            {/*Form */}
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-2.5 ml-2 text-[18px] md:ml-2.5"
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
                            className=" w-[80vw]  mt-[10px] p-2 bg-[white] rounded-sm placeholder:font-medium placeholder:text-[black]
                            
                            md:w-[44vw] md:max-w-[715px]
                            "
                        />
                    </div>

                    {/*Descricao da Regra */}
                    <div>
                        <label className="block mt-[15px] font-medium text-[white] md:mt-[0px]">Descrição da regra</label>
                        <input 
                            type="text"
                            name="descricao"
                            value={dadosParaEditar.descricao}
                            onChange={handleChanger}
                            placeholder="novo nome..."
                            className=" w-[80vw]  mt-[10px] p-2 bg-[white] rounded-sm placeholder:font-medium placeholder:text-[black]
                            
                            md:w-[44vw] md:max-w-[715px]
                            "
                        />
                    </div>

                    {/*Nivel Prioridade*/}
                    <div>
                        <label className="mt-[10px] font-medium text-[white]">Prioridade</label>
                        <select
                         type="text"
                         name="nivelPrioridade"
                         value={dadosParaEditar.nivelPrioridade}
                         onChange={handleChanger}
                         placeholder="novo nome..."
                         className=" w-[80vw]  mt-[10px] p-2 bg-[white] rounded-sm
                         
                         md:w-[44vw] md:max-w-[715px]
                         "
                         required
                        >
                            <option value={""}>selecione...</option>
                            <option value={"Alta"}>Alta</option>
                            <option value={"Media"}>Média</option>
                            <option value={"Baixa"}>Baixa</option>

                        </select>
                    </div>

                    {/*Banco de dados*/}
                    <div>
                        <label className="mt-[10px] font-medium text-[white]">Banco de dados</label>
                        
                        <select
                            name="bancoDeDados"
                            value={dadosParaEditar.bancoDeDados}
                            onChange={handleChanger}
                            className=" w-[80vw]  mt-[10px] p-2 bg-[white] rounded-sm placeholder:font-medium
                            
                            md:w-[44vw] md:max-w-[715px]
                            "
                        >
                            <option value={"postgres"}>PostgresSQL</option>
                            <option value={"oracle"}>Oracle</option>
                        </select>
                    </div>

                    {/*Role do funcionário*/}
                    <div className="flex gap-5 mt-2 mb-2 text-[white] uppercase">
                        <label>Roles: </label>

                        <div className="flex items-center gap-6">
                            <label className="min-w-[151px] max-w-[151px]">canais_digitais</label>
                            <input
                              type="checkbox"
                              name="CANAIS_DIGITAIS"
                              checked={dadosParaEditar.CANAIS_DIGITAIS}
                              onChange={handleChanger}

                            />
                        </div>

                        <div className="flex items-center gap-6">
                            <label className="min-w-[50px] max-w-[151px]">Financeiro</label>
                            <input
                              type="checkbox"
                              name="FINANCEIRO"
                              checked={dadosParaEditar.FINANCEIRO}
                              onChange={handleChanger}

                            />
                        </div>
                    </div>

                    {/*Horario Início*/}
                    <div>
                        <label className="mt-[10px] font-medium text-[white]">Data de Início</label>
                        <input 
                            type="datetime-local"
                            name="horarioI"
                            value={dadosParaEditar.horarioI}
                            onChange={handleChanger}
                            className=" w-[80vw]  mt-[10px] p-2 bg-[white] rounded-sm placeholder:font-medium
                            
                            md:w-[44vw] md:max-w-[715px]
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
                            className=" w-[80vw]  mt-[10px] p-2 bg-[white] rounded-sm placeholder:font-medium
                            
                            md:w-[44vw] md:max-w-[715px]
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
                            className=" w-[80vw] min-h-[120px]  mt-[10px] p-2 bg-[white] rounded-sm placeholder:font-medium
                            
                            md:w-[44vw] md:max-w-[715px]
                            "
                        />
                    </div>

                <button 
                    className="w-[80vw] p-2  text-[white]  bg-[#00B77A] rounded-sm 
                    md:w-[44vw] md:max-w-[715px]
                ">
                    Adicionar
                </button>
            </form>
        </div>
    </>
    )
}