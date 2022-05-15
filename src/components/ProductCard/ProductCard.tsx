import React from 'react';
import { Card, Label } from 'semantic-ui-react';
import CurrencyFormat from 'react-currency-format';
import { ProductCardButton } from '..';

import './ProductCard.css';

export type ProductCardProps = {
    id: string;
    title: string;
    usdCost: number;
    rubCost?: number;
    numberInStock: number;
    isInTheBasket?: boolean;

    onAddToBasket?: (id: string) => void;
    onRemoveFromBasket?: (id: string) => void;
};

export const ProductCard = React.memo((props: ProductCardProps) => {
    const { id, title, usdCost, rubCost, numberInStock, isInTheBasket, onAddToBasket, onRemoveFromBasket } = props;

    return (
        <Card className='ProductCard'>
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>Доступно на складе: {numberInStock}</Card.Meta>
                <Card.Description>
                    <Label.Group tag>
                        <Label size='tiny'>
                            <CurrencyFormat
                                value={usdCost}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                                decimalScale={2}
                            />
                        </Label>
                        <Label size='tiny'>
                            <CurrencyFormat
                                value={rubCost}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'₽'}
                                decimalScale={2}
                            />
                        </Label>
                    </Label.Group>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ProductCardButton
                    id={id}
                    isInTheBasket={isInTheBasket}
                    onAddToBasket={onAddToBasket}
                    onRemoveFromBasket={onRemoveFromBasket}
                    canAddToBasket={numberInStock > 0}
                />
            </Card.Content>
        </Card>
    );
});