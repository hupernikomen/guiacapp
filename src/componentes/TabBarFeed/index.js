

import { View, TouchableOpacity, Animated } from 'react-native';

import { useTheme } from '@react-navigation/native'

export default function TabBarFeed({ state, descriptors, navigation, position }) {

  const { colors } = useTheme()
  return (
    <View style={{ flexDirection: 'row', backgroundColor: colors.tema, height: 45, alignItems: 'center', justifyContent: 'space-around' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

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

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : .6)),
        });

        return (
          <View key={index} style={{ borderBottomWidth: isFocused ? 3 : 0, borderColor: '#fff', flex: label == "Feed" ? 1.2 : 3, height: 45 }}>
            <View style={{ height: 42, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                style={{ width: '100%' }}
                activeOpacity={1}
                
                onPress={onPress}
              >
                <Animated.Text
                  style={{ opacity, color: '#fff', textAlign: 'center',height:42,verticalAlign:"middle" }}
                  key={index}>
                  {label}
                </Animated.Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}