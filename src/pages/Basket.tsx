import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import { CommonPageProps } from ".";
import { ProductCardsContainer } from "../components";
import { FloatButton } from "../components/FloatButton/FloatButton";
import { InfoModal } from "../components/InfoModal/InfoModal";
import { ProductsContext } from "../contexts";

export type BasketPageProps = CommonPageProps & {
    onRemoveEmptyProducts: () => void;
    onPayClick: () => void;
}

export const Basket: React.FC<BasketPageProps> = (props) => {
    const productsData = React.useContext(ProductsContext);
    const navigate = useNavigate();

    const [payingStatus, setPayingStatus] = React.useState<'none' | 'paying' | 'payed' | 'error'>('none');
    const productsInBasket = React.useMemo(() => productsData?.products?.filter(item => item.isInTheBasket), [productsData?.products]);

    const handlePay = React.useCallback(() => {
        setPayingStatus('paying');
        try {
            props.onPayClick();
            setPayingStatus('payed');
        } catch (_) {
            setPayingStatus('error');
        }
    }, [props]);

    const handleOkClick = React.useCallback(() => {
        if (payingStatus === 'payed') {
            navigate('/');
            return;
        }
        props.onRemoveEmptyProducts();
    }, [navigate, payingStatus, props]);

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
                cards={productsInBasket || []}
                emptyText='Корзина пуста'
                onAddToBasket={props.onAddToBasket}
                onRemoveFromBasket={props.onRemoveFromBasket}
            />
            <FloatButton
                animated
                basic
                color='grey'
                size='large'
                as={Link}
                to={'/'}
                text='На главную'
                iconName='arrow left'
                side='left'
            />
            <FloatButton
                animated
                basic
                color='green'
                size='large'
                onClick={handlePay}
                disabled={!productsInBasket || productsInBasket?.length === 0}
                text='Оплатить'
                iconName='shop'
                side='right'
            />
            <InfoModal
                open={payingStatus === 'payed' || (payingStatus !== 'paying' && (productsData?.emptyProductsInBasket ?? false))}
                onOkClick={handleOkClick}
                text={payingStatus === 'payed' ? 'Покупка прошла успешно' : 'Товары отсутствующие на складе будут убраны из корзины'}
            />
        </React.Fragment>
    );
};