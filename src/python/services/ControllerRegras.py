####
# INÍCIO REGRAS EM ANDAMENTO
####

def IniciarRegras(conn, cursor):

    print("Iniciou Iniciar Regras")
    # Query para ver se existe regras para inicializar
    sql_iniciar = """
            SELECT r.id,
                r.nome,
                r.descricao,
                r.sql_query,
                r.database,
                er.id AS id_execucao,
                er.prioridade,
                er.status,
                er.horario_inicio,
                er.horario_fim,
                er.silenciado
            FROM regras r
            JOIN execucao_regras er ON er.regras_id = r.id
            WHERE NOW() >= er.horario_inicio
            AND er.status = 'espera'
            ORDER BY er.prioridade DESC, er.horario_inicio ASC
            LIMIT 1
        """

    cursor.execute(sql_iniciar)
    regras = cursor.fetchall()

    # ATUALIZA O STATUS PARA 'rodando' E GERA LOGS
    if len(regras) > 0:
        regra = regras[0]
        print("↪ Iniciando regra:", regra[1])

        id_regra = regra[0]
        id_execucao = regra[5]

        sql_update_status = """
            UPDATE execucao_regras
            SET status = 'rodando'
            WHERE regras_id = %s
        """

        cursor.execute(sql_update_status, (id_regra,))
        conn.commit()

        if cursor.rowcount == 0:
            raise Exception("Erro ao inicializar a regra")

        # cria log
        sql_log = """
            INSERT INTO logs_execucao_regras (acao, horario, execucao_regras_id)
            VALUES ('A regra começou a rodar', NOW(), %s)
        """

        cursor.execute(sql_log, (id_execucao,))
        conn.commit()

####
# Executa regras em andamento
####

def ExecutarRegras(conn, cursor):
    print("Iniciou Executar Regras")

    sql_execucao = """
            SELECT r.id,
                r.nome,
                r.descricao,
                r.sql_query,
                r.database,
                er.id AS id_execucao,
                er.prioridade,
                er.status,
                er.horario_inicio,
                er.horario_fim,
                er.silenciado
            FROM regras r
            JOIN execucao_regras er ON er.regras_id = r.id
            WHERE NOW() BETWEEN horario_inicio AND horario_fim
            AND er.status = 'rodando'
            ORDER BY er.prioridade DESC, er.horario_fim ASC
            LIMIT 1
        """

    cursor.execute(sql_execucao)
    regras_exec = cursor.fetchall()

    if len(regras_exec) > 0:
        regra = regras_exec[0]
        sql_query_da_regra = regra[3]
        id_regra = regra[0]
        id_execucao = regra[5]

        try:
            print("↪ Executando SQL da regra:", regra[1])
            cursor.execute(sql_query_da_regra)
            conn.commit()

            # VERIFICA SE JÁ EXISTE LOG EXECUTANDO
            sql_VerificaLogExistente = """ 
                SELECT * FROM logs_execucao_regras ler 
                WHERE execucao_regras_id = %s
                AND acao = 'executando regra'
            """
            cursor.execute(sql_VerificaLogExistente, (id_execucao,))
            log_existente = cursor.fetchall()

            if len(log_existente) == 0:
                sql_log = """
                    INSERT INTO logs_execucao_regras (acao, horario, execucao_regras_id)
                    VALUES ('executando regra', NOW(), %s)
                """
                cursor.execute(sql_log, (id_execucao,))
                conn.commit()

        except Exception as erro:
            conn.rollback()

            sql_update_status = """
            UPDATE execucao_regras
            SET status = 'falhou'
            WHERE regras_id = %s
            """
            cursor.execute(sql_update_status, (id_regra,))
            conn.commit()

            prioridade = regra[6]
            regra_id = regra[0]

            sql_geraIncidente = """ 
                INSERT INTO incidentes(prioridade, regra_id, horario_incidente, erro_sql, status)
                VALUES(%s, %s, NOW(), %s, 'open')
            """
            cursor.execute(sql_geraIncidente, (prioridade, regra_id, str(erro)))
            conn.commit()

            # LOG INCIDENTE
            sql_VerificaLogExistente = """ 
                SELECT * FROM logs_execucao_regras ler 
                WHERE execucao_regras_id = %s
                AND acao = 'Gerou Incidente'
            """
            cursor.execute(sql_VerificaLogExistente, (id_execucao,))
            log_existente = cursor.fetchall()

            if len(log_existente) == 0:
                sql_log = """
                    INSERT INTO logs_execucao_regras (acao, horario, execucao_regras_id)
                    VALUES ('Gerou Incidente', NOW(), %s)
                """
                cursor.execute(sql_log, (id_execucao,))
                conn.commit()

####
# FINALIZAR REGRAS
####

def FinalizaRegras(conn, cursor):
    print("Iniciou Finalizar Regras")

    sql_finalizar = """
            SELECT r.id,
                r.nome,
                r.descricao,
                r.sql_query,
                r.database,
                er.id AS id_execucao,
                er.prioridade,
                er.status,
                er.horario_inicio,
                er.horario_fim,
                er.silenciado
            FROM regras r
            JOIN execucao_regras er ON er.regras_id = r.id
            WHERE er.horario_fim <= NOW()
            AND er.status = 'rodando'
            ORDER BY er.prioridade DESC, er.horario_fim ASC
            LIMIT 1
        """

    cursor.execute(sql_finalizar)
    regras_fim = cursor.fetchall()

    if len(regras_fim) > 0:
        regra = regras_fim[0]
        print("↪ Finalizando regra:", regra[1])

        id_regra = regra[0]
        id_execucao = regra[5]

        sql_update = """
            UPDATE execucao_regras
            SET status = 'sucesso'
            WHERE regras_id = %s
        """

        cursor.execute(sql_update, (id_regra,))
        conn.commit()

        sql_log = """
            INSERT INTO logs_execucao_regras (acao, horario, execucao_regras_id)
            VALUES ('regra finalizada', NOW(), %s)
        """

        cursor.execute(sql_log, (id_execucao,))
        conn.commit()
