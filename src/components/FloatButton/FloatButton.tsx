import React from 'react';
import { Button, ButtonProps, Icon, SemanticICONS } from 'semantic-ui-react';

export type FloatButtonProps = ButtonProps & {
    side?: 'left' | 'right';
    iconName?: SemanticICONS;
    text?: string;
};

export const FloatButton = React.memo((props: FloatButtonProps) => {
    const { side, text, iconName, ...rest } = props;
    return (
        <Button
            {...rest}
            style={side === 'left'
                ? { position: 'fixed', margin: '2em', bottom: '0px', left: '0px' }
                : { position: 'fixed', margin: '2em', bottom: '0px', right: '0px' }
            }
        >
            <Button.Content visible>{text}</Button.Content>
            <Button.Content hidden>
                <Icon name={iconName} />
            </Button.Content>
        </Button>
    );
});