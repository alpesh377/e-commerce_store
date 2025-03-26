'use client'
import React, { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Box, CircularProgress, Pagination, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ProductCard from './productCard';
import { fetchProducts } from '@/lib/firebase/prodcuts';

interface ProductListProps {
    featured?: boolean,
    categoryId?: string,
    limit?: number
}

export default function ProductList({ featured = false, categoryId, limit = 8 }: ProductListProps) {

    const [page, setPage] = useState(1);

    const { data, isLoading, error } = useQuery({
        queryKey: ['products',page,{ featured, categoryId, page, limit }],
        queryFn: () => fetchProducts({ featured, categoryId, page, limit }),
        placeholderData:keepPreviousData
    })

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if(error) {
        return (
            <Box sx={{py: 4}}>
                <Typography variant="h6" component="h2" color='error'>
                    Error loading products, please try again {error.message}
                </Typography>
            </Box>
        )
    }

    if(!data || data.products.length === 0) {
        return (
            <Box sx={{py: 4}}>
                <Typography variant="h6" component="h2">
                    No products found
                </Typography>
            </Box>
        )
    }


    return (
        <>
        <Grid container spacing={3}>
            {
                data?.products.map((product) => (
                    <Grid key={product.id} size={{xs:12 ,sm:6,md:4,lg:3}}>
                        <ProductCard product={product} />
                    </Grid>
                ))
            }
        </Grid>
        {
            data?.totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                    <Pagination size='medium' count={data.totalPages} page={page} onChange={handlePageChange} color='primary' />
                </Box>
            )
        }
        </>
    )
}
