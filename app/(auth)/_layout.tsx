
// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  // This Stack is for screens within the (auth) group, e.g., user dashboard, settings
  // The root _layout.tsx will redirect authenticated non-admin users here.
  // If you use Tabs inside (auth), this might be a Tabs navigator instead,
  // or this Stack can have a screen that then loads a Tabs navigator.
  return <Stack screenOptions={{ headerShown: true }} />;
}