import React, { createContext } from "react";

export const ProdutoContext = createContext({})

export function ProdutoProvider({ children }) {

    const arrTamanhos = ["PP", "P", "M", "G", "GG", "XGG", "EG", "EGG", "1", "2", "3", "4", "5", "6", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50"]

    return (
        <ProdutoContext.Provider value={{
            arrTamanhos,
        }}>
            {children}
        </ProdutoContext.Provider>
    )
}