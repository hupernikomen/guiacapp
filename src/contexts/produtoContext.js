import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import api from '../servicos/api'



import { useNavigation } from "@react-navigation/native";

export const ProdutoContext = createContext({})

export function ProdutoProvider({ children }) {
    const navigation = useNavigation()


    const arrTamanhos = ["PP", "P", "M", "G", "GG", "XGG", "EG", "EGG", "1", "2", "3", "4", "5", "6", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50"]




    
    async function Atualizar(nome, descricao, oferta, tamanho, cor, categoriaID, id, credenciais) {

        if (nome == "" || descricao == "") return

        const produto = {
            nome,
            descricao,
            oferta,
            tamanho,
            cor,
            categoriaID,
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credenciais.token}`
        }

        await api.put(`/produto?produtoID=${id}`, produto, { headers })
            .then(() => Alert.alert("Que legal", "Seu produto já foi atualizado"))
            .catch((error) => console.error(error.response))
    }

    async function Excluir(id, credenciais) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credenciais.token}`
        }

        await api.delete(`/produto?produtoID=${id}`, { headers })
            .then(() => navigation.navigate("HomeControle"))
            .catch((error) => console.log(error.response))
    }


    return (
        <ProdutoContext.Provider value={{
            arrTamanhos,
            Excluir,
            Atualizar,
        }}>
            {children}
        </ProdutoContext.Provider>
    )
}