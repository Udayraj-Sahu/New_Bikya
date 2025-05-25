// app/(admin)/_layout.tsx
import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/store/store'; // Adjusted path: ../../ to go up two levels from app/(admin)
import { View, ActivityIndicator } from 'react-native';

export default function AdminLayout() {
  console.log("--- AdminLayout: Rendered (Using Stack) ---");

  const { user, isAuthenticated, isRestoringToken } = useSelector(
    (state: RootState) => state.auth
  );

  console.log(
    "AdminLayout State: isRestoringToken:", isRestoringToken,
    "| isAuthenticated:", isAuthenticated, "| User role:", user?.role
  );

  // The root layout will handle the initial token restoration and splash screen.
  // This layout might still show a brief loader if navigating to it while auth state is still pending
  // for some reason, but generally, isRestoringToken might be false here if RootLayout handled it.
  if (isRestoringToken && !isAuthenticated) { // Be more specific if RootLayout handles primary restoration
     console.log("AdminLayout: Token still being restored or initial auth check pending...");
     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray' }}>
         <ActivityIndicator size="large" />
       </View>
     );
  }

  if (!isAuthenticated) {
    console.log("AdminLayout: User not authenticated, redirecting to login.");
    return <Redirect href="/(public)/login" />;
  }

  if (user && (user.role === 'Admin' || user.role === 'Owner')) {
    console.log("AdminLayout: User IS Admin/Owner. Rendering Admin Stack.");
    return (
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{ title: 'Admin Dashboard' }} />
        <Stack.Screen name="bikes/index" options={{ title: 'Manage Bikes (Test)' }} />
        {/* Add other admin screens */}
      </Stack>
    );
  } else {
    console.log("AdminLayout: User IS NOT Admin/Owner. Role:", user?.role, "Redirecting to auth/user area.");
    // Consider where non-admin authenticated users should go.
    // If (auth) is for general authenticated users, this is correct.
    // If there's a specific dashboard or home for them, adjust the href.
    return <Redirect href="/(auth)" />;
  }
}