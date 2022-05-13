import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { Header } from "./components";
import { Main, Basket } from "./pages";

export const App = () => {
    const location = useLocation();

    return (<div className="App">
        <Header pathname={location.pathname} />
        <Container style={{ margin: '6em 1em 4em' }} as='main'>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="basket" element={<Basket />} />
            </Routes>
        </Container>
    </div>);
};