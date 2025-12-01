
// /api/usuario/adicionarUsuario
import { pegaAutorizacaoDoUser } from "@/node/server/controllers/ControllerUsers.js";

import { VerificaSePermitido } from "@/node/lib/database/VerificaSePermitido";

export async function POST(req) {
  try {
    // Lê o corpo da requisição (como JSON)
    const body = await req.json();

    //Verifica se o usuário foi permitido no db
    await VerificaSePermitido(body.uid);

    // Chama o controller passando o body
    const todosOsValores = await pegaAutorizacaoDoUser({ body });

    // Retorna resposta bem-sucedida
    return new Response(
      JSON.stringify(todosOsValores),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);

    return new Response(
      JSON.stringify({ error: error.message || "Erro interno do servidor" }),
      {
        status: `${error.status}`,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
