"use client"

import React,{ useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import {
    Container,
    Typography,
    Box,
    Button,
    Rating,
    Divider,
    Chip,
    TextField,
    Tabs,
    Tab,
    IconButton,
    Paper,
    Breadcrumbs,
    Stack,
    Skeleton,
    useTheme,
    useMediaQuery,
} from "@mui/material"
import Grid from '@mui/material/Grid2';
import {
    ShoppingCart,
    Favorite,
    FavoriteBorder,
    Add,
    Remove,
    CheckCircle,
    LocalShipping,
    Security,
    ArrowBack,
    ArrowForward,
    NavigateNext,
} from "@mui/icons-material"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { useCart } from "@/lib/cartContext"
import { fetchProductById } from "@/lib/firebase/prodcuts"
import ProductList from "@/components/productList"
import { useAuth } from "@/lib/authContext"

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`product-tabpanel-${index}`}
            aria-labelledby={`product-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

export default function ProductDetailPage() {
    const router = useRouter()
    const params = useParams()
    const productId = params.id as string

    const [quantity, setQuantity] = useState(1)
    const [tabValue, setTabValue] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [selectedImage, setSelectedImage] = useState(0)
    const [imageLoaded, setImageLoaded] = useState(false)

    const { addProduct } = useCart()
    const {user} = useAuth()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    const {
        data: product,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => fetchProductById(productId),
    })
    const productImages = product
        ? [
            product.imageUrl || "/placeholder.svg",
            "/placeholder.svg?text=Image+2",
            "/placeholder.svg?text=Image+3",
            "/placeholder.svg?text=Image+4",
        ] : []

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(event.target.value)
        if (value > 0) {
            setQuantity(value)
        }
    }

    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1)
        }
    }

    const handleAddToCart = () => {
        if(!user) {
            router.push("/login")
            return;
        }
        if (product) {
            addProduct(product, quantity)
        }
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
    }

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % productImages.length)
    }

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length)
    }

    const selectImage = (index: number) => {
        setSelectedImage(index)
    }

    if (isLoading) {
        return (
            <Container sx={{ py: 8 }}>
                <Grid container spacing={6}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 2 }} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Skeleton variant="text" height={60} width="80%" />
                        <Skeleton variant="text" height={30} width="40%" sx={{ mt: 2 }} />
                        <Skeleton variant="text" height={50} width="60%" sx={{ mt: 2 }} />
                        <Skeleton variant="text" height={100} sx={{ mt: 3 }} />
                        <Skeleton variant="text" height={100} sx={{ mt: 2 }} />
                        <Skeleton variant="rectangular" height={50} sx={{ mt: 4, borderRadius: 1 }} />
                    </Grid>
                </Grid>
            </Container>
        )
    }

    if (error || !product) {
        return (
            <Container sx={{ py: 8 }}>
                <Paper sx={{ p: 4, textAlign: "center" }}>
                    <Typography color="error" variant="h5" gutterBottom>
                        Product not found or an error occurred.
                    </Typography>
                    <Button component={Link} href="/products" variant="contained" startIcon={<ArrowBack />} sx={{ mt: 2 }}>
                        Back to Products
                    </Button>
                </Paper>
            </Container>
        )
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
            <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 4 }}>
                <Link href="/" passHref style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography color="text.secondary">Home</Typography>
                </Link>
                <Link href="/products" passHref style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography color="text.secondary">Products</Typography>
                </Link>
                <Link href={`/categories/${product.categoryId}`} passHref style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography color="text.secondary">{product.category}</Typography>
                </Link>
                <Typography color="text.primary">{product.name}</Typography>
            </Breadcrumbs>

            <Grid container spacing={6}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                        <Box sx={{ position: "relative" }}>
                            <Paper
                                elevation={2}
                                sx={{
                                    position: "relative",
                                    height: { xs: 350, sm: 450, md: 500 },
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    mb: 2,
                                    bgcolor: "background.paper",
                                }}
                            >
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
                                            zIndex: 1,
                                        }}
                                    />
                                )}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ height: "100%", position: "relative" }}
                                    >
                                        <Image
                                            src={productImages[selectedImage] || "/placeholder.svg"}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            style={{ objectFit: "contain" }}
                                            priority
                                            onLoad={() => setImageLoaded(true)}
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {product.onSale && (
                                    <Chip
                                        label="Sale"
                                        color="error"
                                        sx={{
                                            position: "absolute",
                                            top: 16,
                                            left: 16,
                                            fontWeight: "bold",
                                            zIndex: 2,
                                        }}
                                    />
                                )}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        px: 2,
                                        opacity: imageLoaded ? 1 : 0,
                                        transition: "opacity 0.3s ease",
                                    }}
                                >
                                    <IconButton
                                        onClick={prevImage}
                                        sx={{
                                            bgcolor: "rgba(255,255,255,0.8)",
                                            "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                                        }}
                                    >
                                        <ArrowBack />
                                    </IconButton>
                                    <IconButton
                                        onClick={nextImage}
                                        sx={{
                                            bgcolor: "rgba(255,255,255,0.8)",
                                            "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                                        }}
                                    >
                                        <ArrowForward />
                                    </IconButton>
                                </Box>
                            </Paper>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    overflowX: "auto",
                                    pb: 1,
                                    "&::-webkit-scrollbar": {
                                        height: 6,
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: "rgba(0,0,0,0.2)",
                                        borderRadius: 3,
                                    },
                                }}
                            >
                                {productImages.map((image, index) => (
                                    <Box
                                        key={index}
                                        onClick={() => selectImage(index)}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            flexShrink: 0,
                                            position: "relative",
                                            borderRadius: 1,
                                            overflow: "hidden",
                                            cursor: "pointer",
                                            border: index === selectedImage ? "2px solid" : "2px solid transparent",
                                            borderColor: index === selectedImage ? "primary.main" : "transparent",
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                transform: "translateY(-2px)",
                                            },
                                        }}
                                    >
                                        <Image
                                            src={image || "/placeholder.svg"}
                                            alt={`Product view ${index + 1}`}
                                            fill
                                            sizes="80px"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </motion.div>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <Typography
                                variant="h4"
                                component="h1"
                                gutterBottom
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: "1.75rem", md: "2.25rem" },
                                }}
                            >
                                {product.name}
                            </Typography>
                            <IconButton
                                onClick={toggleFavorite}
                                color="primary"
                                sx={{
                                    bgcolor: "background.paper",
                                    boxShadow: 1,
                                    "&:hover": { bgcolor: "background.paper" },
                                }}
                            >
                                {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                            </IconButton>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Rating value={product.rating} precision={0.5} readOnly />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                ({product.reviewCount} reviews)
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "baseline", mb: 3 }}>
                            <Typography variant="h4" component="span" color="primary.main" sx={{ fontWeight: 700 }}>
                                ${product.price.toFixed(2)}
                            </Typography>
                            {product.originalPrice && (
                                <Typography
                                    variant="h6"
                                    component="span"
                                    sx={{
                                        textDecoration: "line-through",
                                        color: "text.secondary",
                                        ml: 2,
                                    }}
                                >
                                    ${product.originalPrice.toFixed(2)}
                                </Typography>
                            )}
                            {product.onSale && (
                                <Chip
                                    label={`Save $${(product.originalPrice! - product.price).toFixed(2)}`}
                                    color="error"
                                    size="small"
                                    sx={{ ml: 2 }}
                                />
                            )}
                        </Box>

                        <Typography
                            variant="body1"
                            component="p"
                            sx={{
                                fontSize: "1rem",
                                lineHeight: 1.6,
                                color: "text.secondary",
                                mb: 3,
                            }}
                        >
                            {product.description}
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 6, sm: 4 }}>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 1.5,
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: 2,
                                            height: "100%",
                                        }}
                                    >
                                        <CheckCircle color="success" sx={{ mr: 1 }} />
                                        <Typography variant="body2">{product.inStock ? "In Stock" : "Out of Stock"}</Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 6, sm: 4 }}>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 1.5,
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: 2,
                                            height: "100%",
                                        }}
                                    >
                                        <LocalShipping color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body2">Free Shipping</Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 6, sm: 4 }}>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 1.5,
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: 2,
                                            height: "100%",
                                        }}
                                    >
                                        <Security color="primary" sx={{ mr: 1 }} />
                                        <Typography variant="body2">Secure Payment</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                                Quantity:
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "fit-content",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 1,
                                    overflow: "hidden",
                                }}
                            >
                                <IconButton onClick={decrementQuantity} disabled={quantity <= 1} sx={{ borderRadius: 0 }}>
                                    <Remove />
                                </IconButton>
                                <TextField
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    slotProps={{
                                        htmlInput: {
                                            min: 1,
                                            type: "number",
                                            style: {
                                                textAlign: "center",
                                                width: "40px",
                                                padding: "8px 0",
                                            },
                                        }
                                    }}
                                    variant="standard"
                                    sx={{
                                        width: 60,
                                        "& .MuiInput-underline:before": { borderBottom: "none" },
                                        "& .MuiInput-underline:after": { borderBottom: "none" },
                                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "none" },
                                    }}
                                />
                                <IconButton onClick={incrementQuantity} sx={{ borderRadius: 0 }}>
                                    <Add />
                                </IconButton>
                            </Box>
                        </Box>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ width: "100%" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={<ShoppingCart />}
                                    fullWidth
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        textTransform: "none",
                                        fontSize: "1rem",
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{ width: isMobile ? "100%" : "50%" }}
                            >
                                <Button
                                    variant="outlined"
                                    size="large"
                                    fullWidth
                                    startIcon={isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                                    onClick={toggleFavorite}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        textTransform: "none",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {isFavorite ? "Saved" : "Save"}
                                </Button>
                            </motion.div>
                        </Stack>
                    </motion.div>
                </Grid>
            </Grid>
            <Paper elevation={1} sx={{ mt: 6, borderRadius: 2, overflow: "hidden" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="product tabs"
                        variant={isMobile ? "fullWidth" : "standard"}
                        sx={{
                            "& .MuiTab-root": {
                                fontWeight: 600,
                                textTransform: "none",
                                fontSize: "1rem",
                                py: 2,
                            },
                        }}
                    >
                        <Tab label="Description" id="product-tab-0" />
                        <Tab label="Specifications" id="product-tab-1" />
                        <Tab label="Reviews" id="product-tab-2" />
                    </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: "1rem",
                            lineHeight: 1.8,
                            color: "text.secondary",
                        }}
                    >
                        {product.fullDescription || `${product.description} ` || "No Description Available"}
                    </Typography>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <Grid container spacing={3}>
                        {product.specifications?.map((spec: any, index: number) => (
                            <Grid size={{ xs: 12, sm: 6 }} key={index}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography variant="subtitle2" color="primary" gutterBottom>
                                        {spec.name}:
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {spec.value}
                                    </Typography>
                                </Paper>
                            </Grid>
                        )) || (
                                <Grid size={{ xs: 12 }}>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 3,
                                            borderRadius: 2,
                                            textAlign: "center",
                                        }}
                                    >
                                        <Typography>Detailed specifications for this product will be available soon.</Typography>
                                    </Paper>
                                </Grid>
                            )}
                    </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    {product.reviews?.length ? (
                        <Stack spacing={3}>
                            {product.reviews.map((review: any, index: number) => (
                                <Paper
                                    key={index}
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        borderRadius: 2,
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {review.userName}
                                        </Typography>
                                        <Rating value={review.rating} size="small" readOnly sx={{ ml: 2 }} />
                                        <Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>
                                            {new Date(review.date).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{ mt: 1 }}>
                                        {review.comment}
                                    </Typography>
                                </Paper>
                            ))}
                        </Stack>
                    ) : (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                No reviews yet
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Be the first to review this product
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2, textTransform: "none" }}>
                                Write a Review
                            </Button>
                        </Box>
                    )}
                </TabPanel>
            </Paper>
            <Box sx={{ mt: 8 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        position: "relative",
                        display: "inline-block",
                        pb: 1,
                        "&:after": {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "40%",
                            height: "3px",
                            bgcolor: "primary.main",
                        },
                    }}
                >
                    You May Also Like
                </Typography>
                <ProductList categoryId={product.categoryId} limit={4} />
            </Box>
        </Container>
    )
}