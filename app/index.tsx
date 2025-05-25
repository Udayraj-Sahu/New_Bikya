// app/index.tsx
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../src/store/store'; // Adjust path if needed

export default function RootIndexScreen() {
  const { isRestoringToken, isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  // This screen will likely be quickly navigated away from by the logic in app/_layout.tsx.
  // However, if for some reason the user lands here and stays,
  // this useEffect provides a secondary redirect mechanism.
  // The primary redirection logic is in app/_layout.tsx's AppNavigationLogic.

  useEffect(() => {
    console.log("app/index.tsx: Rendered. Auth State:", { isRestoringToken, isAuthenticated, role: user?.role });
    // No explicit navigation here; _layout.tsx should handle it.
    // If _layout.tsx's logic is complete, this screen might not even be focused for long.
    // For example, if not restoring token and not authenticated, _layout.tsx redirects to /public/login
    // If authenticated, _layout.tsx redirects to /tabs or /admin
  }, [isRestoringToken, isAuthenticated, user, router]);


  // While _layout.tsx is figuring out where to send the user,
  // this screen can show a loading indicator.
  // If isRestoringToken is handled in _layout.tsx's loading view, this might not show often.
  if (isRestoringToken) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading Application...</Text>
      </View>
    );
  }

  // If token restoration is done, _layout.tsx should have redirected.
  // This return is a fallback. It might be better to redirect from here too if _layout fails.
  // For simplicity, and assuming _layout.tsx's redirection is robust:
  console.log("app/index.tsx: Token restored. _layout.tsx should handle navigation.");
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>Initializing...</Text>
      {/* Or, you could force a redirect if preferred, though _layout should handle it:
      if (!isAuthenticated) return <Redirect href="/(public)/login" />;
      const isAdminOrOwner = user?.role === 'Admin' || user?.role === 'Owner';
      return <Redirect href={isAdminOrOwner ? "/(admin)" : "/(tabs)"} />;
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});