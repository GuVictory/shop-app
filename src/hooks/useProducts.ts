import { getDatabase, onValue, ref, update } from "firebase/database";
import React from "react";
import { firebaseApp } from "../api/firebase";
import { ProductsContextType } from "../contexts";
import { ProductCardData } from "../types";
import { useCourse } from "./useCourse";

export type useProductsDataType = {
    productsData?: ProductsContextType;
    loading: boolean;
    error: boolean;

    onAddToBasket?: (id: string) => void;
    onRemoveFromBasket?: (id: string) => void;
    onRemoveEmptyProducts: () => void;
    onPayClick: () => void;
};

export const useProducts = (): useProductsDataType => {
    const db = getDatabase(firebaseApp);

    const course = useCourse();
    const [productsData, setProductsData] = React.useState<ProductsContextType | undefined>(undefined);

    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState(false);
    
    React.useEffect(() => {
        const dbRef = ref(db, 'products/');

        if (!productsData?.products || productsData?.products?.length === 0) {
            setLoading(true);
        }

        onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const productInBasketIds = (localStorage.getItem('basket') ?? '').split(' ');

                const products = snapshot.val().map((item: ProductCardData) => ({
                    id: item.id,
                    title: item.title,
                    usdCost: item.cost,
                    rubCost: item.cost * course,
                    numberInStock: item.numberInStock,
                    isInTheBasket: productInBasketIds.indexOf(String(item.id)) !== -1,
                }));

                const noMoreProductsIds = products.filter((item: ProductCardData) => item.numberInStock <= 0)
                    .map((item: ProductCardData) => item.id);

                setProductsData({
                    products,
                    emptyProductsInBasket: productInBasketIds?.some(item => noMoreProductsIds.indexOf(String(item)) === -1)
                });

                setLoading(false);
            } else {
                setProductsData({
                    products: [],
                    emptyProductsInBasket: false,
                });
            }
        });
    }, [db]);

    React.useEffect(() => {
        const newProducts =  productsData?.products?.map(item => ({...item, rubCost: item.usdCost * course}));

        setProductsData(prevData => ({
            ...prevData,
            products: newProducts
        }));
    }, [course]);

    const onAddToBasket = React.useCallback((id: string) => {
        const productInBasketIds = (localStorage.getItem('basket') ?? '').split(' ');
        localStorage.setItem('basket', [...productInBasketIds, id].join(' '));

        const newProducts = productsData?.products?.map(item => {
            if (item.id === id) {
                item.isInTheBasket = true;
            }

            return item;
        });

        const noMoreProductsIds = productsData?.products?.filter(item => item.numberInStock <= 0).map(item => item.id);

        setProductsData({
            products: newProducts,
            emptyProductsInBasket: productInBasketIds.some(item => noMoreProductsIds?.indexOf(item) !== -1) 
        });
    }, [productsData]);

    const onRemoveFromBasket = React.useCallback((id: string) => {
        const productInBasketIds = (localStorage.getItem('basket') ?? '').split(' ');
        const newProductInBasketIds = productInBasketIds.splice(productInBasketIds.indexOf(id), 1);

        localStorage.setItem('basket', newProductInBasketIds.join(' '));

        const newProducts = productsData?.products?.map(item => {
            if (item.id === id) {
                item.isInTheBasket = false;
            }

            return item;
        });

        const noMoreProductsIds = productsData?.products?.filter(item => item.numberInStock <= 0).map(item => item.id);

        setProductsData({
            products: newProducts,
            emptyProductsInBasket: newProductInBasketIds.some(item => noMoreProductsIds?.indexOf(item) !== -1) 
        });
    }, [productsData]);

    const onRemoveEmptyProducts = React.useCallback(() => {
        const productInBasketIds = (localStorage.getItem('basket') ?? '').split(' ');
        const noMoreIds = productsData?.products?.filter(item => item.numberInStock <= 0).map(item => item.id);

        const newProductsInBusket = productInBasketIds.filter(item => !noMoreIds?.some(id => String(item) === String(id)));

        const newProducts = productsData?.products?.map(item => ({
            ...item,
            isInTheBasket: newProductsInBusket.indexOf(String(item.id)) !== -1
        }));

        localStorage.setItem('basket', newProductsInBusket.join(' '));

        setProductsData({
            products: newProducts,
            emptyProductsInBasket: false
        });
    }, [productsData]);
    
    const onPayClick = React.useCallback(async () => {
        const productInBasketIds = (localStorage.getItem('basket') ?? '').split(' ');
        
        const dbRef = ref(db);

        const updates: Record<string, any> = {};

        const productsToUpdate = productsData?.products?.filter(item =>
            productInBasketIds.some(basketItem => basketItem === String(item.id)));

        const productsToUpdateFordb = productsToUpdate?.map(item => ({
            id: item.id,
            title: item.title,
            cost: 5,
            numberInStock: item.numberInStock - 1,
        }));

        if (productsToUpdateFordb) {
            for (const item of productsToUpdateFordb) {
                updates['/products/' + item.id] = item;
            }
        }

        try {
            localStorage.clear();
            await update(dbRef, updates);
        } catch (_) {
            setError(true)
        }
    }, [productsData, db]);

    return {
        productsData,
        loading,
        error,
        onAddToBasket,
        onRemoveFromBasket,
        onRemoveEmptyProducts,
        onPayClick
    };
};