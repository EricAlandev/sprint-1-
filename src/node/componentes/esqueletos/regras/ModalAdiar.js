
export default function ModalAdiar({fecharOverlay, nomeRegra, nivelPrioridade, status}){


    return(
      <>
            {/*Overlay */}
            <div 
                className="fixed inset-0 bg-black opacity-70"
                onClick={() => fecharOverlay()}
             ></div>
            
            {/*Modal para deletar */}
            <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] min-w-[300px] min-h-[200px]  pb-5  bg-white rounded-md
            
            md:min-w-[430px] md:max-w-[30vw] md:min-h-[100px] md:max-h-[300px]
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
                Adiar a tarefa
            </h2>

            <form
            
             className="flex flex-col mt-5 ml-4"
            >
                <label className="text-[18px]">Adiar até:</label>
                <input
                  type="datetime-local"
                  className="mt-2 mr-2 p-2 bg-[#D0D0D0] rounded-md"
                />

                <button className="mt-10 mr-2 p-2 text-[white] bg-[#00875A]  rounded-md md:cursor-pointer">Adiar</button>
            </form>
        </div>
      </>
    )
}