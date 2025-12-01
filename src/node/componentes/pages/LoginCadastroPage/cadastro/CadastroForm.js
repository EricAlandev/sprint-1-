'use client'

import { registrarComEmail } from "@/node/lib/firebase/authentication";
import Link from "next/link";
import { useState } from "react"
import axios from "axios";

import { useRouter } from "next/navigation";

export default function CadastroForm(){
        
        const router = useRouter();

        const horario_atual = new Date()
        const dataConvertida = horario_atual.toISOString().slice(0,10);

        const [dadosCadastro, setDadosCadastro] = useState({nomeFuncionario: "" , matricula: "", email: "",  senha: "", criou_conta_em: dataConvertida})

        //Função para alterar as props
        const handleChanger = (e) => {
            const {name, value} = e.target;
            setDadosCadastro((dadoAtual) => (
                {...dadoAtual, [name] : value}
            ))
        }
        
        //Função de submit
        const handleSubmit = async (e) => {
            e.preventDefault();

            try{
                //Autentificar via firebase
                // - envia os dados para o cadastro do doc
                // - nome do funcionário, matrícula, email, senha.
                const cadastroFirebase = await registrarComEmail(
                    dadosCadastro.email, 
                    dadosCadastro.senha
                )
                
                //rota para adicionar user.
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/usuarios/api`, {
                    nome: dadosCadastro.nomeFuncionario,
                    email: dadosCadastro.email,
                    matricula: dadosCadastro.matricula,
                    uid: cadastroFirebase.uid
                })

                console.log(response.data.mensagem)

                alert(`Enviamos um email para ${dadosCadastro.email} , assim confirmarmos sua conta.
                    `)

                await router.push("/");
            }

            catch(error){
                console.log(error);
            }
        }

        
    return(
        <>

             <div 
              className="
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              w-[90vw] min-w-[345px] max-w-[400px] min-h-[335px]
                shadow-2xl
            bg-[#007F50] rounded-md

             md:max-w-[600px] md:min-h-[52vh]
            "
             >

                    {/*Tittle e botão para ir para page login*/}
                    <div className="ml-5 text-[#F1F1F1] ">
                        <h1 className=" mt-[25px] text-[23.5px] font-bold md: md:text-[28px]">Cadastro</h1>

                        {/*botão de criar conta */}
                        <div className="flex gap-1.5 mt-0.5 mb-4">
                            <h2>Já possui conta?</h2>
                            
                            <Link 
                            href={"/"}
                            className="underline"
                            >
                              Entre aqui.
                            </Link>
                        </div>
                    </div>

                    {/*Form */}
                    <form 
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 ml-5 text-[18px] text-[white]"
                    >
                        
                            {/*Nome do funcionário */}
                            <div>
                                <label className="block mt-[15px] font-medium">Nome Funcionário</label>
                                <input 
                                    type="text"
                                    name="nomeFuncionario"
                                    value={dadosCadastro.nomeFuncionario}
                                    onChange={handleChanger}
                                    placeholder="nome..."
                                    className=" w-[80vw]  mt-[10px] p-1 bg-[white] rounded-sm  
                                    text-[black]
                                    placeholder:text-[black] placeholder:font-medium

                                    md:max-w-[560px] md:p-2
                                    "
                                />
                            </div>

                            {/*Email do funcionário*/}
                            <div>
                                <label className="mt-[10px] font-medium">Email</label>

                                <input
                                type="text"
                                name="email"
                                value={dadosCadastro.email}
                                onChange={handleChanger}
                                placeholder=" email..."
                                className=" w-[80vw]  mt-[10px] p-1 bg-[white] rounded-sm 
                                text-[black]
                                placeholder:text-[black] 
                                md:max-w-[560px] md:p-2
                                "
                                />
                            </div>

                            {/*Matrícula do funcionário*/}
                            <div>
                                <label className="mt-[10px] font-medium">Matrícula</label>
                                <input 
                                    type="text"
                                    name="matricula"
                                    value={dadosCadastro.matricula}
                                    onChange={handleChanger}
                                    placeholder="matricula..."
                                    className=" w-[80vw]  mt-[10px] p-1  bg-[white] rounded-sm
                                    text-[black]
                                    placeholder:font-medium placeholder:text-[black] 
                                    md:max-w-[560px] md:p-2
                                    "
                                />
                            </div>

                            {/*Senha do funcionário*/}
                            <div>
                                <label className="mt-[10px] font-medium">Senha</label>
                                <input 
                                    type="password"
                                    name="senha"
                                    value={dadosCadastro.senha}
                                    onChange={handleChanger}
                                    placeholder="senha..."
                                    className=" w-[80vw]  mt-[10px] p-1 bg-[white] rounded-sm 
                                    text-[black]
                                    placeholder:font-medium placeholder:text-[black] 
                                    md:max-w-[560px] md:p-2
                                    "
                                />
                            </div>

                        <button className="w-[80vw] mt-5 mb-4.5 p-2 bg-[#00B77A]  text-[white] rounded-sm 
                        
                        md:max-w-[560px]
                        md:mt-10
                        md:p-2.5
                        md:text-[18px]
                        ">
                            Adicionar
                        </button>
                    </form>
             </div>
        </>
    )
}