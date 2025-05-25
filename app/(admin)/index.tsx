// app/(admin)/index.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';

export default function AdminDashboardScreen() {
  console.log("--- AdminDashboardScreen (app/(admin)/index.tsx) RENDERED ---");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Link href="/(admin)/bikes" asChild>
        <Button title="Manage Bikes (Test)" />
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { /* ... darkturquoise background, flex: 1 ... */
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'darkturquoise'
  },
  title: { /* ... white text ... */
    fontSize: 22, 
    fontWeight: 'bold', 
    color: 'white', 
    marginBottom: 20 
  },
});