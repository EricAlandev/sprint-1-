

export default function Dicionario(){

    return(
      <>
        <div className="w-[90vw] mx-auto p-6 bg-white rounded-md shadow-md
        
        md:w-[48vw] md:max-w-[800px]
        ">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Dicionário</h2>

            {/*Páginas e suas funcionalidades */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Páginas / Funcionalidades</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                    <strong>Incidentes:</strong> Página que lista todas as ocorrências relacionadas a regras e erros do sistema. Permite visualização de detalhes, execução manual de regras, adiar ou silenciar alertas e gerenciar comentários.
                </li>
                <li>
                    <strong>Execução de Regras:</strong> Funcionalidade que permite executar regras específicas para validar dados ou disparar alertas de forma manual ou automatizada. Mostra resultados da execução em tempo real.
                </li>
                <li>
                    <strong>Teste Sandbox:</strong> Ambiente seguro para testar regras ou SQLs sem afetar dados de produção. Permite simular execuções, validar resultados e verificar impactos antes de aplicar no sistema real.
                </li>
                </ul>
            </section>

            {/* -- Siglas / Termos --> */}
            <section>
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Siglas / Termos</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                    <strong>Incidente:</strong> Agrupamento de ocorrências relacionadas a uma regra ou erro. Cada incidente pode conter múltiplos alertas ou eventos.
                </li>
                <li>
                    <strong>ACK:</strong> Confirmação recebida por um plantonista indicando que ele está ciente do incidente ou alerta. Serve para controle de responsabilidade.
                </li>
                <li>
                    <strong>Role:</strong> Etiqueta que mapeia regras a grupos de usuários. Ex.: <code>CANAIS_DIGITAIS</code> identifica que uma regra é destinada a esse grupo específico de operadores. Então, funcionários da role CANAIS_DIGITAIS poderão ver apenas o que for destinado a eles.
                </li>

                <li>
                    <strong>MTTA:</strong> Tempo médio de reconhecimento da existência de um incidente.
                </li>

                <li>
                    <strong>MTTR:</strong> Tempo médio da resolução de um incidente.
                </li>
                </ul>
            </section>
        </div>

      </>
    )
}