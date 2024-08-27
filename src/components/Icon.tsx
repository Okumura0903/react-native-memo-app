import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

import fontData from '../../assets/fonts/icomoon.ttf';
import fontSelection from '../../assets/fonts/selection.json';

interface Props {
  name: string;
  size: number;
  color: string;
}

const CustomIcon = createIconSetFromIcoMoon(
  fontSelection,
  'IcoMoon',
  'icomoon.ttf'
);

const Icon = ({ name, size, color }: Props): React.JSX.Element | null => {
  const [fontLoaded] = useFonts({
    IcoMoon: fontData,
  });
  if (!fontLoaded) {
    return null;
  }
  return <CustomIcon name={name} size={size} color={color} />;
};
export default Icon;
