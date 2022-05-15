import * as React from "react";
import { Link } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import { CommonPageProps } from ".";
import { ProductCardsContainer, FloatButton } from "../components";
import { ProductsContext } from "../contexts";

export type MainPageProps = CommonPageProps & {}

export const Main: React.FC<MainPageProps> = (props) => {
    const productsData = React.useContext(ProductsContext);

    const isSomethingInBasket = React.useMemo(() =>
        productsData?.products?.some(item => item.isInTheBasket),
        [productsData?.products]);

    if (props.loading) {
        return (
            <Dimmer active>
                <Loader size='large' />
            </Dimmer>
        );
    }

    return (
        <React.Fragment>
            <ProductCardsContainer
                cards={productsData?.products || []}
                onAddToBasket={props.onAddToBasket}
                onRemoveFromBasket={props.onRemoveFromBasket}
            />
            {isSomethingInBasket && <FloatButton
                animated
                basic
                color='green'
                size='large'
                as={Link}
                to={'/basket'}
                text='К корзине'
                iconName='arrow right'
                side='right'
            />}
        </React.Fragment>
    );
};
