
from http.server import BaseHTTPRequestHandler, HTTPServer
from ..services.ControllerMetricas import Metricas
import time
import json
from ..lib.database.db import db

class MeuServidor(BaseHTTPRequestHandler):

    # Rota GET
    def do_GET(self):
        conn, cursor = db()
        # Se a rota /metricas for chamada
        if self.path == "/metricas":
            try:
                dados = Metricas(conn, cursor)
                #transforma em json a resposta do python.
                resposta = json.dumps(dados).encode("utf-8")

                #status
                self.send_response(200)

                #manda pro header type json
                self.send_header("Content-type", "application/json")

                #Permite que o servidor python se comunique com qualquer outro
                self.send_header("Access-Control-Allow-Origin", "*")

                #fecha o headers
                self.end_headers()

                #envia a resposta.
                self.wfile.write(resposta)

                print("Enviou as métricas")

            except FileNotFoundError:
                self.send_response(404)
                self.end_headers()
                self.wfile.write('{"erro": "Métricas falharam"}'.encode('utf-8'))


        else:
            # Rota não existe
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'{"erro":"rota nao encontrada"}')


if __name__ == "__main__":
    servidor = HTTPServer(("0.0.0.0", 8000), MeuServidor)
    print("API Python rodando em http://localhost:8000")
    servidor.serve_forever()
