import { View, Pressable } from 'react-native';

import { useTheme } from '@react-navigation/native'

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import estilo from './estilo';

import AsyncStorage from "@react-native-async-storage/async-storage";

import Animated, { SlideInDown } from 'react-native-reanimated';

export default function TabBarFeed({ state, descriptors, navigation, options }) {

  const { app } = useTheme()
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
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = async () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
            await AsyncStorage.setItem('@telaInicial', route.name)
          };


          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <Animated.View entering={SlideInDown.duration(800)} style={{
                backgroundColor: isFocused ? app.tema : '#fff',
                padding: 5,
                borderRadius: 99,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}>

                <Material name={ options.tabBarIcon} size={25} color={isFocused ? '#fff' : '#000'} />

              </Animated.View>
            </Pressable>
          )
        })}

      </View>
    </View>
  )


}