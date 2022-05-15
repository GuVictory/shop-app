export type ProductCardType = {
    id: string;
    title: string;
    usdCost: number;
    rubCost?: number;
    numberInStock: number;
    isInTheBasket?: boolean;
};

export type ProductCardData = {
    id: string;
    title: string;
    cost: number;
    numberInStock: number;
};