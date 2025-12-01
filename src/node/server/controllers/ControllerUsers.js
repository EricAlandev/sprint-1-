import pool from "@/node/lib/database/db.js";
import { DeletarUsuarioViaFirebase } from "@/node/lib/database/DeletarUsuarioViaFb";
import { palavrasProibidas } from "@/node/lib/database/TablesPermitidas";
import { AtualizarUsuarioViaFirebase } from "@/node/lib/database/updateDados";

//Listar todos os usuários
export async function listarUsuarios() {
  const sql = `
    SELECT
      u.id,
      u.nome,
      u.matricula,
      u.autorizacao,
      u.email,
      ARRAY_AGG(r.role) AS roles
    FROM usuarios u
    JOIN user_roles ur
      ON ur.usuario_id = u.id
    JOIN roles r
      ON r.id = ur.role_id
    WHERE ativo = true
    GROUP BY u.id
    ORDER BY u.nome;
  `;

  const resultado = await pool.query(sql);

  return {
    quantidade: resultado.rows.length,
    usuarios: resultado.rows
  };
}

//USUARIOS EM ESPERA DA PERMISSAO DO ADMIN

export const listaUsuariosEmEspera = async () => {
    
  const sql = `select * from usuarios
      where ativo = false `;
  const query = await pool.query(sql);

  const array = query.rows;

  return array;
}

//Dar permissão para o usuário entrar no site.
export const PermitirUsuario = async ({idUsuario}) => {
    const sql = `update usuarios set ativo = true where id = $1`;

    const envio = await pool.query(sql, [idUsuario]);

    if (envio.rowCount === 0){
      throw new Error("Usuário não encontrado");
    }
}

//Filtra os usuários de acordo com o pedido;

export const filtragemUsuarios = async ({body}) => {
    console.log(body);

    const {pesquisa, admin, operador, viewer} = body;

    if (!pesquisa && !admin && !operador && !viewer){
       return [];
    }

    const condicao = [];
    const value = [];

    if(pesquisa){
       value.push(`%${pesquisa}%`);
       condicao.push(`nome ILIKE $${value.length}`)
    }

    if (admin){
        value.push('Admin');
        condicao.push(`autorizacao = $${value.length}`);
    }

    if (operador){
      value.push('Operador');
      condicao.push(`autorizacao = $${value.length}`);
    }

    if (viewer){
        value.push('Viewer');
        condicao.push(` autorizacao = $${value.length}`);
    }

    if (Object.keys(palavrasProibidas).find(palavra => condicao.some((valorAtual) => valorAtual.includes(palavra)))) {
      throw new Error("Palavras proibidas");
    } else if (condicao.some((palavraAtual) => palavraAtual.includes(";"))) {
      throw new Error("Palavras proibidas");
    }

    const sql = `SELECT u.*, array_agg(r.role) as roles
        FROM usuarios u
        JOIN user_roles ur ON ur.usuario_id = u.id
        JOIN roles r ON r.id = ur.role_id 
        ${'WHERE ' + condicao.join(" AND ")}
        GROUP BY u.id`;

    const envioSQL = await pool.query(sql, value);
    return envioSQL.rows;
}

//Function feita para depois do login,
//pegar os dados do login auth
export const pegaAutorizacaoDoUser = async (req, res) => {
  const { uid, email } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ message: "Campos obrigatórios faltando." });
  }

  const sql_acharUsuario = `
  SELECT
   u.id,
   u.nome,
   u.uid,
   u.matricula,
   u.autorizacao,
   array_agg(r.role) as roles_user
  FROM usuarios u
  JOIN user_roles ur ON ur.usuario_id = u.id
  JOIN roles r ON r.id = ur.role_id
  WHERE u.uid = $1
  group by u.id;
  `;

  const resultado = await pool.query(sql_acharUsuario, [uid]);
  const usuario = resultado.rows[0];

  if (!usuario) {
    throw new Error("Usuário não encontrado.");
  }

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: email,
    uid: uid,
    matricula: usuario.matricula,
    autorizacao: usuario.autorizacao,
    roles: usuario.roles_user
  };
};

//CRUD usuario
export async function adicionarUsuarioController({ body }) {
    const { nome, email, matricula, uid } = body;

    if (!nome || !email || !matricula) {
      throw new Error("Campos obrigatórios ausentes: nome, email ou matrícula.");
    }

    const sql = `INSERT INTO usuarios (uid, nome, email, matricula, autorizacao, ativo)
                 VALUES ($1, $2, $3, $4, $5 , $6)
                 RETURNING *;`;

    const envio = await pool.query(sql, [uid, nome, email, matricula, "Viewer", false]);

    const sqlRole = `INSERT INTO user_roles (role_id, usuario_id) VALUES(3, $1) RETURNING *;`;
    const envioRole = await pool.query(sqlRole, [envio.rows[0].id]);

    if (!envioRole.rows[0]){
      throw new Error("Falha na criação da role")
    }

    return {mensagem: "usuário cadastrado"}
}

