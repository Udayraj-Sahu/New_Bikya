import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react"; // Added useEffect
import {
	ActivityIndicator, // Added
	Alert,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux"; // Added
import { signupUser } from "../../src/store/slices/authSlice"; // Added, adjust path
import { AppDispatch, RootState } from "../../src/store/store"; // Added, adjust path

export default function SignupScreen() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [agreedToTerms, setAgreedToTerms] = useState(false);

	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>(); // Added
	const { isLoading, error, isAuthenticated } = useSelector(
		(state: RootState) => state.auth
	); // Added

	const handleSignup = async () => {
		// Made async
		if (!fullName || !email || !password || !confirmPassword) {
			Alert.alert("Error", "Please fill in all fields.");
			return;
		}
		if (password !== confirmPassword) {
			Alert.alert("Error", "Passwords do not match.");
			return;
		}
		if (!agreedToTerms) {
			Alert.alert(
				"Error",
				"Please agree to the terms and privacy policy."
			);
			return;
		}

		try {
			await dispatch(signupUser({ fullName, email, password })).unwrap();
			// Navigation handled by useEffect watching isAuthenticated
		} catch (rejectedValueOrSerializedError) {
			// Error state is set in Redux by signupUser.rejected
			// Alert.alert('Signup Failed', error || 'An unexpected error occurred.');
			console.error("Failed to signup:", rejectedValueOrSerializedError);
		}
	};

	// Effect to navigate on successful authentication
	useEffect(() => {
		if (isAuthenticated) {
			router.replace("/(auth)"); // Navigate to your authenticated screen group
			Alert.alert("Success", "Account created successfully!");
		}
	}, [isAuthenticated, router]);

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollViewContainer}>
				<View style={styles.container}>
					<View style={styles.formContainer}>
						<Text style={styles.title}>Create Account</Text>
						<Text style={styles.subtitle}>Join Bikya today</Text>

						<TextInput
							style={styles.input}
							placeholder="Enter your full name"
							value={fullName}
							onChangeText={setFullName}
							autoCapitalize="words"
							editable={!isLoading}
						/>
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
							placeholder="Create a password"
							value={password}
							onChangeText={setPassword}
							secureTextEntry
							editable={!isLoading}
						/>
						<TextInput
							style={styles.input}
							placeholder="Confirm your password"
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							secureTextEntry
							editable={!isLoading}
						/>

						<View style={styles.checkboxContainer}>
							<TouchableOpacity
								style={[
									styles.checkboxBase,
									agreedToTerms && styles.checkboxChecked,
									isLoading && styles.disabledCheckboxBase,
								]}
								onPress={() => setAgreedToTerms(!agreedToTerms)}
								disabled={isLoading}>
								{agreedToTerms && (
									<Text style={styles.checkboxCheckmark}>
										✓
									</Text>
								)}
							</TouchableOpacity>
							<Text style={styles.checkboxLabel}>
								I agree to Bikya's{" "}
								<Text
									style={styles.linkText}
									onPress={() =>
										!isLoading &&
										console.log("Terms link clicked")
									}>
									terms
								</Text>{" "}
								&{" "}
								<Text
									style={styles.linkText}
									onPress={() =>
										!isLoading &&
										console.log(
											"Privacy Policy link clicked"
										)
									}>
									privacy policy
								</Text>
							</Text>
						</View>

						{/* Display error message from Redux state */}
						{error && <Text style={styles.errorText}>{error}</Text>}

						<TouchableOpacity
							style={[
								styles.signupButton,
								isLoading && styles.signupButtonDisabled,
							]}
							onPress={handleSignup}
							disabled={isLoading}>
							{isLoading ? (
								<ActivityIndicator color="#ffffff" />
							) : (
								<Text style={styles.signupButtonText}>
									Sign Up
								</Text>
							)}
						</TouchableOpacity>
					</View>

					<View style={styles.footerContainer}>
						<Text style={styles.footerText}>
							Already have an account?{" "}
						</Text>
						<Link href="/login" asChild>
							<TouchableOpacity disabled={isLoading}>
								<Text style={styles.loginLink}>Login</Text>
							</TouchableOpacity>
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

// --- Add to your existing styles ---
const styles = StyleSheet.create({
	// ... (all your previous styles from signup.tsx)
	safeArea: { flex: 1, backgroundColor: "#f7f7f7" },
	scrollViewContainer: { flexGrow: 1, justifyContent: "center" },
	container: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
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
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	checkboxBase: {
		width: 20,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 3,
		marginRight: 10,
	},
	checkboxChecked: { backgroundColor: "#4CAF50", borderColor: "#4CAF50" },
	disabledCheckboxBase: { backgroundColor: "#e0e0e0" },
	checkboxCheckmark: { color: "white", fontSize: 12 },
	checkboxLabel: { fontSize: 13, color: "#555", flexShrink: 1 },
	linkText: { color: "#007AFF", textDecorationLine: "underline" },
	signupButton: {
		backgroundColor: "#4CAF50",
		paddingVertical: 15,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 10,
	},
	signupButtonDisabled: { backgroundColor: "#a5d6a7" }, // Lighter green when disabled
	signupButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
	footerContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
	footerText: { fontSize: 14, color: "#666" },
	loginLink: { fontSize: 14, color: "#4CAF50", fontWeight: "bold" },
	errorText: {
		// New style for error messages
		color: "red",
		textAlign: "center",
		marginBottom: 10,
	},
});
