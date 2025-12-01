import { VerifyToken } from "@/node/lib/database/VerificaToken";
import { pegaRegraPorId } from "@/node/server/controllers/ControllerRegras";;

//Puxa a regra específica;
export async function GET( req , {params}){

    try{
        //verifica token 
        const {uid} = await VerifyToken(req);

        //Se o usuário for authentificado, permite o controller;
        if (uid){
            //manda o id
            const puxaDados = await pegaRegraPorId ({params});

            console.log(params);

            return new Response(
                JSON.stringify(puxaDados),
                {
                  status: 201,
                  headers: { "Content-Type": "application/json" },
                }
              );
        }
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