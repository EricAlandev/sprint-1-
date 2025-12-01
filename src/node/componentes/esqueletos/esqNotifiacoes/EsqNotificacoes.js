
'use client'

import { useRouter } from "next/navigation";

export default function EsqNotificacoes({ prioridade, nomeRegra, horario, status }) {

    const router = useRouter();

    const enviarParaIncidente = () => {
        router.push("/incidentes/home")
    }

    /*
        ESQUELETO DAS NOTIFICAÇÕES 
        -- PARA VER O ESQUELETO DO MENU, Olhar NotificacoesDesk
    */

    return (
      <div className="flex flex-col gap-1 mt-3 mx-3 p-1.5 rounded-lg bg-white shadow-md border border-gray-200 transition-all 
      
      md:p-3
      md:cursor-pointer
      
      "
      
      onClick={() => enviarParaIncidente()}
      >
  
        {/* Cabeçalho do card */}
        <div className="flex justify-between items-center">
          <h2 className="  
           text-[13.5px] font-semibold text-red-600 
          md:text-[14px]
          ">
            Incidente
          </h2>
  
          {/* Ícone de deletar */}
          <img
            src="/genericos/trash.png"
            alt="Excluir"
            className="h-[23px] w-[23px]  p-[4px] bg-red-500 
            rounded-md
            
            md:hover:bg-red-700 md:cursor-pointer duration-120"
          />
        </div>
  
        {/* Nome da regra */}
        <p 
          className="text-[13px] text-gray-800 font-medium 
          md:text-[12.5px]
        ">
          {nomeRegra}
        </p>
  
        {/* Prioridade */}
        <p className="text-[13px] text-gray-600 md:text-[12.5px]">
          Prioridade:
          <span
            className={`ml-1 font-bold ${
              prioridade === "Alta"
                ? "text-red-600"
                : prioridade === "Média"
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {prioridade || "N/A"}
          </span>
        </p>
  
        {/* Horário */}
        <p className="
        text-[13px] text-gray-500 italic 
        md:text-[12.5px]
        ">
          {horario}
        </p>
  
        {/* Status */}
        <p
          className={`text-[13px] font-semibold md:text-[13px] ${
            status === "OPEN"
              ? "text-green-600"
              : ""
          }`}
        >
          Status: {status}
        </p>
      </div>
    );
  }
  