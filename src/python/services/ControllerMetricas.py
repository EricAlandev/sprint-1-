import pandas as pd
import json

def Metricas(conn, cursor):
    
    sql_completo = """
        SELECT 
            i.id,
            i.prioridade,
            i.regra_id, 
            i.horario_incidente,
            i.erro_sql,
            i.status,
            logs.horario_ack,
            logs.ack_usuario_id,
            logs.horario_close,
            logs.close_usuario_id
        FROM incidentes i
        LEFT JOIN logs_incidente logs ON logs.incidente_id = i.id
        WHERE i.status IN ('open', 'ack', 'closed')
    """
    
    cursor.execute(sql_completo)
    dados = cursor.fetchall()
    
    #**CONVERTE PARA PANDAS**
    colunas = ['id', 'prioridade', 'regra_id', 'horario_incidente', 'erro_sql', 'status', 
               'horario_ack', 'ack_usuario_id', 'horario_close', 'close_usuario_id']
    df = pd.DataFrame(dados, columns=colunas)
    
    # **CONVERTE DATAS**
    df['horario_incidente'] = pd.to_datetime(df['horario_incidente'])
    df['horario_ack'] = pd.to_datetime(df['horario_ack'])
    df['horario_closed'] = pd.to_datetime(df['horario_close'])
    
    # **MÉTRICAS BÁSICAS**
    quantidadeIncidentesAbertos = len(df[df['status'] == 'open'])
    quantidadeIncidentesACK = len(df[df['status'] == 'ack'])
    quantidadeIncidentesCLOSED = len(df[df['status'] == 'closed'])
    quantitadesTotais = len(df['status'])

    dadosMetricas = {
        "incidentes_abertos" : quantidadeIncidentesAbertos,
        "incidentes_ack" : quantidadeIncidentesACK,
        "incidentes_closed" : quantidadeIncidentesCLOSED,
        "quantitadesTotais" : quantitadesTotais
    }

    #RETORNA DADOS DE MÉTRICAS.
    return dadosMetricas

    #DEFINE O ARQUIVO CSV PARA MÉTRICAS.