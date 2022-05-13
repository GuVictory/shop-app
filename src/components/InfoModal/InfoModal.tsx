import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

export type InfoModalProps = {
    open: boolean;
    onClearClick: () => void;
};

export const InfoModal = React.memo((props: InfoModalProps) => (
    <Modal
        basic
        onClose={props.onClearClick}
        open={props.open}
        size='small'
    >
        <Modal.Header style={{ textAlign: 'center' }}>Товары отсутствующие на складе будут убраны из корзины</Modal.Header>
        <Modal.Actions style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
                color='green'
                inverted
                onClick={props.onClearClick}
            >
                <Icon name='checkmark' /> Хорошо
            </Button>
        </Modal.Actions>
    </Modal>
)
);