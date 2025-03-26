"use client"

import  React,{useState} from "react"
import Link from "next/link"
import Image from "next/image"
import {
    Card,
    CardContent,
    Typography,
    Button,
    Rating,
    Box,
    Chip,
    CardActionArea,
    CardActions,
    Divider,
    Skeleton,
} from "@mui/material"
import { ShoppingCart, Favorite, FavoriteBorder } from "@mui/icons-material"
import { motion, AnimatePresence } from "motion/react"
import { useCart } from "@/lib/cartContext"
import type { Product } from "@/types"
import { useAuth } from "@/lib/authContext"
import { useRouter } from "next/navigation"

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addProduct } = useCart()
    const {user} = useAuth()
    const router = useRouter()
    const [isHovered, setIsHovered] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    const handleAddToCart = (e: React.MouseEvent) => {
        if(!user) {
            router.push("/login")
            return;
        }
        e.preventDefault()
        e.stopPropagation()
        addProduct(product, 1)
    }

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsFavorite(!isFavorite)
    }

    return (
        <motion.div
            whileHover={{
                y: -8,
                transition: { duration: 0.2 },
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "visible",
                    borderRadius: 2,
                    p:0.5,
                    boxShadow: isHovered ? "0 8px 24px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.08)",
                    transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {product.onSale && (
                    <Chip
                        label="Sale"
                        color="error"
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            zIndex: 2,
                            fontWeight: "bold",
                        }}
                    />
                )}

                <motion.div
                    className="favorite-button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered || isFavorite ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        zIndex: 2,
                        background: "white",
                        borderRadius: "50%",
                        padding: "4px",
                    }}
                >
                    <Button
                        onClick={toggleFavorite}
                        sx={{
                            minWidth: "auto",
                            p: 0.5,
                            color: isFavorite ? "error.main" : "action.active",
                        }}
                    >
                        {isFavorite ? <Favorite /> : <FavoriteBorder />}
                    </Button>
                </motion.div>

                <Link href={`/products/${product.id}`} passHref style={{ textDecoration: "none" }}>
                    <CardActionArea sx={{ flexGrow: 0 }}>
                        <Box sx={{ position: "relative", paddingTop: "100%", overflow: "hidden" }}>
                            {!imageLoaded && (
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            )}
                            <Image
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 25vw"
                                style={{
                                    objectFit: "cover",
                                    transition: "transform 0.5s ease-in-out",
                                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                                }}
                                onLoad={() => setImageLoaded(true)}
                            />
                        </Box>
                    </CardActionArea>
                </Link>

                <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                    <Link href={`/products/${product.id}`} passHref style={{ textDecoration: "none", color: "inherit" }}>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="h2"
                            sx={{
                                fontWeight: 600,
                                fontSize: "1.1rem",
                                lineHeight: 1.3,
                                height: "2.6rem",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {product.name}
                        </Typography>
                    </Link>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Rating value={product.rating} precision={0.5} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                            ({product.reviewCount})
                        </Typography>
                    </Box>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mb: 1.5,
                            height: "1.5rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {product.category}
                    </Typography>

                    <Divider sx={{ mb: 1.5 }} />

                    <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                variant="h6"
                                component="span"
                                color="primary.main"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: "1.25rem",
                                }}
                            >
                                ${product.price.toFixed(2)}
                            </Typography>

                            {product.originalPrice && (
                                <Typography
                                    variant="body2"
                                    component="span"
                                    sx={{
                                        textDecoration: "line-through",
                                        color: "text.secondary",
                                        ml: 1,
                                        fontWeight: 500,
                                    }}
                                >
                                    ${product.originalPrice.toFixed(2)}
                                </Typography>
                            )}
                        </Box>

                        {product.inStock ? (
                            <Chip label="In Stock" color="success" size="small" variant="outlined" sx={{ height: 24 }} />
                        ) : (
                            <Chip label="Out of Stock" color="error" size="small" variant="outlined" sx={{ height: 24 }} />
                        )}
                    </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                    <AnimatePresence>
                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            style={{ width: "100%" }}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                startIcon={<ShoppingCart />}
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                sx={{
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    py: 1,
                                }}
                            >
                                Add to Cart
                            </Button>
                        </motion.div>
                    </AnimatePresence>
                </CardActions>
            </Card>
        </motion.div>
    )
}

