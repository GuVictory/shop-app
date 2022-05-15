import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { Header } from "./components";
import { Main, Basket } from "./pages";
import { ProductsContext } from "./contexts";
import { useProducts } from "./hooks";

export const App = () => {
    const location = useLocation();

    const {
        loading,
        productsData,
        onAddToBasket,
        onRemoveFromBasket,
        onRemoveEmptyProducts,
        onPayClick,
    } = useProducts();

    return (
        <div className="App">
            <Header pathname={location.pathname} />
            <Container style={{ margin: '6em 1em 4em' }} as='main'>
                <ProductsContext.Provider value={productsData}>
                    <Routes>
                        <Route path="/" element={
                            <Main
                                loading={loading}
                                onAddToBasket={onAddToBasket}
                                onRemoveFromBasket={onRemoveFromBasket}
                            />}
                        />
                        <Route path="basket" element={
                            <Basket
                                loading={loading}
                                onRemoveEmptyProducts={onRemoveEmptyProducts}
                                onAddToBasket={onAddToBasket}
                                onRemoveFromBasket={onRemoveFromBasket}
                                onPayClick={onPayClick}
                            />}
                        />
                    </Routes>
                </ProductsContext.Provider>
            </Container>
        </div>
    );
};