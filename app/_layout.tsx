// app/_layout.tsx
import { Redirect, Slot, SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { restoreToken } from "../src/store/slices/authSlice"; // Ensure this path is correct
import { RootState, store } from "../src/store/store"; // Ensure this path is correct

SplashScreen.preventAutoHideAsync();

function AppContent() {
	const {
		isRestoringToken,
		isAuthenticated,
		initialAuthCheckAttempted, // <-- Get from Redux
	} = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		// Only dispatch restoreToken if it hasn't been attempted yet (flag from Redux)
		if (!initialAuthCheckAttempted) {
			console.log(
				"[AppContent Effect_restoreToken] initialAuthCheckAttempted is false. Dispatching restoreToken."
			);
			// @ts-ignore because restoreToken is an AsyncThunk
			dispatch(restoreToken());
		} else {
			console.log(
				"[AppContent Effect_restoreToken] initialAuthCheckAttempted is true (from Redux). Skipping restoreToken dispatch."
			);
		}
	}, [dispatch, initialAuthCheckAttempted]); // Dependency on the Redux flag

	useEffect(() => {
		// Hide splash screen once the auth check is no longer pending AND an attempt has been made.
		if (initialAuthCheckAttempted && !isRestoringToken) {
			console.log(
				"[AppContent Effect_SplashScreen] Hiding SplashScreen.",
				{ initialAuthCheckAttempted, isRestoringToken }
			);
			SplashScreen.hideAsync();
		}
	}, [initialAuthCheckAttempted, isRestoringToken]);

	// Show loading indicator IF:
	// 1. An initial auth check has NOT YET BEEN ATTEMPTED (initialAuthCheckAttempted from Redux is false)
	// OR
	// 2. An attempt has been made/initiated (initialAuthCheckAttempted is true),
	//    AND we are CURRENTLY in the process of restoring the token (isRestoringToken is true).
	if (!initialAuthCheckAttempted || isRestoringToken) {
		console.log("AppContent: Showing loading indicator.", {
			initialAuthCheckAttempted,
			isRestoringToken,
		});
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	// At this point:
	// - initialAuthCheckAttempted is true (from Redux)
	// - isRestoringToken is false (restoreToken has finished)

	if (!isAuthenticated) {
		console.log(
			"AppContent: Auth check complete. User NOT authenticated. Redirecting to login."
		);
		return <Redirect href="/(public)/login" />;
	}

	console.log(
		"AppContent: Auth check complete. User IS authenticated. Rendering Slot."
	);
	return <Slot />;
}

export default function RootLayout() {
	console.log("--- RootLayout: Rendered (Root with Provider) ---");
	return (
		<Provider store={store}>
			<AppContent />
		</Provider>
	);
}
