// app/(public)/login.tsx
import { Link, useRouter } from "expo-router";
import React, { useState } from "react"; // Added useEffect
import {
	ActivityIndicator,
	Alert,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../src/store/slices/authSlice"; // Adjust path
import { AppDispatch, RootState } from "../../src/store/store"; // Adjust path

// const logo = require('../../../assets/images/bikya-logo.png'); // Adjust path

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();

	const { isLoading, error, isAuthenticated, user } = useSelector(
		(state: RootState) => state.auth
	);

	const handleLogin = async () => {
		if (!email || !password) {
			Alert.alert("Error", "Please enter both email and password.");
			return;
		}
		try {
			// The navigation is now handled by the RootLayout's useEffect
			await dispatch(loginUser({ email, password })).unwrap();
			// If login is successful, RootLayout's useEffect will detect isAuthenticated change
		} catch (rejectedValueOrSerializedError) {
			console.error(
				"Failed to login from LoginScreen:",
				rejectedValueOrSerializedError
			);
			// Error is already set in Redux state, UI will show it
			// You might want to Alert here if the error from state isn't prominent enough
			// Alert.alert('Login Failed', (rejectedValueOrSerializedError as any)?.message || 'Check credentials');
		}
	};

	// This useEffect was in your version. It's generally better to handle global navigation
	// from the RootLayout based on isAuthenticated state changes to avoid race conditions
	// or multiple navigation attempts. I'm commenting it out here because RootLayout's
	// useEffect should handle this redirection.
	// useEffect(() => {
	//   if (isAuthenticated) {
	//     const isAdminOrOwner = user?.role === 'Admin' || user?.role === 'Owner';
	//     router.replace(isAdminOrOwner ? '/(admin)' : '/(auth)');
	//     // Alert.alert('Success', 'Logged in successfully!'); // Optional
	//   }
	// }, [isAuthenticated, user, router]);

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollViewContainer}>
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						{/* <Image source={logo} style={styles.logo} resizeMode="contain" /> */}
						<Text style={styles.logoPlaceholder}>LOGO</Text>
						<Text style={styles.appName}>Bikya</Text>
						<Text style={styles.tagline}>
							Rent a bike, ride with freedom
						</Text>
					</View>

					<View style={styles.formContainer}>
						<Text style={styles.title}>Welcome Back</Text>
						<Text style={styles.subtitle}>
							Login to your account
						</Text>

						<TextInput
							style={styles.input}
							placeholder="Enter your email"
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
							autoCapitalize="none"
							editable={!isLoading}
						/>
						<TextInput
							style={styles.input}
							placeholder="Enter your password"
							value={password}
							onChangeText={setPassword}
							secureTextEntry
							editable={!isLoading}
						/>
						<TouchableOpacity
							onPress={() =>
								console.log("Forgot password clicked")
							}>
							<Text style={styles.forgotPasswordText}>
								Forgot Password?
							</Text>
						</TouchableOpacity>
						{error && (
							<Text style={styles.errorText}>
								{typeof error === "object"
									? JSON.stringify(error)
									: error}
							</Text>
						)}
						<TouchableOpacity
							style={[
								styles.loginButton,
								isLoading && styles.loginButtonDisabled,
							]}
							onPress={handleLogin}
							disabled={isLoading}>
							{isLoading ? (
								<ActivityIndicator color="#ffffff" />
							) : (
								<Text style={styles.loginButtonText}>
									Login
								</Text>
							)}
						</TouchableOpacity>
						{/* ... other social login buttons and signup link ... */}
						<View style={styles.footerContainer}>
							<Text style={styles.footerText}>
								Don't have an account?{" "}
							</Text>
							<Link href="/(public)/signup" asChild>
								{" "}
								{/* Assuming signup is at (public)/signup */}
								<TouchableOpacity disabled={isLoading}>
									<Text style={styles.signupLink}>
										Sign up
									</Text>
								</TouchableOpacity>
							</Link>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
// Styles from your provided login.tsx file
const styles = StyleSheet.create({
	safeArea: { flex: 1, backgroundColor: "#f7f7f7" },
	scrollViewContainer: { flexGrow: 1, justifyContent: "center" },
	container: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
	headerContainer: { alignItems: "center", marginBottom: 30 },
	logoPlaceholder: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "#a5d6a7",
		textAlign: "center",
		lineHeight: 80,
		fontSize: 18,
		fontWeight: "bold",
		color: "#ffffff",
		marginBottom: 10,
	},
	appName: { fontSize: 28, fontWeight: "bold", color: "#333" },
	tagline: { fontSize: 14, color: "#666", marginTop: 4 },
	formContainer: {
		width: "100%",
		backgroundColor: "#ffffff",
		padding: 25,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 5,
		color: "#333",
		textAlign: "center",
	},
	subtitle: {
		fontSize: 14,
		color: "#777",
		marginBottom: 20,
		textAlign: "center",
	},
	input: {
		height: 50,
		borderColor: "#ddd",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 15,
		marginBottom: 15,
		backgroundColor: "#f9f9f9",
		fontSize: 16,
	},
	forgotPasswordText: {
		textAlign: "right",
		color: "#007AFF",
		marginBottom: 20,
		fontSize: 14,
	},
	loginButton: {
		backgroundColor: "#4CAF50",
		paddingVertical: 15,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 20,
	},
	loginButtonDisabled: { backgroundColor: "#a5d6a7" },
	loginButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
	footerContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	footerText: { fontSize: 14, color: "#666" },
	signupLink: { fontSize: 14, color: "#4CAF50", fontWeight: "bold" },
	errorText: { color: "red", textAlign: "center", marginBottom: 10 },
});
