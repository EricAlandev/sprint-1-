// context/NotificationContext.js
"use client";


import { logoutFirebase } from "@/node/lib/firebase/authentication";
import { createContext, useContext, useState, useEffect } from "react";

// Cria o Context
const NotificationContext = createContext();

// Provider que envolve toda a aplicação
export function FuncoesGlobais({ children }) {

  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  
  // Ao montar, busca no localStorage
  useEffect(() => {
    const usuario = localStorage.getItem("dadosUser");
    const tokenUser = localStorage.getItem("tokenUser");
  
    try {
      if (usuario && usuario !== "undefined") setUsuario(JSON.parse(usuario));
    } catch {
      setUsuario(null);
    }
  
    try {
      if (tokenUser && tokenUser !== "undefined") setToken(JSON.parse(tokenUser));
    } catch {
      setToken(null);
    }
  
  }, []);
  

  // Função para atualizar o estado e o localStorage
  const login = (user, token) => {
    localStorage.setItem("dadosUser", JSON.stringify(user));

    localStorage.setItem("tokenUser", JSON.stringify(token));

    setUsuario(user);
    setToken(token);
  };

  //Função de logout
  const logout = () => {
    //Remove os localStorage
    localStorage.removeItem("dadosUser");
    localStorage.removeItem("tokenUser");

    //Remove os states com os dados do usuario
    setUsuario(null);
    setToken(null);

    //Remove também o auth - método esse de autentificação que define o login e o armazenamento futuro dos localStorage
     logoutFirebase();
  } 

  return (
    <NotificationContext.Provider
      value={{
        login,
        usuario,
        token,
        logout
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// Hook customizado para usar o Context
export const dadosGlobais = () => useContext(NotificationContext);
