import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { LojaContext } from "../../contexts/lojaContext"

import { useTheme, useNavigation,useRoute } from '@react-navigation/native';

import api from '../../servicos/api';

import { Input, TituloInput, ContainerInput, BotaoPrincipal } from "../../styles";



export default function CadastrarDados() {
    const { colors } = useTheme()
    const route = useRoute()
    const navigation = useNavigation()

    const { credenciais } = useContext(LojaContext)

    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [bairro, setBairro] = useState('')
    const [referencia, setReferencia] = useState('')
    const [bio, setBio] = useState('')
    const [entrega, setEntrega] = useState()

    console.log(route.params?.bairro);


    useEffect(() => {
        setNome(route.params?.nome)
        setEndereco(route.params?.endereco)
        setBairro(route.params?.bairro)
        setReferencia(route.params?.referencia)
        setBio(route.params?.bio)
    }, [])
    

    // const toggleSwitch = () => setEntrega(previousState => !previousState);



    async function Atualizar() {

        const formData = new FormData()

        formData.append('nome', nome)
        formData.append('endereco', endereco)
        formData.append('bairro', bairro)
        formData.append('referencia', referencia)
        formData.append('bio', bio)

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${credenciais.token}`
        }

        await api.put(`/loja?lojaID=${credenciais.id}`, formData, { headers })
            .then((response) => {
                console.log(response.data);
                Alert.alert("Muito bom...", "Seus dados já foram atualizados", [
                    {
                        text: "Sair",
                        onPress: () => navigation.goBack(),
                    },
                    { text: "Continuar" },
                ])


            })
            .catch((error) => console.log(error, "catch Error"))
    }

    return (
        <ScrollView

            showsVerticalScrollIndicator={false}
            style={styles.tela}>

            {/* <View style={{ marginBottom: 30 }}>
                <View style={[styles.links]}>

                    <Text
                        style={{ color: '#222', fontFamily: "Roboto-Regular", fontSize: 16 }}>
                        Entregas
                    </Text>

                    <Switch
                        trackColor={{ false: '#767577', true: '#ddd' }}
                        thumbColor={entrega ? colors.tema : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={entrega}
                    />
                </View>
                <Text
                    style={styles.infoinputs}>
                    Ative, se sua loja faz entregas de pedidos
                </Text>
            </View> */}



            <ContainerInput>
                <TituloInput>
                    Nome da Loja *
                </TituloInput>

                <Input

                    value={nome}
                    style={styles.input}
                    onChangeText={setNome}
                    maxLength={25} />
            </ContainerInput>

            <ContainerInput>
                <TituloInput>
                    Endereço *
                </TituloInput>

                <Input
                    multiline numberOfLines={0}
                    verticalAlign={'top'}
                    style={styles.input}
                    onChangeText={setEndereco}
                    value={endereco}
                    maxLength={50} />
            </ContainerInput>

            <ContainerInput>
                <TituloInput>
                    Bairro *
                </TituloInput>

                <Input
                    style={styles.input}
                    onChangeText={setBairro}
                    value={bairro}
                    maxLength={40} />
            </ContainerInput>

            <ContainerInput>
                <TituloInput>
                    Ponto de Referencia *
                </TituloInput>

                <Input
                    style={styles.input}
                    onChangeText={setReferencia}
                    value={referencia}
                    maxLength={40} />
            </ContainerInput>


            <ContainerInput>
                <TituloInput>
                    Sobre... *
                </TituloInput>

                <Input
                    style={styles.input}
                    multiline numberOfLines={0}
                    verticalAlign={'top'}
                    maxLength={300}
                    onChangeText={setBio}
                    value={bio}
                />
                <Text
                    style={{ alignSelf: "flex-end", marginRight: 15 }}>
                    {bio?.length || '0'}/300
                </Text>

            </ContainerInput>


            <BotaoPrincipal
                activeOpacity={1}
                cor={colors.tema}
                onPress={Atualizar}>

                <Text style={styles.txtbtn}>Atualizar</Text>
            </BotaoPrincipal>

            <View style={{ marginVertical: 15 }} />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff'
    },
    links: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline',
        marginLeft: 20,
        paddingVertical: 5,
    },
    infoinputs: {
        color: '#aaa',
        fontFamily: 'Roboto-Italic',
        marginLeft: 20,
        marginTop: -5
    },
    txtbtn: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 16,
        fontFamily: "Roboto-Medium"
    },

})