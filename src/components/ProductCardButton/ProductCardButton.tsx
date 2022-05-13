import React from 'react';
import { Button } from 'semantic-ui-react';

export type ProductCardButtonProps = {
    id: string;
    isInTheBasket?: boolean;

    canAddToBasket?: boolean;

    onAddToBasket?: (id: string) => void;
    onRemoveFromBasket?: (id: string) => void;
};

export const ProductCardButton = React.memo((props: ProductCardButtonProps) => {
    const { id, isInTheBasket, onAddToBasket, onRemoveFromBasket, canAddToBasket } = props;

    const actionButtonText = isInTheBasket ? 'Убрать из корзины' : 'Добавить в корзину';
    const actionButtonColor = isInTheBasket ? 'red' : 'green';
    const actionButtonIcon = isInTheBasket ? 'remove' : 'add';

    const onButtonActionClick = () => {
        if (isInTheBasket) {
            onRemoveFromBasket?.(id);
            return;
        }
        onAddToBasket?.(id);
    };

    return (
        <Button
            basic
            icon={actionButtonIcon}
            color={actionButtonColor}
            content={actionButtonText}
            onClick={onButtonActionClick}
            disabled={!isInTheBasket && !canAddToBasket}
            fluid
        />
    );
});