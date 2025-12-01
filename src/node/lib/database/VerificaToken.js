
import admin from "../firebase/firebaseadmin";

//function para verificar a autenticidade do token
export const VerifyToken = async (req) => {
  //Pega da requisição o headers e dps puxa o Authorization
  const authHeader = req.headers.get("authorization");
  
  //Verifica se o authHeader conseguiu puxar, ou se o Authorization não começou com Bearer;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  // Extrai o token
  const token = authHeader.split(" ")[1]; //Deixa ele como array e dps pega apenas o elemento 1 que é o token em si.

  //  Verifica o token usando Firebase Admin
  const decoded = await admin.auth().verifyIdToken(token);
  //pega o admin, verifica pela auth, os values do fb e dps verifica o token
  
  const uid = decoded.uid
  
   // Retorna o UID do usuário autenticado
   return uid;
 
}