import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Icon, Menu } from 'semantic-ui-react';

export type HeaderProps = {
    pathname?: string;
};

const headerNavItems = [
    {
        to: '/',
        title: 'Главная страница',
        icon: <Icon name='home' fitted color='black' />
    },
    {
        to: '/basket',
        title: 'Корзина',
        icon: <Icon name='shopping basket' fitted color='black' />
    },
];

export const Header = React.memo((props: HeaderProps) => (
    <Menu fixed='top' color='green'>
        <Container>
            <Menu.Item header as='h3' title='Главная страница'>
                Shop
            </Menu.Item>
            <Menu.Menu position='right'>
                {headerNavItems.map(item =>
                    <Menu.Item
                        active={props.pathname === item.to}
                        as={Link}
                        to={item.to}
                        title={item.title}
                        key={item.to}
                    >
                        {item.icon}
                    </Menu.Item>
                )}
            </Menu.Menu>
        </Container>
    </Menu>
));