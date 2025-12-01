'use client'

import { useState } from "react";
import axios from "axios";

export default function EsqTestarSQL() {
  const [sqlDigitado, setSQLdigitado] = useState({sql: ""});
  
  const [resposta, setResposta] = useState(null);
  const [erro, setError] = useState(null);


  const pegarSql = (e) => {
    const {name, value} = e.target;
    setSQLdigitado((sql) => (
       {...sql, [name] : value}
    ))

  }

  //teste de sql
  const enviarForm = async (e) => {
    e.preventDefault();
    try {

      //Antes de fazer uma query nova, limpa o estado da resposta, pra prevenir bugs
      setResposta(null);
      setError(null);

      //request
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/testeSQL/api`, {
        sql: sqlDigitado.sql
      })

      //Pega o resultado do request que é um objeto e transforma em stringify pra retornar o value inteiro.
      setResposta(JSON.stringify(response.data))

    } catch (error) {
    
      setError(error?.response?.data?.error || error.message || "Erro desconhecido");

    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[46vh] mx-auto p-4 bg-[#00875A] rounded-md shadow-md mt-6
    
    md:static md:translate-x-0 md:translate-y-0

    md:w-[48vw] md:max-w-[800px] 
    md:min-h-[420px]
    ">

      <form onSubmit={enviarForm} className="flex flex-col gap-4">
        <label className=" font-medium text-[18px] text-center text-[white] z-0">Teste de SQL</label>

        <textarea
          name="sql"
          value={sqlDigitado.sql}
          onChange={pegarSql}
          placeholder="Digite o SQL"
          className="w-full min-h-[120px] p-2 bg-[#F0F0F0] rounded-sm placeholder:font-bold "
        />

        {/*Resposta renderiza ao usuário */}
        {(resposta || erro) && (
          <>
            <h2 className="text-[white]">Resposta: </h2>

            <div className="w-full h-[120px] bg-[white] overflow-y-auto
            
            md:min-w-[35vw]   
            md:w-[45.5vw] md:max-w-[770px] 
            ">
  
                <p className={
                  ` mt-3 font-medium  text-[black] text-center
                   ${resposta ? "text-[green]" : "text-[red]"} 
                   `
                }>
                    {resposta || erro}
                </p>
            </div>
          </>
        )}

        <button
          type="submit"
          className="absolute bottom-0 min-w-[82vw] max-w-[82vw] mb-4 p-2 bg-[#00B77A] text-white rounded-sm font-medium
          
            md:min-w-[35vw]  
            md:w-[45.5vw] md:max-w-[770px] 
            cursor-pointer
          "
        >
          Testar
        </button>
      </form>
    </div>
  );
}
