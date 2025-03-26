'use client'

import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  type User 
} from "firebase/auth"
import React, { createContext, useEffect, useState } from "react"
import { auth } from "./firebase/config"

// Define the interface for the context value
interface AuthContextType {
  loading: boolean
  user: User | null
  signIn: (email: string, password: string) => void
  signUp: (email: string, password: string) => void
  signOut: () => void
  signInWithGoogle: () => void
  resetPassword: (email: string) => void
}

// Create context with proper typing (undefined as initial value)
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Type the props explicitly
interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error(error)
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error(error)
    }
  }

  const signOut = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error(error)
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error(error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      console.error(error)
    }
  }

  const value: AuthContextType = {
    loading,
    user,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    resetPassword
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Optional: Create a custom hook for using the context
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}