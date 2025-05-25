// app/(admin)/_layout.tsx
import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../src/store/store'; // Adjust path if your src folder is not at ../src
import { View, ActivityIndicator, Text } from 'react-native'; // Import Text

export default function AdminLayout() {
  console.log("--- AdminLayout: Rendered (Using Stack) ---");

  const { user, isAuthenticated, isRestoringToken } = useSelector(
    (state: RootState) => state.auth
  );

  console.log(
    "AdminLayout State (Using Stack): isRestoringToken:", isRestoringToken,
    "| isAuthenticated:", isAuthenticated, "| User role:", user?.role
  );

  if (isRestoringToken) {
    console.log("AdminLayout (Using Stack): Token is being restored...");
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    console.log("AdminLayout (Using Stack): User not authenticated, redirecting.");
    return <Redirect href="/(public)/login" />; 
  }

  if (user && (user.role === 'Admin' || user.role === 'Owner')) {
    console.log("AdminLayout (Using Stack): User IS Admin/Owner. Rendering Admin Stack.");
    return (
      <Stack screenOptions={{ headerShown: true }}>
        {/* This screen would be app/(admin)/index.tsx if it exists */}
        <Stack.Screen name="index" options={{ title: 'Admin Dashboard' }} />
        {/* This screen is app/(admin)/bikes/index.tsx */}
        <Stack.Screen name="bikes/index" options={{ title: 'Manage Bikes (Test)' }} /> 
        {/* Add other admin screens like bikes/add when ready and they have default exports */}
        {/* <Stack.Screen name="bikes/add" options={{ title: 'Add New Bike' }} /> */}
      </Stack>
    );
  } else {
    console.log("AdminLayout (Using Stack): User IS NOT Admin/Owner. Role:", user?.role, "Redirecting.");
    return <Redirect href="/(auth)" />; // Redirect non-admins to regular user area, e.g., (tabs)
  }
}