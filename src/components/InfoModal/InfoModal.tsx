import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';

export type InfoModalProps = {
    open: boolean;
    onOkClick: () => void;
    text: string;
};

export const InfoModal = React.memo((props: InfoModalProps) => (
    <Modal
        basic
        onClose={props.onOkClick}
        open={props.open}
        size='small'
    >
        <Modal.Header style={{ textAlign: 'center' }}>{props.text}</Modal.Header>
        <Modal.Actions style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
                color='green'
                inverted
                onClick={props.onOkClick}
            >
                <Icon name='checkmark' /> Хорошо
            </Button>
        </Modal.Actions>
    </Modal>
)
);