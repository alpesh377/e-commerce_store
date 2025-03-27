'use client';
import { Box } from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";

interface DressStyleCardProps {
    title: string;
    url: string;
    backgroundImage: string;
    sx?: object;
}

const DressStyleCard = ({ title, url, backgroundImage, sx }: DressStyleCardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,0,0,0.15)" }}
            transition={{ duration: 0.3 }}
        >
            <Link href={url} style={{ textDecoration: "none" }}>
                <Box
                    sx={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "top",
                        backgroundRepeat: "no-repeat",
                        borderRadius: "20px",
                        bgcolor: "transparent",
                        color: "black",
                        fontWeight: 700,
                        fontSize: { xs: "1.5rem", md: "2.25rem" },
                        textAlign: "left",
                        height: "100%",
                        display: "flex",
                        alignItems: "flex-end",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                        transition: "all 0.3s ease",
                        ...sx,
                    }}
                >
                    {title}
                </Box>
            </Link>
        </motion.div>
    );
};

export default DressStyleCard;