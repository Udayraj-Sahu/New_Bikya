// app/(public)/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function PublicLayout() {
  // This Stack is for screens within the (public) group, e.g., login, signup, forgot password
  // The root _layout.tsx will redirect unauthenticated users here.
  return <Stack screenOptions={{ headerShown: false }} />;
}