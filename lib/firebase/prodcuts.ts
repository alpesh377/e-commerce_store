import {addDoc, collection, orderBy, query, where,limit as firestoreLimit, getDocs, startAfter, doc, getDoc} from "firebase/firestore";

import { db } from "./config";
import { Product } from "@/types"

const PRODUCTS_PER_PAGE = 10

interface fetchProductProps {
    featured?: boolean,
    page?: number,
    categoryId?: string
    limit?: number
}

export async function fetchProducts({featured=false, page = 1, categoryId, limit = PRODUCTS_PER_PAGE} : fetchProductProps) {

    try {
        const docRef = collection(db, "products");
        let q = query(docRef);

        if(featured) {
            q = query(q, where("featured", "==", true));
        }

        if(categoryId) {
            q = query(q, where("categoryId", "==", categoryId));
        }
        
        q = query(q,orderBy("createdAt", "desc"));

        q = query(q, firestoreLimit(limit));

        if(page > 1){
            const previousPageQuery  = query(q, firestoreLimit(limit * (page - 1)));
            const previousPageDocs = await getDocs(previousPageQuery);
            const previousPageLastDoc = previousPageDocs.docs[previousPageDocs.docs.length - 1];

            if(previousPageLastDoc) {
                q = query(q, startAfter(previousPageLastDoc));
            }
        }

        const querySnapshot = await getDocs(q);

        const totalQuery = query(docRef);
        const totalDocs = await getDocs(totalQuery);
        const totalCount = totalDocs.size;
        const products = querySnapshot.docs.map((doc) =>({
            id: doc.id,
            ...doc.data()
        })) as Product[];

        return {
            products,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export async function fetchProductById(id: string) {
    try {
        const docRef = doc(db, "products", id);
        const product = await getDoc(docRef);

        if(product.exists()){
            return {
                id: product.id,
                ...product.data()
            } as Product
        }else {
            throw new Error("Product not found")
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}