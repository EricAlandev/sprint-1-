'use client'

import { recuperarSenha } from "@/node/lib/firebase/authentication";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ErrorModalLogin from "../login/ErrorModalLogin";

export default function RecolheEmail(){

  const [email, setEmail] = useState({email: ""});

  const router = useRouter();

  const [modalError, SetModalError] = useState(null);

  const [dadosError, setDadosError]= useState({nome: "", mensagem: ""});

  {/*Pega o email do users */}
  const handleChanger = (e) => {
    const {name, value} = e.target;
    setEmail((email) => (
      {...email, [name] : value}
    ))
  }

  {/*Enviar seu email para o code */}
  const handleSumbmit = async(e) => {
    e.preventDefault();

    try {
      await recuperarSenha(email.email);
      router.push("/")


    } catch(error) {
      SetModalError(true);
      setDadosError({nome : error.name, mensagem: error.message});
    }
  }

  return(
    <>
      <main className="relative w-full max-h-[88vh] h-screen flex items-center justify-center bg-white overflow-hidden">
      
        {/* Pega o email no geral */}
        <section  
          className="
            w-[90vw] min-w-[345px] max-w-[400px] min-h-[335px]
            shadow-2xl bg-[#007F50] rounded-md
            md:max-w-[600px]  md:h-[35vh] md:min-h-[350px] 
            md:w-full
          "
        >
          {/* Botão para voltar */}
          <Link href={"/"} className="block ml-5 underline">
            <img
              src="/genericos/ArrowBackWhite.png"
              alt="arrow back - color white"
              className="max-w-[40px] mt-3.5 p-1 border-[white] border-[1px] rounded-[50%] md:max-w-[45px]"
            />
          </Link>

          {/* Título e descrição */}
          <div className="text-center text-[#F1F1F1] mt-4">
            <h1 className="text-[23.5px] font-bold md:text-[28px]">Troca de senha</h1>
            <p className="mt-1 mb-2 text-[15px] md:text-[20px]">Digite o email de recuperação</p>
          </div>

          {/* Form */}
          <form 
            onSubmit={handleSumbmit} 
            className="flex flex-col w-[80vw] gap-2 mx-auto md:w-[90%] md:max-w-[560px]"
          >
            <div className="flex flex-col">
              <label className="text-[white] text-[17px]">Email</label>
              <input
                type="email"
                name="email"
                value={email.email}
                placeholder="digite seu email..."
                onChange={handleChanger}
                className="min-h-[35px] mt-2 p-2 bg-[#f0f0f0] rounded-sm placeholder:text-black"
              />
            </div>

             {/* Botão enviar */}
           <button 
             type="submit"
             className="
               block w-[80vw] mt-8 mb-4.5 p-2 mx-auto
               bg-[#00B77A] font-medium text-center text-white  rounded-sm
               md:w-[75vw] md:max-w-[540px] md:p-3
             " 
            >
              Enviar
           </button>
          </form> 

        </section>


        {modalError && (
          <ErrorModalLogin
             fecharModal={() => SetModalError(null)}
             nomeErro={dadosError.nome}
             mensagemErro={dadosError.mensagem}          
          />
        )}
      </main>
    </>
  )
}
