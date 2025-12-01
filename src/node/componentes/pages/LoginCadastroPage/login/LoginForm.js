'use client'

import { loginComEmailESenha } from "@/node/lib/firebase/authentication";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { dadosGlobais } from "@/node/globalContext/GlobalContext";
import ErrorModalLogin from "./ErrorModalLogin";

import axios from "axios";

export default function LoginForm() {

  const [dadosLogin, setDadosLogin] = useState({email : "", senha : ""})

  const {login} = dadosGlobais();

  const router = useRouter();

  //Modal Erro
  const [modalErro, setModalErro] = useState(null);

  //Values do Erro

  const [valoresErro, setValoresErro] = useState(
    {nome: "", mensagem: ""}
  ) ;

  const handleChanger = (e) => {
    const {name, value} = e.target;
    setDadosLogin((dadoAtual) => (
      {...dadoAtual, [name] : value}
    ))
  }

  //envio do form
  const envioDeForm = async (e) => {
    e.preventDefault();

    try{
      //Pega os dados do usuario e token gerado pelo firebase
      const {uid, token} =  await loginComEmailESenha(dadosLogin.email, dadosLogin.senha)

      console.log("Login concluido", uid);
      
      //Pega os dados do login via fb e depois puxa o usuario 
      //no db com a autorizacao e assim retorna os dados do fb e do db
      //RETORNA TODOS OS DADOS DO USUARIO
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/loginEcadastro/api/login`, {
        uid: uid,
        email: dadosLogin.email
      })
      
      //Function global, que atualiza o context do user e o do token
      await login(response.data, token);

      //envia pra page inicial de login
      router.push("/incidentes/home")
      
    }

    catch(error){
        setModalErro(true);
        setValoresErro({
          nome: error.name,
          mensagem: error.response?.data?.error || error.message
      });
    }
  }

  return (
    <>
      <main className="relative w-full max-h-[88vh] h-screen bg-white overflow-hidden ">
         
        {/* Login no geral */}
        <section  
          className="
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[90vw] min-w-[345px] max-w-[400px] min-h-[365px]
            shadow-2xl bg-[#007F50] rounded-md
            md:max-w-[600px] md:min-h-[450px] md:h-[48vh]
          "
        >
          {/* Título e botão que envia para page cadastro */}
          <div className="ml-5 text-[#F1F1F1]">
            <h1 
              className="
                mt-[25px] text-[23.5px] font-bold
                md:text-[28px]
              "
            >
              Login
            </h1>

            {/* botão de criar conta */}
            <div className="flex gap-1.5 mt-0.5 mb-4">
              <h2 className="text-[16px] md:text-[18px]">novo?</h2>
              <Link 
                href={"/loginEcadastro/cadastro"}
                className="text-[16px] underline md:text-[18px]"
              >
                Crie sua conta.
              </Link>
            </div>
          </div>

          {/* form de login */}
          <form className="flex flex-col w-[80vw] gap-2 mx-auto md:ml-4.5"
          onSubmit={envioDeForm}
          >
            {/* email */}
            <div className="flex flex-col">
              <label className="text-[white] text-[17px] md:mt-5">Email</label>
              <input
                type="email"
                name="email"
                value={dadosLogin.email}
                onChange={handleChanger}
                className="
                  min-h-[35px] mt-2 p-2 bg-[#f0f0f0] rounded-sm
                  md:max-w-[560px]
                "
                required
              />
            </div>

            {/* senha */}
            <div className="flex flex-col">
              <label className="text-[white] text-[17px]">Senha</label>
              <input
                type="password"
                name="senha"
                value={dadosLogin.senha}
                onChange={handleChanger}
                className="
                  min-h-[35px] mt-2 p-2 bg-[#f0f0f0] rounded-sm
                  md:max-w-[560px]
                "
                required
              />
            </div>

            
          {/* Botão para esquecer a senha */}
          <div className="absolute bottom-20 right-0 pr-5 md:bottom-30 md:right-0 md:pr-5">
            <Link 
              href={'/loginEcadastro/esqueceuSenha/recolheEmail'}
              className="mt-6 text-[white] underline md:text-[18px] "
            >
              Esqueceu a senha?
            </Link>
          </div>



            {/* Botão para efetuar o login */}
            <button 
              type="submit"
              className="
                block w-[80vw] mt-14 mb-4.5 p-2  bg-[#00B77A] font-medium text-center text-[white] rounded-sm 
                md:max-w-[558px]
                md:mt-15
                md:p-3
                md:text-[18px]

                cursor-pointer
              "
            >
              Logar
            </button>
          </form>
          

        </section>

        {/*Modal de erro */}
        {modalErro && (
          <ErrorModalLogin
            fecharModal={() => setModalErro(null)}
            nomeErro={valoresErro.nome}
            mensagemErro={valoresErro.mensagem}
          />
        )}
      </main>
    </>
  )
}
