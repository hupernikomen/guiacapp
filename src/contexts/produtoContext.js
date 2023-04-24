import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import api from '../servicos/api'

import ImageResizer from '@bam.tech/react-native-image-resizer';

import { useNavigation } from "@react-navigation/native";

export const ProdutoContext = createContext({})

export function ProdutoProvider({ children }) {
    const navigation = useNavigation()

    const [acao, setAcao] = useState(false)

    const arrTamanhos = ["PP", "P", "M", "G", "GG", "XGG", "EG", "EGG", "1", "2", "3", "4", "5","6", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50"]


    async function Postar(cod, nome, descricao, preco, tamanho, categoria, preview, credenciais) {

        if (nome == "" || descricao == "" || preco == "" || categoria == "" || preview.length == 0) {
            Alert.alert("Campos obrigatórios... *", !nome && "Produto" || !preco && "Preco" || !descricao && "Descricao" || !categoria && "Categoria" || preview.length == 0 && "Imagens")
            return
        }

        setAcao(true)

        const formData = new FormData()

        formData.append('cod', cod)
        formData.append('nome', nome)
        formData.append('descricao', descricao)
        formData.append('preco', preco)

        for (let i = 0; i < tamanho.length; i++) {
            formData.append('tamanho', tamanho[i])
        }

        for (let i = 0; i < preview.length; i++) {
            try {
                var result = await ImageResizer.createResizedImage(
                    preview[i].uri,
                    1000,
                    1000,
                    'JPEG',
                    90,  // verificar a qualidade da foto e mudar se necessario
                );

            } catch (error) { Alert.alert('Não foi possivel redimensionar') } // Caso nao tenha sido possivel redimensionar imagem

            formData.append('files', {
                uri: result.uri,
                type: 'image/jpeg',
                name: result.name
            });
        }

        formData.append('categoriaID', categoria)
        formData.append('lojaID', credenciais.id)

        await api.post('/produto', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${credenciais.token}`
            }
        })
            .then(() => {
                setAcao(false)
                navigation.navigate("Home")
            })

            .catch((error) => console.log("error from image :", error.response))
    }

    async function Atualizar(nome, descricao, preco, oferta, tamanho, cor, categoriaID, id, credenciais) {

        if (nome == "" || descricao == "") return

        const produto = {
            nome,
            descricao,
            preco,
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
            .then(() => { navigation.navigate("Home") })
            .catch((error) => console.error(error.response))
    }

    async function Excluir(id,credenciais) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credenciais.token}`
        }

        await api.delete(`/produto?produtoID=${id}`, { headers })
            .then(() => { })
            .catch((error) => console.log(error.response))
    }


    return (
        <ProdutoContext.Provider value={{
            acao,
            arrTamanhos,
            Excluir,
            Postar,
            Atualizar,
        }}>
            {children}
        </ProdutoContext.Provider>
    )
}