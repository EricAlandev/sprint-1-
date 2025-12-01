import admin from "../firebase/firebaseadmin";

//function para deletar o usuário do auth
export const DeletarUsuarioViaFirebase = async (uid) => {
    await admin.auth().deleteUser(uid);
    // await db.collection("users").doc(uid).delete();
}
