import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Switch, ScrollView, ToastAndroid } from 'react-native';
import { LojaContext } from "../../contexts/lojaContext"

import { useTheme } from '@react-navigation/native';

import api from '../../servicos/api';

import { Input, TituloInput, ContainerInput, BotaoPrincipal, TextBtn, Tela } from "../../styles";

export default function CadastrarDados() {
    const { colors } = useTheme()

    const { credenciais } = useContext(LojaContext)

    const [loja, setLoja] = useState({})

    useEffect(() => {
        BuscaLoja()
    }, [])

    const toggleSwitch = (e) => setLoja({ ...loja, entrega: e });

    async function BuscaLoja() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credenciais.token}`
        }
        await api.get(`/me?lojaID=${credenciais.id}`, { headers })
            .then((response) => {

                setLoja(response.data)

            })
            .catch((error) => {
                ToastErro(error.status)
            })
    }

    async function Atualizar() {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credenciais.token}`
        }

        await api.put(`/loja?lojaID=${credenciais.id}`, loja, { headers })
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
                        Nome da Loja
                    </TituloInput>

                    <Input

                        value={loja.nome}
                        onChangeText={(e) => setLoja({ ...loja, nome: e })}
                        maxLength={25} />
                </ContainerInput>

                <ContainerInput>
                    <TituloInput>
                        Endereço
                    </TituloInput>

                    <Input
                        multiline numberOfLines={0}
                        verticalAlign={'top'}
                        onChangeText={(e) => setLoja({ ...loja, endereco: e })}
                        value={loja.endereco}
                        maxLength={50} />
                </ContainerInput>

                <ContainerInput>
                    <TituloInput>
                        Bairro
                    </TituloInput>

                    <Input
                        onChangeText={(e) => setLoja({ ...loja, bairro: e })}
                        value={loja.bairro}
                        maxLength={40} />
                </ContainerInput>

                <ContainerInput>
                    <TituloInput>
                        Ponto de Referencia
                    </TituloInput>

                    <Input
                        onChangeText={(e) => setLoja({ ...loja, referencia: e })}
                        value={loja.referencia}
                        maxLength={40} />
                </ContainerInput>


                <ContainerInput>
                    <TituloInput>
                        Sobre
                    </TituloInput>

                    <Input
                        multiline numberOfLines={0}
                        verticalAlign={'top'}
                        maxLength={200}
                        onChangeText={(e) => setLoja({ ...loja, bio: e })}
                        value={loja.bio}
                    />
                    <Text
                        style={{ alignSelf: "flex-end", marginRight: 15 }}>
                        {loja.bio?.length || '0'}/200
                    </Text>

                </ContainerInput>


                <View style={{ marginVertical: 30, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>

                    <Text
                        style={{ color: '#222', fontFamily: "Roboto-Regular", fontSize: 16, marginLeft: 25 }}>
                        Entregas
                    </Text>

                    <Switch
                        trackColor={{ false: '#767577', true: '#ddd' }}
                        thumbColor={loja.entrega ? colors.tema : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={loja.entrega}
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

