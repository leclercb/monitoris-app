import React from 'react';
import { Button, Empty, message } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { getConfig } from 'config/Config';
import { useSessionApi } from 'hooks/UseSessionApi';
import { openExternalLink } from 'utils/ElectronUtils';

export function ProLockedMessage({ info }) {
    const sessionApi = useSessionApi();

    const onClick = () => {
        openExternalLink(getConfig().cloudUrl);
    };

    const onBuyItem = async () => {
        message.info('Redirecting to Paypal...', 5);
        await sessionApi.buyItem(getConfig().cloudItemSku, sessionApi.session.user.id, sessionApi.session.user.email);
    };

    let description = 'This feature requires a RedisMon Pro subscription !';

    if (info) {
        description = 'TaskUnifier Pro has not been activated !';
    }

    return (
        <Empty
            image={(<Icon color="#ffecb3" icon="lock" size={64} />)}
            description={description}>
            <Button onClick={onClick} style={{ marginRight: 10 }}>Click here to get more information</Button>
            <Button type="primary" onClick={onBuyItem}>Subscribe to RedisMon Pro</Button>
        </Empty>
    );
}

ProLockedMessage.propTypes = {
    info: PropTypes.bool
};

export default ProLockedMessage;