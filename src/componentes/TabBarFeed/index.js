import { View, Pressable } from 'react-native';

import { useTheme } from '@react-navigation/native'

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import estilo from './estilo';

export default function TabBarFeed({ state, descriptors, navigation, position }) {
const {app} = useTheme()
  return (
    <View style={estilo.tabbar}>


      <View style={estilo.conteudo}>


        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]

          const isFocused = state.index == index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };
          return (
            <Pressable
            key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              
            >
              <View style={{
                backgroundColor: isFocused?app.tema:'#fff', 
                padding:5, 
                borderRadius:99, 
                padding:14,
                alignItems:'center',
                justifyContent:'center'
              }}>
                <View>
                  <Feather name={options.tabBarIcon} size={24} color={isFocused?'#fff':'#000'}/>
                </View>
              </View>
            </Pressable>
          )
        })}



      </View>
    </View>
  )


}