import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Spacing, Radius } from '@theme';
import ScreenNames from '@constants/ScreenNames';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <LinearGradient
        colors={[Colors.splashGradientStart, Colors.splashGradientEnd]}
        style={styles.gradient}
      >
        <ImageBackground
          source={require('@assets/images/PngAndJpgImages/Background.png')}
          style={styles.image}
          resizeMode="cover"
        >
          <View style={styles.content}>
            <Text style={styles.title}>
              Feel your personal{'\n'}
              expression by choosing{'\n'}
              the latest design of{'\n'}
              furniture
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => navigation.replace(ScreenNames.MainTabs)}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl * 2,
    paddingBottom: Spacing.xxl,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    lineHeight: 32,
    color: Colors.textPrimary,
    maxWidth: '80%',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    borderRadius: Radius.round,
  },
  buttonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.textPrimary,
  },
});


export default SplashScreen;
