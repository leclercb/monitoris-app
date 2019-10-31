import React, { useState } from 'react';
import { Button } from 'antd';

function PromiseButton(props) {
    const [loading, setLoading] = useState(false);

    const onClick = async event => {
        try {
            setLoading(true);
            return await props.onClick(event);
        } finally {
            setLoading(false);
        }
    };

    return (<Button {...props} loading={loading} onClick={onClick} />);
}

export default PromiseButton;