import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay } from 'react-native-reanimated';
import { clamp, withBouncing } from 'react-native-redash';


export function PanGesture() {

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const WINDOW = Dimensions.get('window');

  const boundX = WINDOW.width - 100; 
  const boundY = WINDOW.height - 100;

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { offsetX: number; offsetY: number }>({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
      console.log(`context - [${ctx.offsetX}, ${ctx.offsetY}]`)
    },
    onActive: (evt, ctx) => {
      translateX.value = clamp(ctx.offsetX + evt.translationX, 0, boundX);
      translateY.value = clamp(ctx.offsetY + evt.translationY, 0, boundY);
      console.log(`active translate - [${translateX.value}, ${translateY.value}]`)
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateX.value = withBouncing(
        withDecay({
          velocity: velocityX
        }),
        0,
        boundX
      ),
      translateY.value = withBouncing(
        withDecay({
          velocity: velocityY
        }),
        0,
        boundY
      )
      console.log(`end translate - [${translateX.value}, ${translateY.value}]`)
    }
  });

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ]
    }
  })

  return (
    <View style={{ flex: 1, backgroundColor: 'powderblue' }}>
      <PanGestureHandler {...{onGestureEvent}}>
        <Animated.View style={animationStyle}>
          <View style={styles.ball} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#FF5733',
  }
})