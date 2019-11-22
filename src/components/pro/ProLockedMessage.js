import React from 'react';
import { Button, Empty } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';

export function ProLockedMessage({ setAccountManagerOptions, info }) {
    const onShowAccount = async () => {
        setAccountManagerOptions({ visible: true });
    };

    let description = 'This feature requires a Monitoris Pro subscription !';

    if (info) {
        description = 'Monitoris Pro has not been activated !';
    }

    return (
        <Empty
            image={(<Icon color="#ffecb3" icon="lock" size={64} />)}
            description={description}>
            <Button type="primary" onClick={onShowAccount}>Go to account to subscribe to Monitoris Pro</Button>
        </Empty>
    );
}

ProLockedMessage.propTypes = {
    setAccountManagerOptions: PropTypes.func.isRequired,
    info: PropTypes.bool
};

export default ProLockedMessage;