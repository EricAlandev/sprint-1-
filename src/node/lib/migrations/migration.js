import pool from "../database/db";

// GERENCIA A CRIAÇÃO DE TABLES CASO NÃO EXISTENTES NO DB.
export async function Migrations() {

    // Usuários
    const sql_Usuarios = `CREATE TABLE IF NOT EXISTS usuarios (
        id serial NOT NULL PRIMARY KEY,
        uid char(28),
        nome varchar(55) NOT NULL,
        matricula varchar(9) NOT NULL,
        autorizacao varchar(25) NOT NULL,
        email varchar(120),
        ativo bool
    )`;
    await pool.query(sql_Usuarios);

    // Roles
    const sql_Roles = `CREATE TABLE IF NOT EXISTS roles (
        id serial NOT NULL PRIMARY KEY,
        role varchar(30) NOT NULL,
        description varchar(150)
    )`;
    const tableRoles await pool.query(sql_Roles);

    //se tiver criado a table roles. Aí insere os values
    if (tableRoles.rows.lenght > 0) {
    // Inserir roles padrão
        const sql_InsertRoles = `
        INSERT INTO roles (role, description)
        VALUES
            ('Canais_Digitais', 'Responsável por realizar o monitoramento, análise e controle operacional dos canais digitais da empresa'),
            ('Financeiro', 'Responsável por realizar o monitoramento de regras voltada a setores financeiros'),
            ('SEM_ROLE', 'Usuários recém-criados sem permissões definidas')
        ON CONFLICT (role) DO NOTHING;
        `;
    }
    
    // Regras
    const sql_REGRAS = `CREATE TABLE IF NOT EXISTS regras (
        id serial NOT NULL PRIMARY KEY,
        nome varchar(60) NOT NULL,
        descricao varchar(50) NOT NULL,
        sql_query varchar(1500) NOT NULL,
        database varchar(30)
    )`;
    await pool.query(sql_REGRAS);

    // Incidentes
    const sql_incidentes = `CREATE TABLE IF NOT EXISTS incidentes (
        id serial NOT NULL PRIMARY KEY,
        prioridade varchar(5) NOT NULL,
        regra_id int NOT NULL REFERENCES regras(id) ON DELETE CASCADE,
        horario_incidente timestamp NOT NULL,
        erro_sql varchar(2000) NOT NULL,
        status varchar(15)
    )`;
    await pool.query(sql_incidentes);

    // Execução regras
    const sql_ExecucaoRegras = `CREATE TABLE IF NOT EXISTS execucao_regras (
        id serial NOT NULL PRIMARY KEY,
        regras_id int NOT NULL REFERENCES regras(id) ON DELETE CASCADE,
        prioridade varchar(5) NOT NULL,
        status varchar(10) NOT NULL,
        horario_inicio timestamp NOT NULL,
        horario_fim timestamp NOT NULL,
        silenciado bool
    )`;
    await pool.query(sql_ExecucaoRegras);

    // User_roles
    const sql_USER_ROLES = `CREATE TABLE IF NOT EXISTS user_roles (
        id serial NOT NULL PRIMARY KEY,
        role_id int NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
        usuario_id int NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE
    )`;
    await pool.query(sql_USER_ROLES);

    // Regras_roles
    const sql_RolesRegras = `CREATE TABLE IF NOT EXISTS regras_roles (
        id serial NOT NULL PRIMARY KEY,
        role_id int NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
        regras_id int NOT NULL REFERENCES regras(id) ON DELETE CASCADE
    )`;
    await pool.query(sql_RolesRegras);

    // Sistema_rotas
    const sql_SistemaRotas = `CREATE TABLE IF NOT EXISTS sistema_rotas (
        id serial NOT NULL PRIMARY KEY,
        usuario_id int NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        start_time timestamp NOT NULL,
        end_time timestamp NOT NULL
    )`;
    await pool.query(sql_SistemaRotas);

    // Preferencias_usuario
    const sql_PreferenciasUsuario = `CREATE TABLE IF NOT EXISTS preferencias_usuario (
        id serial NOT NULL PRIMARY KEY,
        usuario_id int NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        enable_push bool,
        enable_sound bool,
        silence_time_start timestamp,
        silence_time_end timestamp,
        fcm_token varchar(350)
    )`;
    await pool.query(sql_PreferenciasUsuario);

    // Notificações no geral
    const sql_Notificacoes = `CREATE TABLE IF NOT EXISTS notificacoes (
        id serial NOT NULL PRIMARY KEY,
        usuario_id int NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        incidente_id int NOT NULL REFERENCES incidentes(id) ON DELETE CASCADE,
        status varchar(10) NOT NULL,
        tipo varchar(20) NOT NULL,
        role varchar(20)
    )`;
    await pool.query(sql_Notificacoes);

    // Notificações usuários
    const sql_NotificacoesUsuarios = `CREATE TABLE IF NOT EXISTS notificacoes_usuarios (
        id serial NOT NULL PRIMARY KEY,
        usuarios_id int NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        notificacoes_id int NOT NULL REFERENCES notificacoes(id) ON DELETE CASCADE,
        deletado bool
    )`;
    await pool.query(sql_NotificacoesUsuarios);

    // Logs de notificações
    const sql_LogsNotificacao = `CREATE TABLE IF NOT EXISTS logs_notificacao (
        id serial NOT NULL PRIMARY KEY,
        usuario_id int NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        notificacao_id int NOT NULL REFERENCES notificacoes(id) ON DELETE CASCADE,
        horario timestamp,
        acao varchar(10)
    )`;
    await pool.query(sql_LogsNotificacao);

    // Logs Sistema Rotas
    const sql_LogsSistemaRotas = `CREATE TABLE IF NOT EXISTS logs_sistema_rotas (
        id serial NOT NULL PRIMARY KEY,
        sistema_rotas_id int NOT NULL REFERENCES sistema_rotas(id) ON DELETE CASCADE,
        horario timestamp NOT NULL,
        acao varchar(10) NOT NULL
    )`;
    await pool.query(sql_LogsSistemaRotas);

    // Logs Incidentes
    const sql_LogsIncidente = `CREATE TABLE IF NOT EXISTS logs_incidente (
        id serial NOT NULL PRIMARY KEY,
        incidente_id int NOT NULL REFERENCES incidentes(id) ON DELETE CASCADE,
        horario timestamp NOT NULL,
        acao varchar(10) NOT NULL
    )`;
    await pool.query(sql_LogsIncidente);

    // Logs Execução Regras
    const sql_logsExecucaoRegras = `CREATE TABLE IF NOT EXISTS logs_execucao_regras (
        id serial NOT NULL PRIMARY KEY,
        acao varchar(255),
        horario timestamp,
        execucao_regras_id int NOT NULL REFERENCES execucao_regras(id) ON DELETE CASCADE
    )`;
    await pool.query(sql_logsExecucaoRegras);

    // Logs Auditoria Regras
    const sql_LogsAuditoriaRegras = `CREATE TABLE IF NOT EXISTS logs_auditoria_regras (
        id serial NOT NULL PRIMARY KEY,
        usuario_id int NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        horario timestamp,
        acao varchar(12),
        regras_id int NOT NULL,
        adiou_inicio timestamp,
        adiou_fim timestamp
    )`;
    await pool.query(sql_LogsAuditoriaRegras);

}
