import React, { createContext, useState, useEffect } from "react";
import NetInfo from '@react-native-community/netinfo'
export const AuthContext = createContext({})

export function AuthProvider({ children }) {

    const [conectado, setConectado] = useState(true)



    return (
        <AuthContext.Provider value={{
            //Variaveis
            conectado
        }}>
            {children}
        </AuthContext.Provider>
    )
}