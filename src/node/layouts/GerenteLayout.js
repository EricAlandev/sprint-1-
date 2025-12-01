import HeaderMinimalista from "../componentes/Header/HeaderMinimalista"


export default function GerenteLayout({children, layout}) {

    return(
     <> 
       {layout ? layout : <HeaderMinimalista/>}
       {children}
     </>
    )
}