'use client';
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Rating, Typography } from "@mui/material";
import { motion, useAnimationControls } from "motion/react";
import { useEffect, useState } from "react";

const testimonials = [
    {
        id: 1,
        text: "The shopping experience was absolutely phenomenal! The quality of products and customer service exceeded all my expectations.",
        author: "Emma Thompson",
        role: "Fashion Blogger",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
        id: 2,
        text: "This platform has transformed how I shop for premium products. The curated collection saves me time and never disappoints.",
        author: "Michael Chen",
        role: "Tech Executive",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    {
        id: 3,
        text: "Outstanding selection of international brands. Every purchase feels special, and the delivery is always right on time.",
        author: "Sarah Martinez",
        role: "Interior Designer",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    {
        id: 4,
        text: "The attention to detail in product curation and customer experience is remarkable. Truly a premium shopping destination.",
        author: "James Wilson",
        role: "Business Owner",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
];

const clients = [
    { name: "Luxe Fashion", logo: "https://placehold.co/200x80/png?text=iam" },
    { name: "Elite Brands", logo: "https://placehold.co/200x80/png?text=venice." },
    { name: "Premium Style", logo: "https://placehold.co/200x80/png?text=ther" },
    { name: "Global Fashion", logo: "https://placehold.co/200x80/png?text=ob" },
    { name: "Designer Hub", logo: "https://placehold.co/200x80/png?text=MILANO" },
    { name: "Fashion Forward", logo: "https://placehold.co/200x80/png?text=FORWARD" },
];

export default function Testimonial() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const controls = useAnimationControls();
    const [position, setPosition] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const animate = async () => {
            await controls.start({
                x: [-position, -(position + 200)],
                transition: {
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                },
            });
            setPosition(position + 200);
        };
        animate();
    }, [controls, position]);

    return (
        <Box
            sx={{
                bgcolor: "#f8f5ff",
                py: { xs: 8, md: 12 },
                px: 4,
                position: "relative", // For positioning arrows outside
            }}
        >
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    
                    <Box
                        sx={{
                            maxWidth: { xs: "100%", md: "800px" }, // Reduced width
                            mx: "auto", // Center the content
                            bgcolor: "white",
                            borderRadius: "16px 80px 16px 16px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                            p: { xs: 3, md: 5 },
                            position: "relative",
                        }}
                    >
                        {/* Testimonial Content */}
                        <Box sx={{ textAlign: "center", mb: 6 }}>
                            <motion.div
                                key={`testimonial-${testimonials[currentIndex].id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Avatar
                                    src={testimonials[currentIndex].avatar}
                                    alt={testimonials[currentIndex].author}
                                    sx={{
                                        width: 80, // Reduced size to match image
                                        height: 80,
                                        margin: "0 auto",
                                        mb: 3,
                                        border: "4px solid white",
                                        boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                                    }}
                                />
                                <Typography
                                    variant="h4"
                                    component="p"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: { xs: "1.25rem", md: "1.5rem" }, // Adjusted font size
                                        mb: 2,
                                        maxWidth: "600px",
                                        mx: "auto",
                                    }}
                                >
                                    Share positive feedback that resonates with your audience and drives more conversions.
                                </Typography>
                                <Rating value={5} readOnly sx={{ mb: 2 }} />
                                <Typography variant="body2" color="text.secondary">
                                    Your Customer
                                </Typography>
                            </motion.div>
                        </Box>

                        {/* Client Logos Marquee */}
                        <Box sx={{ position: "relative", overflow: "hidden" }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textAlign: "center", mb: 3 }}
                            >
                                Feature client logos to build trust and credibility for your brand:
                            </Typography>
                            <motion.div
                                animate={controls}
                                style={{
                                    display: "flex",
                                    gap: "40px",
                                    width: "fit-content",
                                    justifyContent: "center",
                                }}
                            >
                                {[...clients].map((client, index) => (
                                    <Box
                                        key={`${client.name}-${index}`}
                                        component="img"
                                        src={client.logo}
                                        alt={client.name}
                                        sx={{
                                            height: 40,
                                            filter: "grayscale(1)",
                                            opacity: 0.7,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                filter: "grayscale(0)",
                                                opacity: 1,
                                            },
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            display: "flex",
                            gap: 1,
                        }}
                    >
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={handlePrev}
                                sx={{
                                    minWidth: "40px",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    bgcolor: "white",
                                    color: "#333",
                                    border: "1px solid #e0d9f5",
                                    "&:hover": {
                                        bgcolor: "#f8f5ff",
                                    },
                                    position: "relative",
                                    "&:before": {
                                        content: '""',
                                        position: "absolute",
                                        top: "50%",
                                        right: "100%",
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        border: "1px solid #e0d9f5",
                                        borderLeft: "none",
                                        borderTop: "none",
                                        transform: "translateY(-50%) rotate(-45deg)",
                                    },
                                }}
                            >
                                <ArrowBack fontSize="small" />
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={handleNext}
                                sx={{
                                    minWidth: "40px",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    bgcolor: "white",
                                    color: "#333",
                                    border: "1px solid #e0d9f5",
                                    "&:hover": {
                                        bgcolor: "#f8f5ff",
                                    },
                                    position: "relative",
                                    "&:before": {
                                        content: '""',
                                        position: "absolute",
                                        top: "50%",
                                        left: "100%",
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        border: "1px solid #e0d9f5",
                                        borderRight: "none",
                                        borderBottom: "none",
                                        transform: "translateY(-50%) rotate(-45deg)",
                                    },
                                }}
                            >
                                <ArrowForward fontSize="small" />
                            </Button>
                        </motion.div>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
}