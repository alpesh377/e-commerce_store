'use client';
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import DressStyleCard from "./DressStyleCard";

const DressStyle = () => {
    // Animation variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
            },
        },
    };

    // Dress style categories with real Unsplash images
    const dressStyles = [
        {
            title: "Casual Wear",
            url: "/shop#casual",
            backgroundImage:
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
            sx: {
                height: { xs: "190px", md: "289px" },
            },
        },
        {
            title: "Formal Elegance",
            url: "/shop#formal",
            backgroundImage:
                "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=1920&auto=format&fit=crop",
            sx: {
                maxWidth: { md: "684px" },
                height: { xs: "190px", md: "289px" },
            },
        },
        {
            title: "Party Glam",
            url: "/shop#party",
            backgroundImage:
                "https://plus.unsplash.com/premium_photo-1675253217500-4dd6fea31a3b?q=80&w=1920&auto=format&fit=crop",
            sx: {
                maxWidth: { md: "684px" },
                height: { xs: "190px", md: "289px" },
            },
        },
        {
            title: "Active Gear",
            url: "/shop#gym",
            backgroundImage:
                "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920&auto=format&fit=crop",
            sx: {
                maxWidth: { md: "260px", lg: "360px", xl: "407px" },
                height: { xs: "190px", md: "289px" },
            },
        },
        {
            title: "Street Style",
            url: "/shop#streetwear",
            backgroundImage:
                "https://images.unsplash.com/photo-1597092555685-41e4181d9a53?q=80&w=1920&auto=format&fit=crop",
            sx: {
                height: { xs: "190px", md: "250px" },
            },
        },
        {
            title: "Bohemian Vibes",
            url: "/shop#bohemian",
            backgroundImage:
                "https://images.unsplash.com/photo-1521336575829-5c2a5e86f7a5?q=80&w=1920&auto=format&fit=crop",
            sx: {
                height: { xs: "190px", md: "250px" },
            },
        },
    ];

    return (
        <Box
            sx={{
                px: { xs: 4, xl: 0 },
                bgcolor: "white",
                py: { xs: 2, md: 2 },

            }}
        >
            <Container sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#F0F0F0",
                borderRadius: "70px",
            }} maxWidth="xl">
                <Box
                    sx={{
                        bgcolor: "#F0F0F0",
                        px: { xs: 6, md: 8 },
                        py: { xs: 1, md: 2 },
                        borderRadius: "40px",
                        textAlign: "center",
                    }}
                >
                    {/* Heading */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: "2rem", md: "3rem" },
                                lineHeight: { xs: "2.25rem", md: "3.5rem" },
                                fontWeight: 1000,
                                textTransform: "uppercase",
                                mb: { xs: 1, md: 6 },
                                mt: { xs: 2, md: 4 },
                                color: "#333",

                            }}
                        >
                            Explore Styles for Every Occasion
                        </Typography>
                    </motion.div>

                    {/* Bento Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "repeat(2, 1fr)",
                                    md: "repeat(12, 1fr)",
                                },
                                gap: { xs: 4, sm: 5 },
                                mb: { xs: 4, sm: 5 },
                            }}
                        >
                            {/* First Row */}
                            <Box sx={{ gridColumn: { xs: "span 1", md: "span 4" } }}>
                                <motion.div variants={itemVariants}>
                                    <DressStyleCard {...dressStyles[0]} />
                                </motion.div>
                            </Box>
                            <Box sx={{ gridColumn: { xs: "span 1", md: "span 8" } }}>
                                <motion.div variants={itemVariants} >
                                    <DressStyleCard {...dressStyles[1]} />
                                </motion.div>
                            </Box>

                            <Box sx={{ gridColumn: { xs: "span 1", md: "span 7" } }}>
                                <motion.div variants={itemVariants}>
                                    <DressStyleCard {...dressStyles[2]} />
                                </motion.div>
                            </Box>
                            <Box sx={{ gridColumn: { xs: "span 1", md: "span 5" } }}>
                                <motion.div variants={itemVariants}>
                                    <DressStyleCard {...dressStyles[3]} />
                                </motion.div>
                            </Box>
                        </Box>
                    </motion.div>
                </Box>
            </Container>
        </Box>
    );
};

export default DressStyle;