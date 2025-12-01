
import { ControllerAdicionarRegra } from "@/node/server/controllers/ControllerRegras";
import { VerifyToken } from "@/node/lib/database/VerificaToken";
import { VerificaAutorizacao } from "@/node/lib/database/VerificaAutorizacao";

import { listarRegrasPorRoles } from "@/node/server/controllers/ControllerRegras";



//Puxa a regra específica;
export async function GET(req){

    try{
        //verifica token 
        const uid = await VerifyToken(req);

        //Se o usuário for authentificado, permite o controller;
        if (!uid){
                throw new Error("Usuário não autentificado");
            }

        const adicionarRegras = await listarRegrasPorRoles({ uid });

         // Retorna resposta bem-sucedida
        return new Response(
            JSON.stringify(adicionarRegras),
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
            }
        );

    }

    

    catch(error){
        return new Response(
            JSON.stringify({ error: error.message || "Erro interno do servidor" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
    }

}

export async function POST(req) {
  try {
    // Lê o corpo da requisição (como JSON)
    const body = await req.json();

    //Verifica o token
    const uid = await VerifyToken(req);

    if (!uid){
        throw new Error("Usuário sem authentificação");
    }

    //Verifica Autorização
    await VerificaAutorizacao(uid);

    // Chama o controller passando o body
    const adicionarUsuario = await ControllerAdicionarRegra({ body });

    // Retorna resposta bem-sucedida
    return new Response(
      JSON.stringify(adicionarUsuario),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
    }
    
  catch (error) {
    console.error("Erro ao adicionar usuário:", error);

    return new Response(
      JSON.stringify({ error: error.message || "Erro interno do servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
