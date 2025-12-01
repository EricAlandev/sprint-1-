# Projeto

## Configuração

### 1. Banco de Dados
Crie um arquivo `.env` na raiz do projeto com:

DATABASE_URL=postgres://<usuario>:<senha>@<host>:<porta>/<nome_do_banco>

cpp
Copiar código

### 2. Firebase Authentication
Dentro de `/node/lib/firebase`, crie `firebaseauth.js`:

javascript
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const app = initializeApp(firebaseConfig);

export { app };
Rodando o Projeto
Abra 3 terminais separados:

----Front + Back (Next.js)----

bash
Copiar código
npm run dev

----Job das Regras (Python)---

bash
Copiar código
cd src
python -m python.jobs.JobRegras

---Métricas (API Python)--

bash
Copiar código
cd src
python -m python.lib.api

---Ao criar seu usuário via aplicação. Vá para seu banco de dados e atualize a autorização do usuário para Admin e define que ele terá todas as roles existentes para evita possíveis bugs.----
