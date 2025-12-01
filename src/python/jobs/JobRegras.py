import time
from ..lib.database.db import db
from ..services.ControllerRegras import (
    IniciarRegras , ExecutarRegras, FinalizaRegras
)


print("JOB DE VERIFICAÇÃO INICIADO...")

while True:
    try:
        #
        conn, cursor = db()
        # ============================================================
        # 1) INICIAR REGRAS QUE JÁ ESTÃO NO HORÁRIO
        # ============================================================

        IniciarRegras(conn, cursor)

        # ============================================================
        # 2) EXECUTAR REGRAS EM ANDAMENTO
        # ============================================================

        ExecutarRegras(conn, cursor)

        # ============================================================
        # 3) FINALIZAR REGRAS TERMINADAS
        # ============================================================

        FinalizaRegras(conn, cursor)

    except Exception as error:
        print("ERRO NO JOB:", str(error))

    # executa a cada 10 segundos
    time.sleep(10)
