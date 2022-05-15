import React from "react";
import { ProductCardType } from "../types";

export type ProductsContextType = {
    products?: ProductCardType[];
    emptyProductsInBasket?: boolean;
};

export const ProductsContext = React.createContext<ProductsContextType | undefined>(undefined);