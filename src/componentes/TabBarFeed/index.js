import { View, Pressable } from 'react-native';

import { useTheme } from '@react-navigation/native'

import Feather from 'react-native-vector-icons/Feather'
import estilo from './estilo';

import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

// TabBar Personalizada para a tela PRINCIPAL do app 

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
          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}

            >
              <Animated.View entering={SlideInDown.duration(800)} style={{
                backgroundColor: isFocused ? app.tema : '#fff',
                padding: 5,
                borderRadius: 99,
                padding: 16,
                alignItems: 'center',
                justifyContent: 'center'
              }}>

                <Feather name={options.tabBarIcon} size={18} color={isFocused ? '#fff' : '#000'} />
                
              </Animated.View>
            </Pressable>
          )
        })}

      </View>
    </View>
  )


}