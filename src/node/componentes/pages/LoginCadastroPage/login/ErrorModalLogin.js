

export default function ErrorModalLogin ({
    fecharModal, 
    nomeErro,  
    mensagemErro,
    botao
}){

    return(
     <>
       {/*overlay */}
       <div className="fixed inset-0 bg-[black] opacity-70"></div>
      
       {/*Modal */}
        <div 
       className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[33.5vh] bg-[white] rounded-md
       
       md:w-[35vw]
       "
        >

              {/*Botão fechar modal */}
              <div className="flex justify-end mt-4 mr-4">
                <img
                    src="/header/Close.png"
                    alt=""
                    onClick={() => fecharModal()}
                    className=" max-h-[40px] p-2 bg-[#D0D0D0] rounded-[50%]
                    cursor-pointer
                    "
                  />
              </div>
              
              {/*Imagem de erro, título, mensagem de erro */}
              <div className="flex flex-col items-center  mt-2 ">
                  {/*Imagem de erro */}
                  <img
                   src="/error/alert.png"
                   alt="alert photo"
                   className="mb-2"
                  />

                  {/*tittle e mensagem do erro */}
                  <div>
                    <h2 className="mt-4 font-medium text-[18px] text-center">
                      {nomeErro}
                    </h2>

                    <p className="font-light text-center text-[16px] md:max-w-[350px]">
                      "{mensagemErro}"
                    </p>

                    {botao && (
                      <button
                        onClick={botao}
                        className="block mx-auto mt-4 p-2 bg-[green] 
                        text-[white] rounded-md cursor-pointer"
                      >
                        Já verifiquei o email
                      </button>
                    )}
                  </div>
              </div>
        </div>
     </>
    )
}