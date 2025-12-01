
import pool from "./db"

//verifica se o usuário foi permitido acessar o sistema pelo admin.
export const VerificaSePermitido = async (uid) => {
    
    const sql = `select * from usuarios where uid = $1 AND ativo = true`

    const envio = await pool.query(sql, [uid]);

    if (envio.rows.length === 0){
        throw new Error("Espere a autorização do sistema para efetuar o login");
    }
}