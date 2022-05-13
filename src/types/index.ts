export type ProductCardType = {
    id: string;
    title: string;
    usdCost: number;
    rubCost?: number;
    numberInStock: number;
    isInTheBasket?: boolean;
};