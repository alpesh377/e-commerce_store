'use client';

import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import AnimatedCounter from "./AnimatedCounter";
import Grid from "@mui/material/Grid2";

// Styled components (unchanged)
const HeaderContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "#f2f0f1",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    overflow: "hidden",
    [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(12),
    },
}));

const StyledHeading = styled(motion.h2)(() => ({
    fontFamily: "sans-serif",
    fontSize: "1rem",
    marginBottom: "1.25rem",
    "@media (min-width: 1024px)": {
        fontSize: "60px",
        lineHeight: "70px",
        marginBottom: "2rem",
    },
}));

const StatBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
}));

const StatValue = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: "1.5rem",
    [theme.breakpoints.up("md")]: {
        fontSize: "1.25rem",
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: "1.875rem",
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: "1.875rem",
        marginBottom: "0.5rem",
    },
}));

const StatLabel = styled(Typography)(({ theme }) => ({
    fontSize: "0.75rem",
    color: "rgba(0, 0, 0, 0.6)",
    whiteSpace: "nowrap",
    [theme.breakpoints.up("xl")]: {
        fontSize: "1rem",
    },
}));

export default function Home() {
    return (
        <HeaderContainer>
            <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
                <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
                    {/* Left column with text content - unchanged */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ maxWidth: "100%", pr: { md: 4 } }}>
                            <StyledHeading
                                initial={{ y: "100px", opacity: 0, rotate: 10 }}
                                whileInView={{ y: "0", opacity: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                DISCOVER YOUR PERFECT SHOPPING EXPERIENCE
                            </StyledHeading>
                        </Box>
                        <motion.div
                            initial={{ y: "100px", opacity: 0 }}
                            whileInView={{ y: "0", opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <Typography
                                sx={{
                                    color: "rgba(0, 0, 0, 0.6)",
                                    fontSize: { xs: "0.875rem", lg: "1rem" },
                                    mb: { xs: 3, lg: 4 },
                                    maxWidth: "545px",
                                }}
                            >
                                Explore our curated collection of premium products, crafted to elevate your lifestyle and deliver
                                unmatched value straight to your door.
                            </Typography>
                        </motion.div>
                        <motion.div
                            initial={{ y: "100px", opacity: 0 }}
                            whileInView={{ y: "0", opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1, duration: 0.6 }}
                        >
                            <Button
                                component={Link}
                                href="/shop"
                                variant="contained"
                                sx={{
                                    width: { xs: "100%", md: "208px" },
                                    mb: { xs: 2.5, md: 6 },
                                    bgcolor: "black",
                                    color: "white",
                                    borderRadius: "9999px",
                                    py: 2,
                                    px: 7,
                                    textTransform: "none",
                                    "&:hover": {
                                        bgcolor: "rgba(0, 0, 0, 0.8)",
                                    },
                                }}
                            >
                                Shop Now
                            </Button>
                        </motion.div>

                        {/* Stats section - unchanged */}
                        <Box
                            component={motion.div}
                            initial={{ y: "100px", opacity: 0 }}
                            whileInView={{ y: "0", opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.5, duration: 0.6 }}
                            sx={{
                                display: "flex",
                                height: { xs: "auto", md: "100%" },
                                maxHeight: {
                                    md: "44px",
                                    lg: "52px",
                                    xl: "68px",
                                },
                                alignItems: "center",
                                justifyContent: { xs: "center", md: "flex-start" },
                                flexWrap: { xs: "wrap", sm: "nowrap" },
                                mb: { xs: 0, md: 0 },
                                gap: { xs: 2, md: 3, lg: 6, xl: 8 },
                                zIndex: 1,
                                position: "relative",
                            }}
                        >
                            <StatBox>
                                <StatValue>
                                    <AnimatedCounter from={0} to={200} />+
                                </StatValue>
                                <StatLabel>International Brands</StatLabel>
                            </StatBox>
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                    ml: { xs: 0, md: 0 },
                                    height: { xs: "48px", md: "100%" },
                                    bgcolor: "rgba(0, 0, 0, 0.1)",
                                }}
                            />
                            <StatBox>
                                <StatValue>
                                    <AnimatedCounter from={0} to={2000} />+
                                </StatValue>
                                <StatLabel>High-Quality Products</StatLabel>
                            </StatBox>
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                    display: { xs: "none", sm: "block" },
                                    height: { sm: "48px", md: "100%" },
                                    bgcolor: "rgba(0, 0, 0, 0.1)",
                                }}
                            />
                            <StatBox>
                                <StatValue>
                                    <AnimatedCounter from={0} to={3000} />+
                                </StatValue>
                                <StatLabel>Happy Customers</StatLabel>
                            </StatBox>
                        </Box>
                    </Grid>

                    {/* Right column with image - modified */}
                    <Grid
                        size={{ xs: 12, md: 6 }}
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "flex-end",
                            position: "relative",
                            mt: { xs: 2, md: 0 },
                            pl: { md: 20 },
                        }}
                    >
                        <motion.div
                            initial={{ y: "100px", opacity: 0, rotate: 10 }}
                            whileInView={{ y: "0", opacity: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 2.3, duration: 0.8 }}
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "auto",
                                aspectRatio: "6/8",
                                overflow: "visible",
                            }}
                        >
                            {/* Main product image container */}
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                    transform: { md: "translateX(40px)" },
                                    maxHeight: { xs: "1000px", xl: "1800px" }, // Moved maxHeight here
                                }}
                            >
                                {/* Desktop image */}
                                <Box
                                    sx={{
                                        display: { xs: "none", md: "block" },
                                        position: "relative",
                                        width: "100%",
                                        height: "100%",
                                        '@media (min-width: 1920px)': {  // Using media query instead of theme.breakpoints
                                            transform: "scale(1.2)",
                                        },
                                    }}
                                >
                                    <Image
                                        src="/header-homepage.png"
                                        alt="Fashion models wearing stylish outfits"
                                        fill
                                        priority
                                        sizes="(max-width: 900px) 100vw, (max-width: 1536px) 50vw, 60vw"
                                        style={{
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>

                                {/* Mobile image */}
                                <Box
                                    sx={{
                                        display: { xs: "block", md: "none" },
                                        position: "relative",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <Image
                                        src="/header-res-homepage.png"
                                        alt="Fashion models wearing stylish outfits - mobile view"
                                        fill
                                        priority
                                        sizes="100vw"
                                        style={{
                                            objectFit: "contain",
                                            objectPosition: "center",
                                        }}
                                    />
                                </Box>
                            </Box>

                            {/* Decorative elements - unchanged */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: { xs: "20%", md: "-5%" },
                                    top: { xs: "5%", md: "10%" },
                                    zIndex: 2,
                                    animation: "spin 4s infinite linear",
                                    "@keyframes spin": {
                                        "0%": { transform: "rotate(0deg)" },
                                        "100%": { transform: "rotate(360deg)" },
                                    },
                                }}
                            >
                                <Image
                                    src="/big-star.svg"
                                    height={104}
                                    width={104}
                                    alt="Decorative star"
                                    style={{
                                        maxWidth: "54px",
                                        maxHeight: "104px",
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    position: "absolute",
                                    left: { xs: "5%", md: "-5%" },
                                    bottom: { xs: "5%", md: "10%" },
                                    zIndex: 2,
                                    animation: "spin 3s infinite linear",
                                    "@keyframes spin": {
                                        "0%": { transform: "rotate(0deg)" },
                                        "100%": { transform: "rotate(360deg)" },
                                    },
                                }}
                            >
                                <Image
                                    src="/small-star.svg"
                                    height={56}
                                    width={56}
                                    alt="Decorative small star"
                                    style={{
                                        maxWidth: "36px",
                                        maxHeight: "56px",
                                    }}
                                />
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </HeaderContainer>
    );
}