'use client'

import CadastroForm from "@/node/componentes/pages/LoginCadastroPage/cadastro/CadastroForm"
import GerenteLayout from "@/node/layouts/GerenteLayout"
import { useState } from "react"

export default function Cadastro(){



    return(
        <>
            <GerenteLayout/>
            <CadastroForm/>
        </>
    )
}