"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Divider,
    Alert,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox,
    CircularProgress,
    LinearProgress,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Google, Visibility, VisibilityOff, Person, Email, Lock, CheckCircle } from "@mui/icons-material";
import { motion } from "motion/react";
import { useAuth } from "@/lib/authContext";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: string;
}

export default function RegisterPage() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);

    const { signUp, signInWithGoogle, user } = useAuth();
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


    useEffect(() => {
        if (user) {
            router.push("/products");
        }
    }, [user, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        const newValue = name === "acceptTerms" ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });

        // Clear error when user types
        if (errors[name as keyof FormErrors]) {
            setErrors({
                ...errors,
                [name]: undefined,
            });
        }

        // Calculate password strength
        if (name === "password") {
            calculatePasswordStrength(value);
        }
    };

    const calculatePasswordStrength = (password: string) => {
        let strength = 0;

        if (password.length >= 8) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        if (password.match(/[^A-Za-z0-9]/)) strength += 25;

        setPasswordStrength(strength);
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength < 50) return "error";
        if (passwordStrength < 75) return "warning";
        return "success";
    };

    const getPasswordStrengthLabel = () => {
        if (passwordStrength < 50) return "Weak";
        if (passwordStrength < 75) return "Medium";
        return "Strong";
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one uppercase letter";
        } else if (!/[0-9]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one number";
        } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one special character";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = "You must accept the terms and conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setGeneralError("");

        try {
            await signUp(formData.email, formData.password);
            // After successful signup, user will be redirected by the useEffect
        } catch (error: any) {
            console.error("Registration error:", error);
            if (error.code === "auth/email-already-in-use") {
                setGeneralError("This email is already registered. Please use a different email or sign in.");
            } else {
                setGeneralError("Registration failed. Please try again later.");
            }
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setIsLoading(true);
        setGeneralError("");

        try {
            await signInWithGoogle();
            // After successful signup, user will be redirected by the useEffect
        } catch (error) {
            console.error("Google sign up error:", error);
            setGeneralError("Google sign up failed. Please try again later.");
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 3, md: 4 },
                        borderRadius: 2,
                        overflow: "hidden",
                    }}
                >
                    <Box sx={{ mb: 4, textAlign: "center" }}>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                            Create Your Account
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Join our community and start shopping today
                        </Typography>
                    </Box>
                    {generalError && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {generalError}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid size={{xs:12, sm:6}}>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid size={{xs:12, sm:6}}>
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid size={{xs:12}}>
                                <TextField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid size={{xs:12}}>
                                <TextField
                                    label="Password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                {formData.password && (
                                    <Box sx={{ mt: 1, mb: 2 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Password Strength: {getPasswordStrengthLabel()}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color={`${getPasswordStrengthColor()}.main`}
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {passwordStrength}%
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={passwordStrength}
                                            color={getPasswordStrengthColor()}
                                            sx={{ mt: 0.5, height: 6, borderRadius: 1 }}
                                        />
                                        <Box sx={{ mt: 1.5 }}>
                                            <Grid container spacing={1}>
                                                <Grid size={{xs:12, sm:6}}>
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <CheckCircle
                                                            fontSize="small"
                                                            color={formData.password.length >= 8 ? "success" : "disabled"}
                                                            sx={{ mr: 0.5 }}
                                                        />
                                                        <Typography
                                                            variant="body2"
                                                            color={formData.password.length >= 8 ? "text.primary" : "text.disabled"}
                                                        >
                                                            At least 8 characters
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{xs:12, sm:6}}>
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <CheckCircle
                                                            fontSize="small"
                                                            color={/[A-Z]/.test(formData.password) ? "success" : "disabled"}
                                                            sx={{ mr: 0.5 }}
                                                        />
                                                        <Typography
                                                            variant="body2"
                                                            color={/[A-Z]/.test(formData.password) ? "text.primary" : "text.disabled"}
                                                        >
                                                            Uppercase letter
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{xs:12, sm:6}}>
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <CheckCircle
                                                            fontSize="small"
                                                            color={/[0-9]/.test(formData.password) ? "success" : "disabled"}
                                                            sx={{ mr: 0.5 }}
                                                        />
                                                        <Typography
                                                            variant="body2"
                                                            color={/[0-9]/.test(formData.password) ? "text.primary" : "text.disabled"}
                                                        >
                                                            Number
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{xs:12, sm:6}}>
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <CheckCircle
                                                            fontSize="small"
                                                            color={/[^A-Za-z0-9]/.test(formData.password) ? "success" : "disabled"}
                                                            sx={{ mr: 0.5 }}
                                                        />
                                                        <Typography
                                                            variant="body2"
                                                            color={/[^A-Za-z0-9]/.test(formData.password) ? "text.primary" : "text.disabled"}
                                                        >
                                                            Special character
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                )}
                            </Grid>
                            <Grid size={{xs:12}}>
                                <TextField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid size={{xs:12}}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="acceptTerms"
                                            checked={formData.acceptTerms}
                                            onChange={handleChange}
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="body2">
                                            I agree to the{" "}
                                            <Link href="/terms" passHref>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="primary"
                                                    sx={{ textDecoration: "none", fontWeight: 600 }}
                                                >
                                                    Terms of Service
                                                </Typography>
                                            </Link>{" "}
                                            and{" "}
                                            <Link href="/privacy" passHref>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="primary"
                                                    sx={{ textDecoration: "none", fontWeight: 600 }}
                                                >
                                                    Privacy Policy
                                                </Typography>
                                            </Link>
                                        </Typography>
                                    }
                                />
                                {errors.acceptTerms && (
                                    <Typography variant="caption" color="error">
                                        {errors.acceptTerms}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                            <Button
                                variant="outlined"
                                onClick={handleGoogleSignUp}
                                startIcon={<Google />}
                                disabled={isLoading}
                                sx={{ textTransform: "none" }}
                            >
                                Sign up with Google
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isLoading}
                                sx={{
                                    textTransform: "none",
                                    position: "relative",
                                    minWidth: 120,
                                }}
                            >
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
                            </Button>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 4 }} />
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2">
                            Already have an account?{" "}
                            <Link href="/login" passHref>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="primary"
                                    sx={{ textDecoration: "none", fontWeight: 600 }}
                                >
                                    Sign in
                                </Typography>
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
}