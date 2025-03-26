export interface Product {
    id: string
    name: string
    description: string
    fullDescription?: string
    price: number
    originalPrice?: number
    imageUrl: string
    category: string
    categoryId: string
    inStock: boolean
    onSale?: boolean
    featured?: boolean
    rating: number
    reviewCount: number
    createdAt: Date
    specifications?: {
        name: string
        value: string
    }[]
    reviews?: {
        userId: string
        userName: string
        rating: number
        comment: string
        date: Date
    }[]
}