//Alterar dados sendo usuario
export async function alterarDadosSendoUser({bodyAtualizado}){
   const {uid, nome, email, matricula , senha} = bodyAtualizado;

   if (!uid && !nome && !email && !matricula && !senha){
    throw new Error("sem dados para alterar");
   }

   const values = [];
   const campos = [];

   if (nome){
    values.push(nome);
    campos.push(`nome = $${values.length}`);
   }

   if (email){
    values.push(email);
    campos.push(`email = $${values.length}`);
   }

   if (matricula){
    values.push(matricula);
    campos.push(`matricula = $${values.length}`);
   }

   values.push(uid);

   if (campos.length > 0){
    const sql = `update usuarios set ${campos.join(",")} where uid = $${values.length} RETURNING *`
    await pool.query(sql, values);

    const sqlRoles = `select u.*, array_agg(r) as roles 
    from usuarios u 
    join user_roles ur ON ur.usuario_id = u.id
    join roles r on r.id = ur.role_id
    group by u.id`

    const envio = await pool.query(sqlRoles);
    return envio.rows[0];
   }

   throw new Error("sem dados para alterar");
}

//CRUD admin
export async function adicionarUsuarioSendoAdmin({ body }) {
  const { id, nome, email, matricula, uid, autorizacao, CANAIS_DIGITAIS, FINANCEIRO } = body;

  if (!id || !nome || !email || !matricula ||  !autorizacao) {
    throw new Error("Campos obrigatórios ausentes: nome, email ou matrícula ou autorizacao");
  }

  if (!CANAIS_DIGITAIS && !FINANCEIRO){
    throw new Error("Não definiu role")
  }

  const sql_verificaAdmin = "select autorizacao from usuarios where id = $1"
  const verificacao = await pool.query(sql_verificaAdmin,[id])

  if (verificacao.rows[0].autorizacao !== "Admin"){
    throw new Error ("Apenas admins")
  }

  const sql = `INSERT INTO usuarios (uid, nome, email, matricula, autorizacao, ativo)
               VALUES ($1, $2, $3, $4, $5, $6)
               RETURNING *;`;

  const envio = await pool.query(sql, [uid, nome, email, matricula, autorizacao, true]);
  const usuario_id = envio.rows[0].id

  if (CANAIS_DIGITAIS){
    await pool.query("INSERT INTO user_roles(role_id, usuario_id) values($1, $2)", [1, usuario_id])
  }

  if (FINANCEIRO){
    await pool.query("INSERT INTO user_roles(role_id, usuario_id) values($1, $2)", [2, usuario_id])
  }

  return {mensagem: "usuário cadastrado"}
}

//alterar dados sendo adm
export const AlterarDadosSendoAdm = async ({ bodyAtualizado }) => {
  const { funcionarioID, nome, email, matricula, autorizacao, CANAIS_DIGITAIS, FINANCEIRO } = bodyAtualizado;
  
  if (!funcionarioID) {
    throw new Error("Usuário não especificado");
  }

  const sqlFuncionar = `select uid from usuarios where id = $1`;
  const envioSQL = await pool.query(sqlFuncionar, [funcionarioID]);
  const uidFuncionario = envioSQL.rows[0].uid;

  await AtualizarUsuarioViaFirebase(uidFuncionario, email, null);

  const campos = [];
  const valores = [];

  if (nome) {
    campos.push(`nome = $${campos.length + 1}`);
    valores.push(nome);
  }

  if (email) {
    campos.push(`email = $${campos.length + 1}`);
    valores.push(email);
  }

  if (matricula) {
    campos.push(`matricula = $${campos.length + 1}`);
    valores.push(matricula);
  }

  if (autorizacao) {
    campos.push(`autorizacao = $${campos.length + 1}`);
    valores.push(autorizacao);
  }

  if (campos.length > 0){
   valores.push(funcionarioID);
   const sqlAlterar = `UPDATE usuarios SET ${campos.join(", ")} WHERE id = $${valores.length}`;
   await pool.query(sqlAlterar, valores);
  }

  if (CANAIS_DIGITAIS || FINANCEIRO) {
    await pool.query(`DELETE FROM user_roles WHERE usuario_id = $1`, [funcionarioID]);
    
    if (CANAIS_DIGITAIS) {
      await pool.query(`INSERT INTO user_roles(role_id, usuario_id) VALUES(1, $1)`, [funcionarioID]);
    }
    
    if (FINANCEIRO) {
      await pool.query(`INSERT INTO user_roles(role_id, usuario_id) VALUES(2, $1)`, [funcionarioID]);
    }
  }

  if (campos.length === 0 && (!CANAIS_DIGITAIS && !FINANCEIRO)){
    throw new Error ("Nenhum campo para atualizar")
  }

  return { mensagem: "Usuário atualizado com sucesso", uid: uidFuncionario };
};

//Deleta o usuário no database e no firebase.
export const DeletarUsuario = async ({funcionarioID}) => {
  const sqlAcharUid = `select * from usuarios where id = $1 `;
  const envio = await pool.query(sqlAcharUid, [funcionarioID]);

  if (envio.rowCount === 0){
    throw new Error ("Usuário não encontrado no db")
  }

  const usuarioUID = envio.rows[0].uid;

  const sql = `delete from usuarios where id = $1`
  const deletado = await pool.query(sql, [funcionarioID]);

  if (deletado.rowCount === 0){
    throw new Error ("falha ao deletar o usuário")
  }

  await DeletarUsuarioViaFirebase(usuarioUID);

  return {mensagem: "funcionário deletado"}
}
