import React from 'react';
import { Button, Modal } from 'antd';
import { Elements, StripeProvider } from 'react-stripe-elements';
import AccountManager from 'components/account/AccountManager';
import Icon from 'components/common/Icon';
import { getConfig } from 'config/Config';
import { useAppApi } from 'hooks/UseAppApi';

function ModalAccountManager() {
    const appApi = useAppApi();

    const onClose = () => {
        appApi.setAccountManagerOptions({ visible: false });
    };

    return (
        <Modal
            title={<Icon icon="cog" text="Account" />}
            visible={appApi.accountManager.visible}
            width="80%"
            closable={false}
            onOk={onClose}
            onCancel={onClose}
            footer={(
                <Button onClick={onClose}>
                    Close
                </Button>
            )}>
            <StripeProvider apiKey={getConfig().stripe.publicKey}>
                <Elements>
                    <AccountManager />
                </Elements>
            </StripeProvider>
        </Modal>
    );
}

export default ModalAccountManager;