"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  IconButton,
  Divider,
  TextField,
  Card,
  CardContent,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import { Add, Remove, Delete, ArrowBack, ShoppingBag } from "@mui/icons-material"
import { motion } from "framer-motion"
import { useCart } from "@/lib/cartContext"
import { useAuth } from "@/lib/authContext"

export default function CartPage() {
  const { item, updateQuantity, removeProduct, clearCart, total } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [couponCode, setCouponCode] = useState("")

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity >= 1) {
      updateQuantity(id, quantity)
    }
  }

  const handleRemoveItem = (id: string) => {
    removeProduct(id)
  }

  const handleCheckout = () => {
    if (user) {
      router.push("/checkout")
    } else {
      router.push("/login?redirect=/checkout")
    }
  }

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value)
  }

  const applyCoupon = () => {
    alert(`Coupon ${couponCode} applied!`)
  }

  if (item.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box sx={{ mb: 4 }}>
            <ShoppingBag sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Looks like you haven't added any products to your cart yet.
            </Typography>
          </Box>
          <Button component={Link} href="/products" variant="contained" color="primary" size="large">
            Continue Shopping
          </Button>
        </motion.div>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{xs:12, md:8}}>
          <Paper sx={{ p: 2, mb: { xs: 4, md: 0 } }}>
            {item.map((item:any) => (
              <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    py: 2,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      position: "relative",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      sizes="100px"
                      style={{ objectFit: "cover", borderRadius: "4px" }}
                    />
                  </Box>

                  <Box sx={{ ml: 2, flex: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Link href={`/products/${item.id}`} passHref>
                        <Typography variant="h6" sx={{ textDecoration: "none", color: "inherit" }}>
                          {item.name}
                        </Typography>
                      </Link>
                      <Typography variant="h6">${(item.price * item.quantity).toFixed(2)}</Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      ${item.price.toFixed(2)} each
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Remove fontSize="small" />
                        </IconButton>

                        <TextField
                          value={item.quantity}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            if (!isNaN(value)) {
                              handleQuantityChange(item.id, value)
                            }
                          }}
                          inputProps={{
                            min: 1,
                            style: { textAlign: "center", width: "40px" },
                          }}
                          variant="outlined"
                          size="small"
                          sx={{ mx: 1, width: "60px" }}
                        />

                        <IconButton size="small" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>

                      <IconButton color="error" onClick={() => handleRemoveItem(item.id)} aria-label="remove item">
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            ))}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button component={Link} href="/products" startIcon={<ArrowBack />} sx={{ textTransform: "none" }}>
                Continue Shopping
              </Button>

              <Button variant="outlined" color="error" onClick={clearCart} sx={{ textTransform: "none" }}>
                Clear Cart
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>

              <Box sx={{ my: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">${total.toFixed(2)}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1">Calculated at checkout</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body1">Tax</Typography>
                  <Typography variant="body1">Calculated at checkout</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">${total.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Coupon Code"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={couponCode}
                  onChange={handleCouponChange}
                  sx={{ mb: 1 }}
                />
                <Button variant="outlined" onClick={applyCoupon} disabled={!couponCode} fullWidth>
                  Apply Coupon
                </Button>
              </Box>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="contained" color="primary" size="large" fullWidth onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

