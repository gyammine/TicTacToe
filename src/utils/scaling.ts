import { Dimensions, Platform, PixelRatio } from 'react-native';

export const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
export const scale = screenWidth / 320;

export const normalizeFont = (size: number) => {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};

// This helper function was copied from my current workplace mobile app codebase (it's pretty much standard if you're not using a library)
