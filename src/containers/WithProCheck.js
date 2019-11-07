import React from 'react';
import { useSelector } from 'react-redux';
import Panel from 'components/common/Panel';
import ProLockedMessage from 'components/pro/ProLockedMessage';
import { isPro } from 'selectors/AppSelectors';

function withProCheck(Component) {
    function WithProCheck(props) {
        const pro = useSelector(isPro);

        if (!pro) {
            return (
                <Panel.Sub>
                    <ProLockedMessage />
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