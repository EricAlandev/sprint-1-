


export async function POST(req) {
  try {
    // Lê o corpo da requisição (como JSON)
    const body = await req.json();

    // Chama o controller passando o body
    const adicionarUsuario = await AdicionarRegra({ body });

    // Retorna resposta bem-sucedida
    return new Response(
      JSON.stringify(adicionarUsuario),
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
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
