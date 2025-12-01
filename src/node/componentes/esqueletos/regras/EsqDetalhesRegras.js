'use client' 

import Link from "next/link";

import { dadosGlobais } from "@/node/globalContext/GlobalContext"

export default function EsqDetalhesRegras({
      regraNome, 
      prioridade, 
      horario_inicio, horario_fim, 
      status,
      SQLdaRegra,

      reexecutar,//serve para reexecutar a tarefa
      adiar, //serve para aditar a tarefa

      silenciar, //serve para silenciar a tarefa
      voltarExecucao, //serve para voltar a executar a tarefa.

      ID,// serve para pegar o ID do detalhamento e assim na page de edição, ter o id correto.
      deletarRegra,  //serve para deletar a regra.
      })
   {

   const {autorizacao, adiouTarefa} = dadosGlobais();

    return(
       <>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:top-auto md:left-0 md:-translate-x-0 md:-translate-y-0
         w-[94vw] 
         md:w-full md:max-w-[750px] bg-[#00875A] rounded-md text-white p-6">
  {/*Tittle, botão de voltar, botão de delete */}     
  <div className="flex items-center mb-4">

    <Link href="/regras/home">
      <img
        src="/genericos/ArrowBackWhite.png"
        alt="arrow back"
        className="w-10 h-10 p-1 rounded-full border"
      />
    </Link>

    {/*button para detalhe da regra */}
    <h1 className="mx-auto text-xl font-medium border-b-2">Detalhamento da Regra</h1>

  </div>
  

  <div className="flex flex-col gap-4 text-[18px]">
    <p><strong>Nome da Regra:</strong><br/>{regraNome}</p>
    <p><strong>Nível de prioridade:</strong><br/>{prioridade}</p>
    <p>
      <strong>Status atual:</strong> <br/>
      <span className={`
        block w-max mt-2 p-2 bg-[white] rounded-sm 
        ${status === "Sucesso" ? 
          "text-[green]" :
          status === "Rodando" ?
          "text-[#E6B800]" : 
          status === "Falhou" ?
          "text-[red]" : ""
      }`}>
          {status}
        </span>
    </p>
    <p><strong>Horário de Início:</strong><br/>{horario_inicio}</p>
    <p><strong>Horário de Fim:</strong><br/>{horario_fim}</p>
    <p><strong>SQL:</strong><br/>{SQLdaRegra}</p>
  </div>
    
  {/*Botões */}
  <div className="grid grid-cols-3 gap-2 mt-5 justify-center md:flex md:flex-row md:gap-3 md:justify-normal">
    
    {/*Botçai de reexecutar a tarefa*/}
    <button className="px-3 py-2 bg-gray-500 rounded text-white text-base md:px-4 md:py-2 cursor-pointer"
    
    onClick={() => reexecutar()}
    >
      Reexecutar
    </button>

    {/*Botões de funções admin*/}
    {(autorizacao === "Admin" || autorizacao == "Operador") && (
      <>
          {/*Botão de adiar regra */}
          <button className="px-3 py-2 bg-gray-500 rounded text-white text-base md:px-4 md:py-2 cursor-pointer"
          
          onClick={() => adiar()}
          >
             Adiar
          </button>

          {/*Botões de execução e de silenciar */}
          {adiouTarefa === true ? (
            <>
                {/*Botão de silenciar regra */}
                <button className="px-3 py-2 bg-gray-500 rounded text-white text-base md:px-4 md:py-2 cursor-pointer"
                
                onClick={() => voltarExecucao()}
                >
                  Rodar de novo
                </button>
            </>
          ) : (
            <>
                {/*Botão de silenciar regra */}
                <button className="px-3 py-2 bg-gray-500 rounded text-white text-base md:px-4 md:py-2 cursor-pointer"
                
                onClick={() => silenciar()}
                >
                  Silenciar
                </button>
            </>
          )}
          
          {autorizacao === "Admin" && (
            <>
                <Link 
            href={`/incidentes/editarRegra/${ID}`}
            className=" items-center"
            >
              <button className="block w-full mx-auto px-4 py-2 bg-white text-[#155DFC] rounded text-base cursor-pointer">Editar</button>
            </Link>
  
            {/*botão de delete */}
            <button 
              onClick={deletarRegra}
              className="block  bg-red-500 md:max-w-[50px] rounded-md"
            >
                <img src="/genericos/trash.png" 
                  alt="" 
                  className=" min-w-[40px] max-w-[40px]  p-1 mx-auto rounded cursor-pointer md:p-2"
                />
            </button>
            </>
          )}
      </>
    )}
  </div>
</div>

       </>
    )
}