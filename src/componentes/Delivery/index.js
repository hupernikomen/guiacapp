import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from '@react-navigation/native';

export default function Delivery() {

  const { colors } = useTheme()
  
  return (
    <Material
      name='truck-fast'
      size={20}
      color={colors.tema} />

  );
}

