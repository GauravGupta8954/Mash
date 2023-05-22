import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

export default function AnimatedText() {
  const [isAnimating, setIsAnimating] = useState(false);
  const size = useState(new Animated.Value(20))[0];
  const position = useState(new Animated.Value(0))[0];

  const startAnimation = () => {
    setIsAnimating(true);
    Animated.parallel([
      Animated.timing(size, { toValue: 10, duration: 1000, useNativeDriver: false }),
      Animated.timing(position, { toValue: -50, duration: 1000, useNativeDriver: false }),
    ]).start(() => setIsAnimating(false));
  };

  return (
    <View style={styles.container}>
      
        <Text style={styles.buttonText}>Animate Text</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  text: {
    fontSize: 20,
  },
});
