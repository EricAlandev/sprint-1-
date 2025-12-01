

'use client'

import { dadosGlobais } from "@/node/globalContext/GlobalContext";

export default function ModalExecutar({fecharOverlay, nomeDaRegra}){

    const {definiAdiado} = dadosGlobais();

    const VoltaExecucao = () => {
        definiAdiado(null);
        fecharOverlay();
    }

    return(
      <>
            {/*Overlay */}
            <div 
                className="fixed inset-0 bg-black opacity-70"
                onClick={() => fecharOverlay()}
             ></div>
            
            {/*Modal para deletar */}
            <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] min-w-[300px] min-h-[200px]  pb-5  bg-white rounded-md
            
            md:min-w-[430px] md:max-w-[30vw] md:min-h-[200px] md:max-h-[300px]
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
            ">
                Quer voltar a execução da regra? <br/>
                <span className="pb-2 font-light border-[#D0D0D0] border-b-[2px]">
                    {nomeDaRegra} ?
                </span>
            </h2>


            {/*Botões para confirmar ou negar */}
            <div className="flex gap-10 mt-10 mb-5 justify-center">
                <button
                 className="min-w-[100px] p-2 bg-[#00875A] text-[white] rounded-md cursor-pointer"

                 onClick={() => VoltaExecucao()}
                >
                    Sim
                </button>
    
                <button
                 className="min-w-[100px] p-2  bg-[red] text-[white] rounded-md cursor-pointer"

                 onClick={() => fecharOverlay()}
                >
                    Não
                </button>
    
            </div>
        </div>
      </>
    )
}