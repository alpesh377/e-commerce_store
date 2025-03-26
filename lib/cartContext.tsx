"use client";

import React, { createContext, useEffect, useState } from "react";
import { Product } from "@/types";
import { useAuth } from "./authContext";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "./firebase/config";

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    item: CartItem[];
    addProduct: (product: Product, quantity: number) => void;
    removeProduct: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (id: string, quantity: number) => void;
    total: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
interface CartProviderProps {
    children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const [item, setItem] = useState<CartItem[]>([]);
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return; // Wait until auth state is resolved

        if (!user) {
            // If no user is logged in, reset cart to empty (or use localStorage if desired for guests)
            setItem([]);
            return;
        }

        // Listen to real-time updates from Firestore for the user's cart
        const cartRef = doc(db, "carts", user.uid);
        const unsubscribe = onSnapshot(
            cartRef,
            (docSnap) => {
                if (docSnap.exists()) {
                    setItem(docSnap.data().items || []);
                } else {
                    setItem([]); // If no cart exists, start with an empty array
                }
            },
            (error) => {
                console.error("Error fetching cart:", error);
                setItem([]); // Fallback to empty cart on error
            }
        );

        return () => unsubscribe(); // Cleanup listener on unmount or user change
    }, [user, loading]);

    const saveCartToFirestore = async (cartItems: CartItem[]) => {
        if (!user) return; 
        const cartRef = doc(db, "carts", user.uid);
        try {
            await setDoc(cartRef, { items: cartItems }, { merge: true });
        } catch (error) {
            console.error("Error saving cart:", error);
        }
    };

    const addProduct = (product: Product, quantity: number) => {
        setItem((prevItem) => {
            const existingItem = prevItem.find((item) => item.id === product.id);
            let updatedItems: CartItem[];
            if (existingItem) {
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + quantity,
                };
                updatedItems = prevItem.map((item) =>
                    item.id === product.id ? updatedItem : item
                );
            } else {
                updatedItems = [...prevItem, { ...product, quantity }];
            }
            if (user) saveCartToFirestore(updatedItems);
            return updatedItems;
        });
    };

    const removeProduct = (id: string) => {
        setItem((prevItem) => {
            const updatedItems = prevItem.filter((item) => item.id !== id);
            if (user) saveCartToFirestore(updatedItems);
            return updatedItems;
        });
    };

    const clearCart = () => {
        setItem([]);
        if (user) saveCartToFirestore([]);
    };

    const updateQuantity = (id: string, quantity: number) => {
        setItem((prevItem) => {
            const updatedItems = prevItem.map((item) =>
                item.id === id ? { ...item, quantity } : item
            );
            if (user) saveCartToFirestore(updatedItems);
            return updatedItems;
        });
    };

    const total = item.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const itemCount = item.reduce((acc, item) => acc + item.quantity, 0);

    const value = {
        item,
        addProduct,
        removeProduct,
        clearCart,
        updateQuantity,
        total,
        itemCount,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = React.useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCard must be used within a CardProvider");
    }
    return context;
}
