import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Switch, ScrollView, ToastAndroid } from 'react-native';
import { LojaContext } from "../../contexts/lojaContext"

import { useTheme, useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

import api from '../../servicos/api';

import { Input, TituloInput, ContainerInput, BotaoPrincipal, TextBtn, Tela } from "../../styles";



export default function CadastrarDados() {
    const { colors } = useTheme()
    const route = useRoute()
    const navigation = useNavigation()

    const focus = useIsFocused()

    const { credenciais } = useContext(LojaContext)

    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [bairro, setBairro] = useState('')
    const [referencia, setReferencia] = useState('')
    const [bio, setBio] = useState('')
    const [entrega, setEntrega] = useState(false)


    useEffect(() => {
        BuscaLoja()
    }, [])


    const toggleSwitch = () => setEntrega(previousState => !previousState);

    async function BuscaLoja() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credenciais.token}`
        }
        await api.get(`/me?lojaID=${credenciais.id}`, { headers })
            .then((response) => {
                const { nome, endereco, bairro, referencia, bio, entrega } = response.data

                const booEntrega = entrega == "true"

                setNome(nome)
                setEndereco(endereco)
                setBairro(bairro)
                setReferencia(referencia)
                setBio(bio)
                setEntrega(booEntrega)
            })
            .catch((error) => {
                ToastErro(error.status)
            })

    }


    async function Atualizar() {

        const formData = new FormData()

        formData.append('nome', nome)
        formData.append('endereco', endereco)
        formData.append('bairro', bairro)
        formData.append('referencia', referencia)
        formData.append('bio', bio)
        formData.append('entrega', entrega)

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${credenciais.token}`
        }

        await api.put(`/loja?lojaID=${credenciais.id}`, formData, { headers })
            .then(() => {
                ToastAtualizaDados()
            })
            .catch((error) => console.log(error, "catch Error"))
    }


    const ToastAtualizaDados = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Atualizamos seus dados!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    };

    return (
        <Tela>

            <ScrollView

                showsVerticalScrollIndicator={false}
            >

                <ContainerInput>
                    <TituloInput>
                        Nome da Loja *
                    </TituloInput>

                    <Input

                        value={nome}
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
                        onChangeText={setEndereco}
                        value={endereco}
                        maxLength={50} />
                </ContainerInput>

                <ContainerInput>
                    <TituloInput>
                        Bairro *
                    </TituloInput>

                    <Input
                        onChangeText={setBairro}
                        value={bairro}
                        maxLength={40} />
                </ContainerInput>

                <ContainerInput>
                    <TituloInput>
                        Ponto de Referencia *
                    </TituloInput>

                    <Input
                        onChangeText={setReferencia}
                        value={referencia}
                        maxLength={40} />
                </ContainerInput>


                <ContainerInput>
                    <TituloInput>
                        Sobre... *
                    </TituloInput>

                    <Input
                        multiline numberOfLines={0}
                        verticalAlign={'top'}
                        maxLength={200}
                        onChangeText={setBio}
                        value={bio}
                    />
                    <Text
                        style={{ alignSelf: "flex-end", marginRight: 15 }}>
                        {bio?.length || '0'}/200
                    </Text>

                </ContainerInput>


                <View style={{ marginVertical: 30, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>

                    <Text
                        style={{ color: '#222', fontFamily: "Roboto-Regular", fontSize: 16, marginLeft:25 }}>
                        Entregas
                    </Text>

                    <Switch
                        trackColor={{ false: '#767577', true: '#ddd' }}
                        thumbColor={entrega ? colors.tema : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={Boolean(entrega)}
                    />
                </View>


                <BotaoPrincipal
                    activeOpacity={1}
                    background={colors.tema}
                    onPress={Atualizar}>

                    <TextBtn cor={'#fff'}>Atualizar</TextBtn>
                </BotaoPrincipal>

                <View style={{ marginVertical: 15 }} />

            </ScrollView>
        </Tela>

    );
}

