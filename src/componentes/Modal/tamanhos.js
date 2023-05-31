// import React from 'react';
// import { View, TouchableOpacity, FlatList, Text, Dimensions } from 'react-native';

// import { useTheme } from '@react-navigation/native';

// export default function ModalTamanhos({ data, tam, close,set }) {

//     const { width } = Dimensions.get('window')
//     const { colors } = useTheme()


//     return (
//         <View style={{ flex: 1 }}>

//             <TouchableOpacity onPress={close} style={{ flex: 1 }}></TouchableOpacity>

//             <View style={{backgroundColor:"#fff",elevation:3,borderRadius:10,margin:10,flexWrap:'wrap',flexDirection:'row',justifyContent:'space-evenly',paddingVertical:20}}>

//                 {data.map((item) => {
//                     const response = tam.indexOf(item)
//                     return (

//                         <TouchableOpacity
//                             style={{
//                                 aspectRatio: 1,
//                                 height: (width / 7) - 10,
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 margin: 4,
//                                 borderRadius: 4,
//                                 backgroundColor: response == -1 ? "#fff" : colors.tema,
//                                 borderWidth: response == -1 ? .5 : 0
//                             }}
//                             onPress={() => {
//                                 if (response == -1) {
//                                     set(itensTam => [...itensTam, item]);
//                                 } else {

//                                     let response = tam.filter((item) => item != item)

//                                     set(response);

//                                 }
//                             }}>
//                             <Text style={{ color: response == -1 ? "#000" : '#fff' }}>{item}</Text>
//                         </TouchableOpacity>
//                     )
//                 }
//                 )}
//             </View>

          
//         </View>
//     );
// }