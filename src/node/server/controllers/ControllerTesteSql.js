import pool from "@/node/lib/database/db";
import { palavrasProibidas, tablesLiberadas, VerificaPermissaoTable } from "@/node/lib/database/TablesPermitidas";
import { query } from "firebase/firestore";

//Teste de sql
export const ControllerSQL = async ({ body }) => {

    const { sql } = body;

    // Validação: SQL obrigatório
    if (!sql) {
      throw new Error("O campo 'sql' é obrigatório.");
    }
    
    //pega o sql e deixa ele apenas com os values
    const sqlValor = sql.trim().toLowerCase();

    //Verifica se a table é permitida pra testes
    

    //Se o Sql tiver insert, update ou drop ele quebra o value.
    if (Object.keys(palavrasProibidas).find(palavra => sqlValor.includes(palavra))){
        throw new Error("Só é permitido querys do tipo select")
    }

    //Não permite ; durante o sql. Impede o usuário de fazer 2 querys juntas.
    if(sqlValor.includes(";")){
        throw new Error("Não é permitido ';' por questões de segurança.");
    }
    
    //Verifica se o sql do usuário, ele tá afetando uma tabela que não é permitida.
    if (!Object.keys(tablesLiberadas).find((tabela) => sqlValor.includes(tabela) )){
        throw new Error("Querys apenas em tables permitidas.")
    }

    //Limite apenas a 1 valor, pra evitar de renderizar muitos valores
    const sqlLimite1 = `${sql} LIMIT 1 `

    // Executa a query
    const teste = await pool.query(sqlLimite1);

    if (teste.rows.length === 0){
        throw new Error("SQL inválido")
    }

    // Retorna resultado
    return teste.rows[0];
};
