// app/(admin)/_layout.tsx
import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/store/store'; // Adjust path
import { View, ActivityIndicator, Text } from 'react-native'; // Import Text

export default function AdminLayout() {
  console.log("--- AdminLayout: Rendered (Restored to Stack) ---");

  const { user, isAuthenticated, isRestoringToken } = useSelector(
    (state: RootState) => state.auth
  );

  console.log(
    "AdminLayout State (Restored to Stack): isRestoringToken:", isRestoringToken,
    "| isAuthenticated:", isAuthenticated, "| User role:", user?.role
  );

  if (isRestoringToken) {
    console.log("AdminLayout (Restored to Stack): Token is being restored...");
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    console.log("AdminLayout (Restored to Stack): User not authenticated, redirecting.");
    return <Redirect href="/(public)/login" />; 
  }

  if (user && (user.role === 'Admin' || user.role === 'Owner')) {
    console.log("AdminLayout (Restored to Stack): User IS Admin/Owner. Rendering Admin Stack.");
    return (
      <Stack screenOptions={{ headerShown: true }}>
        {/* This screen would be app/(admin)/index.tsx if it exists and is the default */}
        <Stack.Screen name="index" options={{ title: 'Admin Dashboard' }} />
        {/* This screen is app/(admin)/bikes/index.tsx */}
        <Stack.Screen name="bikes/index" options={{ title: 'Manage Bikes (Test)' }} /> 
        {/* Add other admin screens like bikes/add when ready and they have default exports */}
        {/* <Stack.Screen name="bikes/add" options={{ title: 'Add New Bike' }} /> */}
      </Stack>
    );
  } else {
    console.log("AdminLayout (Restored to Stack): User IS NOT Admin/Owner. Redirecting.");
    return <Redirect href="/(auth)" />; // Or your main user area
  }
}