import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Icon } from "semantic-ui-react";
import { ProductCardsContainer } from "../components";
import { InfoModal } from "../components/InfoModal/InfoModal";
import { ProductCardType } from "../types";

const cards: ProductCardType[] = [
    {
        id: "1",
        title: "Test 1",
        usdCost: 10,
        rubCost: 0,
        numberInStock: 10,
        isInTheBasket: true
    },
    {
        id: "2",
        title: "Test 2",
        usdCost: 100,
        rubCost: 0,
        numberInStock: 0,
        isInTheBasket: true
    },
    {
        id: "3",
        title: "Test 3",
        usdCost: 110,
        rubCost: 0,
        numberInStock: 1,
        isInTheBasket: true
    },
    {
        id: "6",
        title: "Test 6",
        usdCost: 123,
        rubCost: 0,
        numberInStock: 1,
        isInTheBasket: true
    },
    {
        id: "1",
        title: "Test 1",
        usdCost: 10,
        rubCost: 0,
        numberInStock: 10,
        isInTheBasket: true
    },
];


export const Basket = () => {
    const [showInfoModal, setShowInfoModal] = React.useState(true);



    return (
        <React.Fragment>
            <ProductCardsContainer cards={cards} emptyText='Корзина пуста' />
            <Button
                animated
                basic
                style={{ position: 'fixed', margin: '2em', bottom: '0px', left: '0px' }}
                color='grey'
                size='large'
                as={Link}
                to={'/'}
            >
                <Button.Content visible>На главную</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow left' />
                </Button.Content>
            </Button>
            <Button
                animated='vertical'
                style={{ position: 'fixed', margin: '2em', bottom: '0px', right: '0px' }}
                color='green'
                size='large'
                disabled={cards.length === 0}
            >
                <Button.Content visible>Оплатить</Button.Content>
                <Button.Content hidden>
                    <Icon name='shop' />
                </Button.Content>
            </Button>
            <InfoModal open={showInfoModal} onClearClick={() => setShowInfoModal(false)} />
        </React.Fragment>
    );
};