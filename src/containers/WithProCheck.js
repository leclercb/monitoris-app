import React from 'react';
import { useSelector } from 'react-redux';
import Panel from 'components/common/Panel';
import ProLockedMessage from 'components/pro/ProLockedMessage';
import { useAppApi } from 'hooks/UseAppApi';
import { isPro } from 'selectors/AppSelectors';

function withProCheck(Component) {
    function WithProCheck(props) {
        const appApi = useAppApi();
        const pro = useSelector(isPro);

        if (!pro) {
            return (
                <Panel.Sub>
                    <ProLockedMessage setAccountManagerOptions={appApi.setAccountManagerOptions} />
                </Panel.Sub>
            );
        }

        return (
            <Component {...props} />
        );
    }

    return WithProCheck;
}

export default withProCheck;