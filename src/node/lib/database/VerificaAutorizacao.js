import pool from "./db";

// VerificaAutorizacao.js - ADICIONE ESTE DEBUG
export const VerificaAutorizacao = async (usuarioUID) => {
      
      console.log(usuarioUID);
      const sqlVerificaAutorizacao = `SELECT * FROM usuarios WHERE uid = $1 AND autorizacao = 'Admin'`;

      console.log(sqlVerificaAutorizacao);

      const verificacao = await pool.query(sqlVerificaAutorizacao, [usuarioUID]);
    
      console.log(verificacao.rows);

      if (verificacao.rows.length === 0) {
        throw new Error('Apenas Admins podem alterar por essa role');
      }
}
