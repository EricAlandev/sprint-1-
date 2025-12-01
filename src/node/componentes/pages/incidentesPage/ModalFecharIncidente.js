

export default function ModalFecharIncidente({fecharOverlay}){

    return(
      <>
        {/*Overlay */}
        <div 
            className="fixed inset-0 bg-black opacity-70"
            onClick={() => fecharOverlay()}
         ></div>
        
        {/*Modal para deletar */}
        <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] min-w-[300px] min-h-[350px]  pb-5  bg-white rounded-md
        
        md:min-w-[430px] md:max-w-[30vw] 
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
            <h2 className="  mt-[10px] font-medium  text-center  text-[22px]
            
             md:mt-[20px]  md:text-[21px] md:text-center
            ">
                Fechar incidente
            </h2>

            <form>
                <textarea
                 placeholder="comente porque vai fechar..."
                 className="block w-[80vw] min-h-[150px] mx-auto mt-[15px] p-2 bg-[#D0D0D0] rounded-md md:w-[25vw] md:min-w-[370px] md:mt-[20px]  "
                >

                </textarea>

                <button className="block mx-auto min-w-[200px] mt-[20px] px-4 py-2.5 text-[white] bg-[red] rounded-md">
                    Fechar
                </button>
            </form>
        </div>

  </>
)
}
