import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Modal,
    ActivityIndicator,
    ToastAndroid,
    Pressable,
    Alert,
    Dimensions,
    FlatList,
} from 'react-native'


import { Input, TituloInput, ContainerInput, SimulaInput, BotaoPrincipal, TextBtn, Tela } from "../../styles";

import api from '../../servicos/api'
import ImageResizer from '@bam.tech/react-native-image-resizer';

import { LojaContext } from "../../contexts/lojaContext"
import { ProdutoContext } from "../../contexts/produtoContext";
import { launchCamera, launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { useTheme, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

const { width } = Dimensions.get('window')

export default function CadastrarProduto() {
    const navigation = useNavigation()

    const { colors } = useTheme()
    const { credenciais } = useContext(LojaContext)
    const { arrTamanhos } = useContext(ProdutoContext)

    const [load, setLoad] = useState(false)
    const [listaCategorias, setListaCategorias] = useState([])

    const [modalVisible, setModalVisible] = useState(false);

    const [preview, setPreview] = useState([])
    const [cod, setCod] = useState("")
    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState("")
    const [descricao, setDescricao] = useState("")
    const [categoria, setCategoria] = useState("")
    const [tamanho, setTamanho] = useState([])


    useEffect(() => {
        CarregaCategorias()
    }, [])

    const options = {
        title: 'Select Image',
        type: 'library',
        options: {
            mediaType: 'photo',
        },
    }

    async function CapturarImagem(metodo) {
        await metodo(options, ({
            error,
            didCancel,
            assets
        }) => {
            if (error || didCancel) return

            setPreview(imagemArray => [...imagemArray, assets[0]])

        })
            .then(() => {
                setModalVisible(false)
            })
    }

    async function CarregaCategorias() {

        await api.get('/categorias')
            .then(({ data }) => {
                setListaCategorias(data)
            })
    }


    async function Postar() {


        if (nome == "" || descricao == "" || preco == "" || categoria == "" || preview.length == 0) {
            Toast(`Campo obrigatório: ${!nome && "Produto" || !preco && "Preço" || !descricao && "Descrição" || !categoria && "Categoria" || preview.length == 0 && "Imagens"}`)
            return
        }


        const formData = new FormData()

        formData.append('cod', cod)
        formData.append('nome', nome)
        formData.append('descricao', descricao)
        formData.append('preco', preco)
        formData.append('categoriaID', categoria)

        if (tamanho.length > 0) {
            for (let i = 0; i < tamanho.length; i++) {
                formData.append('tamanho', tamanho[i])
            }
        }


        for (let i = 0; i < preview.length; i++) {
            try {
                var result = await ImageResizer.createResizedImage(
                    preview[i].uri,
                    1000,
                    1000,
                    'WEBP',
                    100,  //verificar a qualidade da foto e mudar se necessario
                );
                formData.append('files', {
                    uri: result.uri,
                    type: 'image/jpeg',
                    name: result.name
                });
            }
            catch (error) { Alert.alert('Não foi possivel redimensionar') } // Caso nao tenha sido possivel redimensionar imagem

        }


        setLoad(true)

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${credenciais.token}`
        }
        await api.post(`/produto`, formData, { headers })
            .then(() => {
                navigation.goBack()
                Toast('Produto postado com sucesso!')
                setLoad(false)
            })

            .catch((error) => {
                console.log("error from image :", error.response)
            })
    }


    function RenderItem({ data }) {

        const response = tamanho.indexOf(data)
        return (

            <Pressable
                style={{
                    aspectRatio: 1,
                    height: (width / 7) - 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 4,
                    borderRadius: 4,
                    backgroundColor: response == -1 ? "#fff" : colors.tema,
                    borderWidth: response == -1 ? .5 : 0
                }}
                onPress={() => {
                    setTamanho(response == -1 ? itensTam => [...itensTam, data] :
                        tamanho.filter((item) => item != data))

                }}>
                <Text style={{ color: response == -1 ? "#000" : '#fff' }}>{data}</Text>
            </Pressable>
        )
    }

    const Toast = (mensagem) => {
        ToastAndroid.showWithGravityAndOffset(
            mensagem,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    };



    return (

        <Tela>
            <ScrollView
                showsVerticalScrollIndicator={false}>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: 'center',
                    gap: 5,
                    marginBottom:25,
                }}>
                    {preview.map((camera, index) => {
                        if (index < 5) {

                            return (

                                <Image
                                    key={index}
                                    style={{ width: 50, aspectRatio: 1,borderRadius:6 }}
                                    source={{ uri: camera.uri }} />
                            )
                        }
                    })}



                </View>
                {preview.length < 5 &&

                    <ContainerInput>
                        <TituloInput>
                            Fotos do Produto
                        </TituloInput>

                            <View style={{ justifyContent:'center', flexWrap: 'wrap', flexDirection: 'row', marginVertical: 20, alignItems: 'center' }}>
                                <Pressable style={{ backgroundColor: '#dedede', marginHorizontal: 5, paddingHorizontal: 5 }}
                                    onPress={() => CapturarImagem(launchCamera)}>
                                    <Text style={{ color: colors.link }}>Tirar Foto</Text>
                                </Pressable>
                                <Text>ou</Text>
                                <Pressable
                                    onPress={() => CapturarImagem(launchImageLibrary)}
                                    style={{ backgroundColor: '#ddd', marginHorizontal: 5, paddingHorizontal: 5 }}>
                                    <Text style={{ color: colors.link }}>Escolher de minhas imagens</Text>
                                </Pressable>
                            </View>

                    </ContainerInput>

                }

                <ContainerInput>
                    <TituloInput>
                        Cod. Produto
                    </TituloInput>
                    <Input
                        maxLength={10}
                        onChangeText={setCod}
                        value={cod} />
                </ContainerInput>

                <ContainerInput>
                    <TituloInput>
                        Produto
                    </TituloInput>
                    <Input
                        maxLength={50}
                        onChangeText={setNome}
                        value={nome} />
                </ContainerInput>


                <ContainerInput>
                    <TituloInput>
                        Preço - R$
                    </TituloInput>


                    <Input
                        keyboardType="numeric"
                        onChangeText={setPreco}
                        value={preco} />
                </ContainerInput>

                <ContainerInput>
                    <TituloInput>
                        Descrição
                    </TituloInput>
                    <Input
                        onChangeText={setDescricao}
                        multiline
                        value={descricao} />

                </ContainerInput>

                <View style={{
                    borderWidth: .5,
                    borderColor: "#333",
                    borderRadius: 60 / 2,
                    borderColor: "#777",
                    marginVertical: 8,
                    minHeight: 60
                }}>
                    <TituloInput>
                        Categoria
                    </TituloInput>
                    <Picker
                        mode="dialog"
                        selectedValue={categoria}
                        onValueChange={(itemValue) => {
                            setCategoria(itemValue);
                        }}>
                        <Picker.Item
                            label=""
                            style={{
                                color: '#777',
                            }}
                        />

                        {listaCategorias.map((item) => {
                            return (
                                <Picker.Item
                                    key={item.id}
                                    value={item.id}
                                    label={item.nome}
                                />
                            );
                        })}
                    </Picker>
                </View>


                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    statusBarTranslucent
                    onRequestClose={() => setModalVisible(false)}
                >

                    <View style={{ flex: 1 }}>

                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setModalVisible(false)}
                            style={{ flex: 1, backgroundColor: '#00000070' }}>

                        </TouchableOpacity>

                        <View style={{ backgroundColor: "#fff" }}>

                            <FlatList
                                contentContainerStyle={{ padding: 20, alignItems: 'center' }}
                                numColumns={6}
                                data={arrTamanhos}
                                renderItem={({ item }) => <RenderItem data={item} />}

                            />

                        </View>


                    </View>
                </Modal>

                <SimulaInput>

                    <TituloInput>Tamanhos Disponiveis</TituloInput>
                    <FlatList
                        ItemSeparatorComponent={<Text style={{ marginHorizontal: 4 }}>-</Text>}
                        horizontal
                        data={tamanho.sort()}
                        renderItem={({ item }) => <Text style={{ fontSize: 16, fontFamily: 'Roboto-Regular', color: "#000" }} >{item}</Text>}
                    />

                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}>
                        <Text style={{ color: '#000', fontFamily: 'Roboto-Medium' }}>{tamanho.length > 0 ? 'Editar' : 'Inserir'}</Text>
                    </TouchableOpacity>
                </SimulaInput>


                <BotaoPrincipal
                    disabled={load}
                    background={colors.tema}
                    activeOpacity={1}
                    onPress={Postar}>
                    {load ? <ActivityIndicator color='#fff' /> :
                        <TextBtn
                            cor={'#fff'}>
                            Postar
                        </TextBtn>
                    }
                </BotaoPrincipal>

            </ScrollView>
        </Tela>


    )
}
