import admin from "firebase-admin";
//admin por padrão tem uma lista interna de apps inicializados
if (!admin.apps.length) { //verifica se a lista tem algum app inicializado
  admin.initializeApp({ //se não tiver, o admin inicializa o app
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)), //onde pega as credenciais do .env
  });
}

export default admin;