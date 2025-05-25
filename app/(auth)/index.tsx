// app/(auth)/index.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../src/store/store'; // Adjust
import { logoutUser } from '../../src/store/slices/authSlice'; // Adjust

export default function AuthenticatedHomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser()); // This should clear credentials and set isAuthenticated to false
                           // RootLayout will then redirect to login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.fullName || 'User'}!</Text>
      <Text>You are on the authenticated user screen.</Text>
      {(user?.role === 'Admin' || user?.role === 'Owner') && (
        <Link href="/(admin)" asChild style={styles.button}>
          <Button title="Go to Admin Section" />
        </Link>
      )}
      <View style={styles.button}>
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'lightgoldenrodyellow',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    width: '80%',
  }
});