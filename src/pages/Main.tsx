import * as React from "react";
import { ProductCardsContainer } from "../components";
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
        id: "4",
        title: "Test 4",
        usdCost: 6660,
        rubCost: 0,
        numberInStock: 0,
    },
    {
        id: "5",
        title: "Test 5",
        usdCost: 10,
        rubCost: 0,
        numberInStock: 2,
    },
    {
        id: "6",
        title: "Test 6",
        usdCost: 123,
        rubCost: 0,
        numberInStock: 1,
        isInTheBasket: true
    }
];


export const Main = () => {
    return <ProductCardsContainer cards={cards} />;
};