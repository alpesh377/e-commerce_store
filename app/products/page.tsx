import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import ProductList from '@/components/productList'

export default function Products() {
  return (
    <Container maxWidth="xl" sx={{py:6}}>
        <Typography variant='h4' component="h1" gutterBottom>
            All Products
        </Typography>
        <Box sx={{mt:4}}>
            <ProductList/>
        </Box>
    </Container>
  )
}
