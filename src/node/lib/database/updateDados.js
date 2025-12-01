import admin from "../firebase/firebaseadmin";

export const AtualizarUsuarioViaFirebase = async (uid, email, senha) =>{

    //verifica se tem o uid do usuário
    if (!uid){
        throw new Error("Sem uid de usuário");
    }

    //todos os dados para alterar
    const dados = {}

    if (email){
        dados.email = email; // dados.push({email : email})
    }

    if (senha){
        dados.senha = senha; // dados.push({email : email})
    }


    //altera os dados do usuário via uid;
    await admin.auth().updateUser(uid, dados);

    
}