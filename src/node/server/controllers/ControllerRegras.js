import pool from "@/node/lib/database/db";

export const ControllerAdicionarRegra = async ({ body }) => {
    const { 
      nomeDaRegra, 
      descricao, 
      nivelPrioridade, 
      bancoDeDados, 
      horarioI, 
      horarioF, 
      sql, 
      CANAIS_DIGITAIS, 
      FINANCEIRO
    } = body;

    if (!nomeDaRegra || !descricao || !nivelPrioridade || !bancoDeDados || !horarioI || !horarioF || !sql) {
      throw new Error("Campos obrigatórios não preenchidos.");
    }

    if (!CANAIS_DIGITAIS && !FINANCEIRO) {
      throw new Error("Nenhuma query selecionada. Selecione pelo menos CANAIS_DIGITAIS ou FINANCEIRO.");
    }

    const sqlInserirRegra = `
      INSERT INTO regras (nome, descricao, sql_query, database) 
      VALUES ($1, $2, $3, $4) RETURNING id;
    `;
    const valuesRegra = [nomeDaRegra, descricao, sql, "postgresSQL"];
    const criarRegra = await pool.query(sqlInserirRegra, valuesRegra);
    const regraId = criarRegra.rows[0].id;

    const sqlExecucaoRegras = `
      INSERT INTO execucao_regras (regras_id, prioridade, status, horario_inicio, horario_fim) 
      VALUES ($1, $2, $3, $4, $5);
    `;
    const dataAtual = new Date();
    let status = dataAtual <= horarioI ? "Rodando" : "espera";
    const valuesExecucao = [regraId, nivelPrioridade, status, horarioI, horarioF];
    await pool.query(sqlExecucaoRegras, valuesExecucao);

    if (CANAIS_DIGITAIS) {
      const sqlRegrasRoles = `
        INSERT INTO regras_roles (role_id, regras_id) 
        VALUES ($1, $2);
      `;
      await pool.query(sqlRegrasRoles, [1, regraId]);
    }

    if (FINANCEIRO) {
      const sqlRegrasRolesFinanceiro = `
        INSERT INTO regras_roles (role_id, regras_id) 
        VALUES ($1, $2);
      `;
      await pool.query(sqlRegrasRolesFinanceiro, [2, regraId]);
    }

    return { success: true };
};

export async function listarRegrasPorRoles({ uid }) {
    const sql_VerificaRoles = `
      SELECT array_agg(r.role) AS roles
      FROM usuarios u
      JOIN user_roles ur ON ur.usuario_id = u.id
      JOIN roles r ON r.id = ur.role_id
      WHERE u.uid = $1
      GROUP BY u.uid;
    `;

    const envio = await pool.query(sql_VerificaRoles, [uid]);
    if (!envio.rows || envio.rows.length === 0) throw new Error("Usuário não encontrado");

    const roleUsuario = envio.rows[0]?.roles;
    if (!roleUsuario) throw new Error("Usuário sem roles no banco");

    const sql = `
      SELECT 
        r.*,
        rr.role_id,
        ro.role,
        ro.description,
        er.prioridade,
        er.status,
        er.horario_inicio,
        er.horario_fim
      FROM regras r
      JOIN regras_roles rr ON rr.regras_id = r.id
      JOIN roles ro ON ro.id = rr.role_id
      JOIN execucao_regras er ON er.regras_id = r.id
      WHERE ro.role = ANY($1)
      ORDER BY r.nome;
    `;
    const resultado = await pool.query(sql, [roleUsuario]);

    return {
      quantidade: resultado.rows.length,
      regras: resultado.rows
    };
}

export async function pegaRegraPorId({ params }) {
    if (!params) throw new Error("Sem id de usuário");

    const sql = `
      SELECT r.id, r.nome, r.descricao, r.sql_query, r.database,
             er.id as id_execucao, er.prioridade, er.status,
             er.horario_inicio, er.horario_fim, er.silenciado
      FROM regras r
      JOIN execucao_regras er ON er.regras_id = r.id
      WHERE r.id = $1
      LIMIT 1;
    `;
    const envio = await pool.query(sql, [params]);
    const dadosRegra = envio.rows[0];
    if (!dadosRegra) throw new Error("Regra não encontrada");

    return {
      id: dadosRegra.id,
      nomeDaRegra: dadosRegra.nome,
      descricao: dadosRegra.descricao,
      sql: dadosRegra.sql_query,
      database: dadosRegra.database,
      prioridade: dadosRegra.prioridade,
      status: dadosRegra.status,
      horario_inicio: dadosRegra.horario_inicio,
      horario_fim: dadosRegra.horario_fim,
      silenciado: dadosRegra.silenciado
    };
}
