import React from 'react';
import { Button, Empty, message } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { useAppApi } from 'hooks/UseAppApi';

export function ProLockedMessage({ info }) {
    const appApi = useAppApi();

    const onShowAccount = async () => {
        appApi.setAccountManagerOptions({ visible: true });
    };

    let description = 'This feature requires a RedisMon Pro subscription !';

    if (info) {
        description = 'TaskUnifier Pro has not been activated !';
    }

    return (
        <Empty
            image={(<Icon color="#ffecb3" icon="lock" size={64} />)}
            description={description}>
            <Button type="primary" onClick={onShowAccount}>Go to account to subscribe to RedisMon Pro</Button>
        </Empty>
    );
}

ProLockedMessage.propTypes = {
    info: PropTypes.bool
};

export default ProLockedMessage;