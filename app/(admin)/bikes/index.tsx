// app/(admin)/bikes/index.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ManageBikesScreenSimplified() {
  console.log("--- ManageBikesScreenSimplified (MAGENTA TEST) RENDERED ---");
  return (
    <View style={styles.debugContainer}>
      <Text style={styles.debugText}>ADMIN BIKE LIST IS HERE (Simplified Magenta)</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  debugContainer: {
    flex: 1, // CRUCIAL for visibility
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'magenta', // Very obvious background
    padding: 20,
  },
  debugText: {
    fontSize: 20,
    color: 'white', // Obvious text color
    fontWeight: 'bold',
    textAlign: 'center',
  }
});