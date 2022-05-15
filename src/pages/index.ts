export * from './Main';
export * from './Basket';

export type CommonPageProps = {
    loading?: boolean;

    onAddToBasket?: (id: string) => void;
    onRemoveFromBasket?: (id: string) => void;
}