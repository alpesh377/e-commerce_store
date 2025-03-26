"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material"
import { ShoppingCart, Menu as MenuIcon, Person } from "@mui/icons-material"
import { useAuth } from "@/lib/authContext"
import { useCart } from "@/lib/cartContext"
import { motion } from "framer-motion"

export default function Navbar() {
    const { user, signOut } = useAuth()
    const { item } = useCart()
    const router = useRouter()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleSignOut = async () => {
        await signOut()
        handleMenuClose()
        router.push("/")
    }

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open)
    }

    const totalItems = item.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <AppBar position="sticky" color="default" elevation={1}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, display: { sm: "none" } }}
                    onClick={() => toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                        ShopNext
                    </Link>
                </Typography>

                <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                    <Button color="inherit" component={Link} href="/products">
                        Products
                    </Button>
                    <Button color="inherit" component={Link} href="/categories">
                        Categories
                    </Button>
                </Box>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <IconButton color="inherit" component={Link} href="/cart" aria-label="Cart">
                        <Badge badgeContent={totalItems} color="error">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </motion.div>

                {user ? (
                    <>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Person />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem component={Link} href="/account" onClick={handleMenuClose}>
                                My Account
                            </MenuItem>
                            <MenuItem component={Link} href="/orders" onClick={handleMenuClose}>
                                Orders
                            </MenuItem>
                            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Box sx={{ display: { xs: "none", sm: "flex", gap: 2 } }}>
                        <Button color="inherit" component={Link} href="/register">
                            Register
                        </Button>
                        <Button color="inherit" component={Link} href="/login">
                            Login
                        </Button>
                    </Box>
                )}
            </Toolbar>

            <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
                    <List>
                        <ListItem component={Link} href="/">
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem component={Link} href="/products">
                            <ListItemText primary="Products" />
                        </ListItem>
                        <ListItem component={Link} href="/categories">
                            <ListItemText primary="Categories" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {user ? (
                            <>
                                <ListItem component={Link} href="/account">
                                    <ListItemText primary="My Account" />
                                </ListItem>
                                <ListItem component={Link} href="/orders">
                                    <ListItemText primary="Orders" />
                                </ListItem>
                                <ListItem component="button" onClick={handleSignOut}>
                                    <ListItemText primary="Sign Out" />
                                </ListItem>
                            </>
                        ) : (
                            <List>
                                <ListItem component={Link} href="/login">
                                    <ListItemText primary="Login" />
                                </ListItem>
                                <ListItem component={Link} href="/register">
                                    <ListItemText primary="Sign Up" />
                                </ListItem>
                            </List>
                        )}
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    )
}

