import React, {useEffect, useLayoutEffect} from 'react';
import {Animated, SafeAreaView, StatusBar} from 'react-native';

import Title from '../common/Title';

export default function SplashScreen({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const translateY = new Animated.Value(0);
  const duration = 5000;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 100,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
      }}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[{transform: [{translateY}]}]}>
        <Title text="Doi" color="#fff" fontFamily="LeckerliOne-Regular" />
      </Animated.View>
    </SafeAreaView>
  );
}
