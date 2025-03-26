"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
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
} from "@mui/material"
import { Google, Visibility, VisibilityOff } from "@mui/icons-material"
import { motion } from "motion/react"
import { useAuth } from "@/lib/authContext"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const { signIn, signInWithGoogle, user } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get("redirect") || "/"

    useEffect(() => {
        if (user) {
            router.push("/products");
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            await signIn(email, password)
            router.push(redirect)
        } catch (err) {
            setError("Invalid email or password. Please try again.")
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setError("")
        setIsLoading(true)

        try {
            await signInWithGoogle()
            router.push(redirect)
        } catch (err) {
            setError("Failed to sign in with Google. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        Sign In
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            label="Email Address"
                            type="email"
                            fullWidth
                            margin="normal"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />

                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            margin="normal"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box sx={{ mt: 1, textAlign: "right" }}>
                            <Link href="/forgot-password" passHref>
                                <Typography variant="body2" color="primary" sx={{ textDecoration: "none" }}>
                                    Forgot password?
                                </Typography>
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </Button>

                        <Divider sx={{ my: 3 }}>or</Divider>

                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<Google />}
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            sx={{ mb: 2 }}
                        >
                            Sign in with Google
                        </Button>

                        <Box sx={{ mt: 2, textAlign: "center" }}>
                            <Typography variant="body2">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" passHref>
                                    <Typography component="span" color="primary" sx={{ textDecoration: "none" }}>
                                        Sign up
                                    </Typography>
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    )
}