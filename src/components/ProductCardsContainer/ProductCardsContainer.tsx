import React from 'react';
import { Container } from 'semantic-ui-react';
import { ProductCard } from '..';
import { ProductCardType } from '../../types';
import './ProductCardsContainer.css';

export type ProductCardsContainerProps = {
    cards: ProductCardType[];

    emptyText?: string;

    onAddToBasket?: (id: string) => void;
    onRemoveFromBasket?: (id: string) => void;
};

export const ProductCardsContainer = React.memo((props: ProductCardsContainerProps) => {

    if (props.cards.length === 0) {
        return (
            <Container fluid text textAlign='center'>
                {props.emptyText ?? 'Список товаров пуст'}
            </Container>
        );
    }

    return (
        <div className='CardsContainer'>
            {props.cards.map(card =>
                <ProductCard
                    {...card}
                    onAddToBasket={props.onAddToBasket}
                    onRemoveFromBasket={props.onRemoveFromBasket}
                />)}
        </div>
    );
});