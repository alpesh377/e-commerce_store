"use client";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Grid from "@mui/material/Grid2";
import AnimatedCounter from "@/components/AnimatedCounter";
// Styled components
const HeaderContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "#f2f0f1",
    paddingTop: theme.spacing(5),
    overflow: "hidden",
    [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(12),
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
        fontSize: "2.5rem",
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
const MotionBox = motion.create(Box);
const ImageSection = styled(MotionBox)(({ theme }) => ({
    
}));
const Header = () => {
    return (
        <HeaderContainer>
            <Container maxWidth="lg" sx={{ px: { xs: 2, md: 3 } }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ maxWidth: "100%" }}>
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
                                Explore our curated collection of premium products, crafted to elevate your lifestyle and deliver unmatched value straight to your door.
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
                        <Box
                            component={motion.div}
                            initial={{ y: "100px", opacity: 0 }}
                            whileInView={{ y: "0", opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.5, duration: 0.6 }}
                            sx={{
                                display: "flex",
                                height: { md: "100%" },
                                maxHeight: {
                                    md: "44px",
                                    lg: "52px",
                                    xl: "68px",
                                },
                                alignItems: "center",
                                justifyContent: { xs: "center", md: "flex-start" },
                                flexWrap: { xs: "wrap", sm: "nowrap" },
                                mb: { md: "116px" },
                                gap: { md: 3, lg: 6, xl: 8 },
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
                                    ml: { xs: 3, md: 0 },
                                    height: { xs: "48px", md: "100%" },
                                    bgcolor: "rgba(0, 0, 0, 0.1)",
                                }}
                            />
                            <StatBox sx={{ ml: { xs: 3, md: 0 } }}>
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
                                    ml: { sm: 3, md: 0 },
                                    bgcolor: "rgba(0, 0, 0, 0.1)",
                                }}
                            />
                            <StatBox
                                sx={{
                                    width: { xs: "100%", sm: "auto" },
                                    textAlign: { xs: "center", sm: "left" },
                                    mt: { xs: 1.5, sm: 0 },
                                    ml: { sm: 3, md: 0 },
                                }}
                            >
                                <StatValue>
                                    <AnimatedCounter from={0} to={3000} />+
                                </StatValue>
                                <StatLabel>Happy Customers</StatLabel>
                            </StatBox>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImageSection
                            initial={{ y: "100px", opacity: 0, rotate: 10 }}
                            whileInView={{ y: "0", opacity: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 2.3, duration: 0.8 }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: { xs: "10%", md: "15%", lg: "20%" },
                                    top: { xs: "10%", md: "15%", lg: "20%" },
                                }}
                            >
                                <Image
                                    priority
                                    src="/big-star.svg"
                                    height={104}
                                    width={104}
                                    alt="big star"
                                    style={{
                                        maxWidth: "54px",
                                        maxHeight: "104px" ,
                                        animation: "spin 4s infinite linear",
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    position: "absolute",
                                    left: { xs: "10%", md: "15%", lg: "20%" },
                                    bottom: { xs: "10%", md: "15%", lg: "20%" },
                                }}
                            >
                                <Image
                                    priority
                                    src="/small-star.svg"
                                    height={56}
                                    width={56}
                                    alt="small star"
                                    style={{
                                        maxWidth: "36px",
                                        maxHeight: "56px",
                                        animation: "spin 3s infinite linear",
                                    }}
                                />
                            </Box>
                        </ImageSection>
                    </Grid>
                </Grid>
            </Container>
        </HeaderContainer>
    );
};
export default Header;