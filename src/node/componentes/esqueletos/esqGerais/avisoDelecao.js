
export default function AvisoDelecao({fecharOverlay, nomeRegra, nivelPrioridade, status}){


    return(
      <>
            {/*Overlay */}
            <div 
                className="fixed inset-0 bg-black opacity-70"
                onClick={() => fecharOverlay()}
             ></div>
            
            {/*Modal para deletar */}
            <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] min-w-[300px] min-h-[400px]  pb-5  bg-white rounded-md
            
            md:min-w-[430px] md:max-w-[30vw] md:min-h-[410px] md:max-h-[410px]
            ">

            {/*Botão para voltar a página de detalhes */}
            <div className="flex justify-end mr-4">
              <img
                      src="/header/Close.png"
                      alt="voltarParaDetalhes"
                      title="voltar para detalhes"

                      className=" max-w-[40px] mt-3.5 ml-5 p-1 border-[1px] rounded-[50%] bg-[#D0D0D0] cursor-pointer md:ml-5"
                      onClick={() => fecharOverlay()}
              />
            </div>

            {/*Título */}
            <h2 className="  mt-[20px] font-medium  text-center  text-[18px]
            
            md:text-center
            ">Deseja deletar esta incidente?</h2>

              {/*Detalhe das regras */}
              <div className="flex flex-col min-w-[50vw] max-w-[60vw] gap-2 mt-3 ml-8.5 mb-12 mx-auto text-[15.5] ">
                <h2 className="w-max pb-1 border-b-[1px]">REGRA: </h2>

                <h2>
                   Regra referenciada : <br/>
                    {nomeRegra}
                </h2>

                <h2>
                   Nivel de prioridade: <br/>
                     {nivelPrioridade}
                </h2>

                <h2>
                   Status atual: <br/>
                    {status}
                </h2>
              </div>

            <button className="block w-full min-w-[150px] max-w-[200px] mx-auto p-2 font-medium text-[white] bg-[red] rounded-sm cursor-pointer">Deletar</button>
        </div>
      </>
    )
}