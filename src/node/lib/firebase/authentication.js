//ARQUIVO PARA ARMAZENAR TODAS AS FUNÇÕES PARA o nosso JS
'use client'

import {app} from './firebaseauth'

import {
     signInWithEmailAndPassword,

     
     createUserWithEmailAndPassword, 
     //Quando o usuário ele se cadastra manda o email de verificação pro firebase autorizar o usuário pela autentificação. Com  a autorização, o usuário pode alterar o email dele.
     sendEmailVerification,
     sendPasswordResetEmail, 
     signOut, 
     getAuth,
     reload,
     

     //para reautentificação;
     EmailAuthProvider,
     reauthenticateWithCredential,
     
     //para atualizar os dados;
     updateEmail,
     updatePassword
    } 
from 'firebase/auth'


import {
    getToken, getMessaging
} from "firebase/messaging"

const auth = getAuth(app); //inicializa a autentificação. Com isso auth retorna todos os parametros para utilizar na autentificação em forma de objeto.


//FUNÇÕES

    //Função de autentificação de login.
    const loginComEmailESenha = async (email, senha) => {

        try {
            const logar =  await signInWithEmailAndPassword(auth, email ,senha); //Pega os dados do auth (dados do firebase), e verifica se eles batem com o email e a senha que o user digitar. 

            const user = logar.user;
            const token = await user.getIdToken();


            return {uid: user.uid , token : token};

        }

        catch(error){
                console.error("Erro real do Firebase:", error);
                throw new Error("Verifique suas credenciais");
        }
    }

    {/*Função para cadastrar user */}
    const registrarComEmail = async (
        email, 
        senha= "Senha123"
    ) => {
        try{
        

            //ao criar o usuário, ele gera um objeto com email, uid e metadas
            const resp = await createUserWithEmailAndPassword(auth, email, senha);
            //pega esse objeto
            const user =  resp.user; 

            return {uid: user.uid}
        }

        catch(error){
            console.error("Erro ao cadastrar usuário:", error);
            throw error; // opcional, para propagar
        }

    }

    //Altera o email e a senha do usuário logado atual;
    const alterarEmailAndSenha = async (
        emailAtual, 
        senhaAtual, 
        email,
        senha
    ) => {
        console.log("entrou no alterar email and senha");
        
        //reautentifica o usuário
        const credential = EmailAuthProvider.credential(
            emailAtual,
            senhaAtual
          );
    
          await reauthenticateWithCredential(auth.currentUser, credential);

        //se tiver email, ele manda um link no email do usuário para ele se autentificar;
        if (email){
            console.log("entrou no email");
            
            //await updateEmail(auth.currentUser, email);

            //envia o email de verificação para verificar se o usuário que está tentando alterar o email da conta realmente é o usuário conta
            await sendEmailVerification(email);
            
            //variável pro front entender que houve a verificação do email;
            const mensagem = "enviamos para seu novo email, um link para confirmarmos que o email atual pertence mesmo a você.";
            return mensagem;
        }
        
        //se tiver senha, ele atualiza;
        if (senha){
            console.log("entrou na senha");
            await updatePassword(auth.currentUser, senha);
        }

        return null;
    }

    //Depois do usuário autentificar o email dele, ai sim, tenta atualizar o email;
    const alterarEmailPosVerificacao = async (email) => {
        console.log(email);
        console.log("entrou");

        if (email){
            console.log("entrou no email");
            await reload(auth.currentUser);
            console.log("recarregou o email novo");

            //tenta atualizar o email;
            await updateEmail(auth.currentUser, email);

            console.log("atualizou o email");

        }
    }

    {/*Função para recuperar senha via email*/}
    const recuperarSenha = async (email) => {
        try{
            
            //Tenta fazer login com o email e uma senha falsa, assim caindo no catch.
            await sendPasswordResetEmail(auth, email,);
            alert("Email para recuperação de senha enviado!")
            //Email encontrado
            //Envia o email de Recuperação 
            
        }

        catch(error){
            
            return alert("Email para recuperação de senha enviado!");
        }

    }

    const dadosFCM = () => {
        const messaging = getMessaging(app);
    }

    {/*Função para deslogar */}
    const logoutFirebase = () => {
        signOut(auth);
    }




export {
    auth,
    loginComEmailESenha,
    registrarComEmail,
    alterarEmailAndSenha,
    alterarEmailPosVerificacao,
    
    recuperarSenha,
    logoutFirebase
}