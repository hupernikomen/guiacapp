import React, { createContext } from "react";

export const ProdutoContext = createContext({})

export function ProdutoProvider({ children }) {

    const arrTamanhos = [
        "PP", "P", "M", "G", "GG", "XGG", "EG", "EGG", "1", "2", "3", "4", "5", "6", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"]

    return (
        <ProdutoContext.Provider value={{
            arrTamanhos,
        }}>
            {children}
        </ProdutoContext.Provider>
    )
}