
import HeaderMinimalista from "../Header/HeaderMinimalista"

export async function GerenteLayout({layout}){

    return(
        <>
            {layout ? layout : <HeaderMinimalista/>}
        </>
    )
}